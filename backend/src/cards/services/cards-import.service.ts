import { EntityData } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InternalServerErrorException } from '@nestjs/common';
import { Cards } from '../entities/cards.entity';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import { CardsService } from './cards.services';

@Injectable()
export class CardsImportService {
  constructor(private readonly cardsService: CardsService) {}

  @Cron('* * * * *')
  async import() {
    console.log('Cron import cards ', new Date());
  }

  async importManual() {
    const files = fs.readdirSync('.\\volume', { encoding: 'utf8' });
    await this.importCheckFiles(files);
  }

  async importCheckFiles(files) {
    for (const f of files) {
      const recCard = await this.cardsService.findByFileName(f);
      if (recCard) continue;
      const fileName = this.getFileName(f);
      await this.cardsService.create({ fileName: f, name: fileName });
    }
  }

  getFileName(f) {
    const dotIndex = f.lastIndexOf('.');
    return f.substr(0, dotIndex);
  }
}
