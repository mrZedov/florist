import { EntityManager, MikroORM, EntityData } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InternalServerErrorException } from '@nestjs/common';
import { Cards } from '../entities/cards.entity';
import { UsersService } from 'src/users/services/users.services';
import { StudiedCards } from '../entities/studied-cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards) private readonly repositoryCards: EntityRepository<Cards>,
    @InjectRepository(StudiedCards) private readonly repositoryStudiedCards: EntityRepository<StudiedCards>,
    private readonly userService: UsersService,
  ) {}

  async create(data) {
    const newCard = await this.repositoryCards.create(data);
    await this.repositoryCards.persistAndFlush(newCard);
    return newCard;
  }

  async findByFileName(fileName: string): Promise<any> {
    return await this.repositoryCards.findOne({ fileName: fileName });
  }

  async find(where) {
    return await this.repositoryCards.findOne(where);
  }
}
