import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Cards } from "../entities/cards.entity";
import { StudiedCards } from "../entities/studied-cards.entity";
import { EntityManager, MikroORM } from "@mikro-orm/core";

@Injectable()
export class StudiedCardsService {
  constructor(
    @InjectRepository(StudiedCards)
    private readonly repositoryStudiedCards: EntityRepository<StudiedCards>,
    @InjectRepository(Cards)
    private readonly repositoryCards: EntityRepository<Cards>,
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
    return {
      studiedCards: studiedCards[0],
      alternativeName: await this.getAlternativeName(),
    };
  }

  async getAlternativeName() {
    const result = [];
    let countName = +process.env.ALTERNATIVE_NAME_CARD;
    const em = (this.orm.em as EntityManager).fork();
    const cardNames = await em.getConnection().execute(
      `select distinct c.name from cards c where c.deleted=false 
      `
    );
    while (countName-- > 0) {
      result.push(
        cardNames[Math.floor(Math.random() * (cardNames.length - 1))].name
      );
    }
    return result;
  }

  async findStudiedCards(userId) {
    const em = (this.orm.em as EntityManager).fork();
    return await em.getConnection().execute(
      `
        select c.id, c.original_file_ext as file_ext, c.name as name, category."name" as category, studied_c.success, studied_c.fail from cards c 
        inner join studied_cards studied_c
          left join users u on u.id = ${userId}
        on studied_c.card_id = c.id
        left join category category on category.id = c.category_id 
        order by studied_c.updated
        limit 1
        `
    );
  }

  private async addStudiedCards(data) {
    const em = (this.orm.em as EntityManager).fork();
    const freeCards = await em.getConnection().execute(
      `
      select c.* from cards c 
      left join completed_cards completed
        left join users u on u.id = ${data.userId}
      on completed.card_id = c.id
      left join studied_cards studied_c on studied_c.card_id=c.id and studied_c.user_id = ${data.userId}
      where completed.id is null and studied_c.id is null 
      limit ${process.env.CARDS_IN_STUDIING}      
      `
    );

    let i = 0;
    while (i < data.count) {
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
}
