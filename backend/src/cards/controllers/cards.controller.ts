import { Get, Controller, Post, UseGuards, Body, UsePipes, Req } from '@nestjs/common';
import { CardsImportService } from '../services/cards-import.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CardsService } from '../services/cards.services';
import { StudiedCardsService } from '../services/studied-cards.services';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsImportService: CardsImportService, private readonly cardsService: CardsService, private readonly studiedCardsService: StudiedCardsService) {}

  @Post('import')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async import() {
    this.cardsImportService.importManual();
  }

  @Get('studied')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async getStudied(@Req() req: any) {
    return this.studiedCardsService.getStudied(req.user.id);
  }
}
