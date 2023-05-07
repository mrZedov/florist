import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Log } from "./log.entity";

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly repository: EntityRepository<Log>
  ) {}

  async create(message: string): Promise<void> {
    const rec = this.repository.create({ message: message });
    await this.repository.persistAndFlush(rec);
  }
}
