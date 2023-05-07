import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { ExaminationTicketsPictures } from "../entities/examination-tickets-pictures.entity";

@Injectable()
export class ExaminationTicketsPicturesCrudService {
  constructor(
    @InjectRepository(ExaminationTicketsPictures)
    private readonly repository: EntityRepository<ExaminationTicketsPictures>
  ) {}

  async create(data) {
    const newRec = await this.repository.create(data);
    await this.repository.persistAndFlush(newRec);
    return newRec;
  }

  async find(where?) {
    return await this.repository.find(where);
  }

  async findOne(where) {
    return await this.repository.findOne(where);
  }
}
