import { EntityManager, MikroORM, EntityData } from "@mikro-orm/core";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InternalServerErrorException } from "@nestjs/common";
import { ExaminationTickets } from "../entities/examination-tickets.entity";

@Injectable()
export class ExaminationTicketsCrudService {
  constructor(
    @InjectRepository(ExaminationTickets)
    private readonly repository: EntityRepository<ExaminationTickets>
  ) {}

  async create(data) {
    const newRec = await this.repository.create(data);
    await this.repository.persistAndFlush(newRec);
    return newRec;
  }

  async update(id, data) {
    const newRec = await this.repository.findOne({ id });
    for (const f in data) {
      newRec[f] = data[f];
    }
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

  async find(where?, options?) {
    return await this.repository.find(where, options);
  }

  async findOne(where) {
    return await this.repository.findOne(where);
  }
}
