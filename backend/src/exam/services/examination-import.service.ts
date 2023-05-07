import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { LogService } from "src/log/log.services";
import { ExaminationAnswersCrudService } from "./examination-answers-crud.services";
import { ExaminationTicketsCrudService } from "./examination-tickets-crud.services";
import { ExaminationTicketsPicturesCrudService } from "./examination-tickets-pictures-crud.services";

@Injectable()
export class ExaminationImportService {
  constructor(
    private readonly examinationAnswersCrudService: ExaminationAnswersCrudService,
    private readonly examinationTicketsCrudService: ExaminationTicketsCrudService,
    private readonly examinationTicketsPicturesCrudService: ExaminationTicketsPicturesCrudService,
    private readonly logService: LogService
  ) {}

  async importManual() {
    const files = fs
      .readdirSync("./volume", { encoding: "utf8" })
      .filter((v) => v.slice(-4) === ".txt");
    await this.importCheckFiles(files);
    await this.allPictureExist();
    await this.allPictureLoaded();
  }

  async allPictureLoaded() {
    const files = fs.readdirSync("./volume/pic-exam", { encoding: "utf8" });
    for (const file of files) {
      const pic = await this.examinationTicketsPicturesCrudService.find({
        path: file,
      });
      if (!pic) {
        await this.logService.create("не подтянута картинка: " + file);
      }
    }
  }

  async allPictureExist() {
    const allPic = await this.examinationTicketsPicturesCrudService.find();
    for (const pic of allPic) {
      const filePath = "./volume/pic-exam/" + pic.path;
      const fileExists = fs.existsSync(filePath);
      if (!fileExists) {
        await this.logService.create("не найдена картинка: " + filePath);
      }
    }
  }

  async importCheckFiles(files) {
    for (const file of files) {
      const filePath = "./volume/" + file;
      await this.importFile(filePath);
    }
  }

  async importFile(filePath) {
    let countTicket = 0;
    let currentQ;
    const fileName = filePath.split("/").pop().replace(".txt", "");
    const txt = fs.readFileSync(filePath).toString().split("\n");
    for (const strTxt of txt) {
      const str = strTxt.replace("\r", "");
      if (!str) continue;
      const question = this.getQuestion(str, fileName);
      if (question) {
        countTicket += await this.saveQuestion(currentQ);
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
    countTicket += await this.saveQuestion(currentQ);

    await this.logService.create(
      "import " + fileName + " импортировано вопросов " + countTicket
    );
  }

  async saveQuestion(q) {
    if (!q) return 0;
    const recTickets = await this.examinationTicketsCrudService.findOne({
      name: q.question,
    });
    // if (recTickets) return;
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
    return 1;
  }

  getQuestion(str, fileName) {
    const nom = str.split("--");
    let nom0 = nom[0];
    let nom1 = nom[1];
    if (nom.length < 2 || nom.length > 3 || !parseInt(nom0) || !parseInt(nom1))
      return undefined;
    const nom2 = this.getFilePicture(nom[2], fileName);
    return {
      queestion: parseInt(nom0),
      answerTrue: parseInt(nom1),
      picture: nom2,
    };
  }

  getFilePicture(filePic, fileName) {
    if (!filePic) return undefined;
    const files = fs
      .readdirSync("./volume/pic-exam", { encoding: "utf8" })
      .filter((v) => v.split(".")[0] === fileName + "-" + filePic);
    console.log(fileName + "-" + filePic, files);
    return files[0];
  }
}
