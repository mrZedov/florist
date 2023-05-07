import { EntityManager, MikroORM } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { ExaminationCompleted } from "../entities/examination-completed.entity";
import { ExaminationStudied } from "../entities/examination-studied.entity";
import { ExaminationTicketsCrudService } from "./examination-tickets-crud.services";
import { ExaminationAnswersCrudService } from "./examination-answers-crud.services";

@Injectable()
export class ExaminationStudiedService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(ExaminationStudied)
    private readonly repositoryExaminationStudied: EntityRepository<ExaminationStudied>,
    @InjectRepository(ExaminationCompleted)
    private readonly repositoryExaminationCompleted: EntityRepository<ExaminationCompleted>,
    private readonly examinationAnswersCrudService: ExaminationAnswersCrudService,
    private readonly examinationTicketsCrudService: ExaminationTicketsCrudService
  ) {}

  async find(where): Promise<any[]> {
    return await this.repositoryExaminationStudied.find(where);
  }

  async totalSucess(userId) {
    const em = (this.orm.em as EntityManager).fork();
    const rec = await em
      .getConnection()
      .execute(
        `select count(*) as "countExems", sum(progress) "countProgress" from examination_studied es where es.user_id=${userId}`
      );
    const result = rec[0];
    const maxScore = +process.env.MAX_EXAM_PROGRESS * +result.countExems;
    if (!maxScore) return 0;
    return Math.floor((result.countProgress / maxScore) * 10000) / 100 + "%";
  }

  async getStudied(userId: number) {
    const totalSuccess = await this.totalSucess(userId);
    let studiedCards = await this.find({ userId: userId });
    if (studiedCards.length < +process.env.CARDS_IN_STUDIING) {
      const newCards = await this.addStudiedCards({
        userId: userId,
        count: +process.env.CARDS_IN_STUDIING - studiedCards.length,
      });
    }
    studiedCards = await this.findStudiedCard(userId);
    const answers = await this.getAnswers(studiedCards["id"]);
    answers.sort(() => Math.random() - 0.5);
    return {
      studiedCards: studiedCards,
      alternativeName: answers,
      totalSuccess: totalSuccess,
    };
  }

  async getAnswers(id) {
    const cardNames = (
      await this.examinationAnswersCrudService.find({
        examinationTickets: id,
      })
    ).map((el) => {
      return el.name;
    });
    return cardNames;
  }

  async findStudiedCard(userId): Promise<any> {
    const em = (this.orm.em as EntityManager).fork();
    const recCount = await em
      .getConnection()
      .execute(`select count(*) from examination_studied where user_id = ${userId}`);
    const rec = await em.getConnection().execute(
      `
        select c.id, c.name as name, studied_c.success, studied_c.fail, etp.path as picture, studied_c.progress, studied_c.updated from examination_tickets c 
        inner join examination_studied studied_c
          left join users u on u.id = ${userId}
        on studied_c.examination_tickets_id = c.id and studied_c.user_id = ${userId}
        left join examination_tickets_pictures etp on etp.examination_tickets_id=studied_c.examination_tickets_id
        order by studied_c.progress, studied_c.updated
        limit 1 offset ${Math.round(Math.random() * (+recCount[0].count / 10))}
        `
    );
    const result = rec[0];
    return { ...result };
  }

  private async addStudiedCards(data) {
    const em = (this.orm.em as EntityManager).fork();
    const freeCards = await em.getConnection().execute(
      `
      select c.* from examination_tickets c 
      left join examination_completed completed
        left join users u on u.id = ${data.userId}
      on completed.examination_tickets_id = c.id and completed.user_id = ${data.userId}
      left join examination_studied studied_c on studied_c.examination_tickets_id=c.id and studied_c.user_id = ${data.userId}
      where completed.id is null and studied_c.id is null 
      limit ${process.env.CARDS_IN_STUDIING}      
      `
    );

    let i = 0;
    while (i < data.count) {
      if (freeCards.length > i)
        await this.create({ card: freeCards[i], userId: data.userId });
      i++;
    }
  }

  async create(data) {
    const newCard = await this.repositoryExaminationStudied.create({
      userId: data.userId,
      examinationTickets: data.card.id,
    });
    await this.repositoryExaminationStudied.persistAndFlush(newCard);
  }

  async fixAnswer(data) {
    const newCard = await this.repositoryExaminationStudied.findOne({
      userId: data.userId,
      examinationTickets: data.examinationTickets,
    });
    if (data.resAnswer) {
      newCard.success++;
      if (newCard.progress < +process.env.MAX_EXAM_PROGRESS) newCard.progress++;
    } else {
      newCard.fail++;
      if (newCard.progress > 0) newCard.progress -= 2;
    }
    if (newCard.progress > +process.env.MAX_CARD_PROGRESS) {
      await this.repositoryExaminationStudied.nativeDelete(newCard);
      await this.studySuccess({
        examinationTickets: newCard.examinationTickets,
        userId: data.userId,
        success: newCard.success,
        fail: newCard.fail,
      });
    } else {
      await this.repositoryExaminationStudied.persistAndFlush(newCard);
    }
  }

  async studySuccess(data) {
    const newCard = await this.repositoryExaminationCompleted.create({
      userId: data.userId,
      examinationTickets: data.examinationTickets,
      success: data.success,
      fail: data.fail,
    });
    await this.repositoryExaminationStudied.persistAndFlush(newCard);
  }

  async checkAnswer(data) {
    const card = await this.examinationTicketsCrudService.findOne({
      id: data.cardId,
    });
    const cardA = await this.examinationAnswersCrudService.findOne({
      id: card.examinationAnswersTrue,
    });
    const resAnswer = cardA.name === data.answer;
    await this.fixAnswer({
      userId: data.userId,
      examinationTickets: data.cardId,
      resAnswer: resAnswer,
    });
    return {
      rightAnswer: cardA.name,
      resAnswer: resAnswer,
      answer: data.answer,
    };
  }
}
