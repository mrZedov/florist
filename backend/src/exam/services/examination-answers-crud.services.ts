import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
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

  async find(where): Promise<any> {
    return await this.repository.find(where);
  }

  async findOne(where) {
    return await this.repository.findOne(where);
  }
}
