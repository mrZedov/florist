import { Controller, Post, UseGuards, Body, UsePipes, Req } from '@nestjs/common';
import { CardsImportService } from '../services/cards-import.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsImportService: CardsImportService) {}

  @Post('import')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async import() {
    this.cardsImportService.importManual();
  }
}
