import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { CardsController } from './controllers/cards.controller';
import { Cards } from './entities/cards.entity';
import { StudiedCards } from './entities/studied-cards.entity';
import { CardsImportService } from './services/cards-import.service';
import { CardsService } from './services/cards.services';
import { StudiedCardsService } from './services/studied-cards.services';

@Module({
  imports: [MikroOrmModule.forFeature([Cards, StudiedCards]), UsersModule],
  providers: [CardsService, CardsImportService, StudiedCardsService],
  controllers: [CardsController],
  exports: [],
})
export class CardsModule {}