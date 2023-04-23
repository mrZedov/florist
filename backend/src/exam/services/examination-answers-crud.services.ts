import { EntityManager, MikroORM, EntityData } from "@mikro-orm/core";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InternalServerErrorException } from "@nestjs/common";
import { ExaminationTickets } from "../entities/examination-tickets.entity";
import { ExaminationAnswers } from "../entities/examination-answers.entity";

@Injectable()
export class ExaminationAnswersCrudService {
  constructor(
    @InjectRepository(ExaminationAnswers)
    private readonly repository: EntityRepository<ExaminationAnswers>
  ) {}

  async create(data) {
    const newRec = await this.repository.create(data);
    await this.repository.persistAndFlush(newRec);
    return newRec;
  }

  // async findByFileName(file): Promise<any> {
  //   if (isNaN(Number(file.name))) return undefined;
  //   return await this.repositoryCards.findOne({
  //     id: file.name,
  //     originalFileExt: file.ext,
  //   });
  // }

  async find(where): Promise<any> {
    return await this.repository.find(where);
  }

  async findOne(where) {
    return await this.repository.findOne(where);
  }
}
