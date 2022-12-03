import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Cards } from "../entities/cards.entity";
import { StudiedCards } from "../entities/studied-cards.entity";
import { EntityManager, MikroORM } from "@mikro-orm/core";
import { CardsService } from "./cards.services";
import { CompletedCards } from "../entities/completed-cards.entity";

@Injectable()
export class StudiedCardsService {
  constructor(
    @InjectRepository(StudiedCards)
    private readonly repositoryStudiedCards: EntityRepository<StudiedCards>,
    @InjectRepository(CompletedCards)
    private readonly repositoryCompletedCards: EntityRepository<CompletedCards>,
    private readonly cardsService: CardsService,
    private readonly orm: MikroORM
  ) {}

  async find(where): Promise<any[]> {
    return await this.repositoryStudiedCards.find(where);
  }

  async getStudied(userId: number) {
    let studiedCards = await this.find({ userId: userId });
    if (studiedCards.length < +process.env.CARDS_IN_STUDIING) {
      const newCards = await this.addStudiedCards({
        userId: userId,
        count: +process.env.CARDS_IN_STUDIING - studiedCards.length,
      });
    }
    studiedCards = await this.findStudiedCards(userId);
    const alternativeName = await this.getAlternativeName(
      studiedCards[0].name,
      studiedCards[0].categoryId
    );
    alternativeName.push(studiedCards[0].name);
    alternativeName.sort(() => Math.random() - 0.5);
    return {
      studiedCards: studiedCards[0],
      alternativeName: alternativeName,
    };
  }

  async getAlternativeName(name, categoryId) {
    const result = [];
    let countName = +process.env.ALTERNATIVE_NAME_CARD - 1;
    const em = (this.orm.em as EntityManager).fork();
    const cardNames = await em
      .getConnection()
      .execute(
        `select distinct c.name from cards c where c.deleted=false and c.name<>'${name}' and ` +
          (categoryId ? `c.category_id=${categoryId}` : `c.category_id is null`)
      );
    while (countName-- > 0) {
      const idx = Math.floor(Math.random() * (cardNames.length - 1));
      result.push(cardNames[idx].name);
      cardNames.splice(idx, 1);
    }
    return result;
  }

  async findStudiedCards(userId) {
    const em = (this.orm.em as EntityManager).fork();
    const count = await em.getConnection().execute(`
        select count(c.id) from cards c 
        inner join studied_cards studied_c
          left join users u on u.id = ${userId}
        on studied_c.card_id = c.id and studied_c.user_id = ${userId}
        `);
    return await em.getConnection().execute(`
        select c.id, c.original_file_ext as file_ext, c.name as name, c.category_id as "categoryId", category."name" as category, studied_c.success, studied_c.fail from cards c 
        inner join studied_cards studied_c
          left join users u on u.id = ${userId}
        on studied_c.card_id = c.id and studied_c.user_id = ${userId}
        left join category category on category.id = c.category_id 
        order by studied_c.updated
        limit 1 offset ${Math.round(Math.random() * (+count[0].count / 3))}
        `);
  }

  private async addStudiedCards(data) {
    const em = (this.orm.em as EntityManager).fork();
    const freeCards = await em.getConnection().execute(
      `
      select c.* from cards c 
      left join completed_cards completed
        left join users u on u.id = ${data.userId}
      on completed.card_id = c.id and completed.user_id = ${data.userId}
      left join studied_cards studied_c on studied_c.card_id=c.id and studied_c.user_id = ${data.userId}
      where completed.id is null and studied_c.id is null 
      limit ${process.env.CARDS_IN_STUDIING}      
      `
    );

    let i = 0;
    while (i < data.count) {
      if (i > freeCards.length || !freeCards[i]) break;
      await this.create({ card: freeCards[i++], userId: data.userId });
    }
  }

  async create(data) {
    const newCard = await this.repositoryStudiedCards.create({
      userId: data.userId,
      cardId: data.card.id,
    });
    await this.repositoryStudiedCards.persistAndFlush(newCard);
  }

  async fixAnswer(data) {
    const newCard = await this.repositoryStudiedCards.findOne({
      userId: data.userId,
      cardId: data.cardId,
    });
    if (data.resAnswer) {
      newCard.success++;
      newCard.progress++;
    } else {
      newCard.fail++;
      if (newCard.progress > 0) newCard.progress--;
    }
    if (newCard.progress > +process.env.MAX_CARD_PROGRESS) {
      await this.repositoryStudiedCards.nativeDelete(newCard);
      await this.studySuccess({
        cardId: newCard.cardId,
        userId: data.userId,
        success: newCard.success,
        fail: newCard.fail,
      });
    } else {
      await this.repositoryStudiedCards.persistAndFlush(newCard);
    }
  }

  async studySuccess(data) {
    const newCard = await this.repositoryCompletedCards.create({
      userId: data.userId,
      cardId: data.cardId,
      success: data.success,
      fail: data.fail,
    });
    await this.repositoryCompletedCards.persistAndFlush(newCard);
  }

  async checkAnswer(data) {
    const card = await this.cardsService.find({ id: data.cardId });
    const resAnswer = card.name === data.answer;
    this.fixAnswer({
      userId: data.userId,
      cardId: data.cardId,
      resAnswer: resAnswer,
    });
    return {
      rightAnswer: card.name,
      resAnswer: resAnswer,
      answer: data.answer,
    };
  }
}
