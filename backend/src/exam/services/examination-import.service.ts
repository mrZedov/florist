import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { ExaminationAnswersCrudService } from "./examination-answers-crud.services";
import { ExaminationTicketsCrudService } from "./examination-tickets-crud.services";
import { ExaminationTicketsPicturesCrudService } from "./examination-tickets-pictures-crud.services";

@Injectable()
export class ExaminationImportService {
  constructor(
    private readonly examinationAnswersCrudService: ExaminationAnswersCrudService,
    private readonly examinationTicketsCrudService: ExaminationTicketsCrudService,
    private readonly examinationTicketsPicturesCrudService: ExaminationTicketsPicturesCrudService
  ) {}

  async importManual() {
    const files = fs
      .readdirSync("./volume", { encoding: "utf8" })
      .filter((v) => v.slice(-4) === ".txt");
    await this.importCheckFiles(files);
  }

  async importCheckFiles(files) {
    for (const file of files) {
      const filePath = "./volume/" + file;
      await this.importFile(filePath);
    }
  }

  async importFile(filePath) {
    let currentQ;
    const txt = fs.readFileSync(filePath).toString().split("\n");
    for (const strTxt of txt) {
      const str = strTxt.replace("\r", "");
      if (!str) continue;
      const question = this.getQuestion(str);
      if (question) {
        await this.saveQuestion(currentQ);
        currentQ = {};
        currentQ.answerTrue = question.answerTrue;
        currentQ.answer = [];
        currentQ.picture = question.picture;
      } else {
        if (!currentQ) continue;
        if (!currentQ.question) {
          currentQ.question = str;
        } else {
          currentQ.answer.push(str);
        }
      }
    }
  }

  async saveQuestion(q) {
    if (!q) return;
    const recTickets = await this.examinationTicketsCrudService.findOne({
      name: q.question,
    });
    if (recTickets) return;
    const recTicketsNew = await this.examinationTicketsCrudService.create({
      name: q.question,
    });
    if (q.picture)
      await this.examinationTicketsPicturesCrudService.create({
        path: q.picture,
        examinationTickets: recTicketsNew,
      });
    for (const answer of q.answer) {
      await this.examinationAnswersCrudService.create({
        examinationTickets: recTicketsNew,
        name: answer,
      });
    }
    const recAnswerTrue = await this.examinationAnswersCrudService.findOne({
      examinationTickets: recTicketsNew,
      name: q.answer[q.answerTrue - 1],
    });
    await this.examinationTicketsCrudService.update(recTicketsNew.id, {
      examinationAnswersTrue: recAnswerTrue,
    });
  }

  getQuestion(str) {
    const nom = str.split("--");
    if (nom.length !== 2) return undefined;
    let nom0 = nom[0];
    const nom12 = nom[1].split(" ");
    let nom1 = nom12[0];
    let nom2 = nom12[1];
    if (nom2) nom2 = nom2 + ".png";
    if (nom.length !== 2 || !parseInt(nom0) || !parseInt(nom1))
      return undefined;
    return {
      queestion: parseInt(nom0),
      answerTrue: parseInt(nom1),
      picture: nom2,
    };
  }
}
