import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/auth.guard";
import { CardsImportService } from "../services/cards-import.service";
import { StudiedCardsService } from "../services/studied-cards.services";

@Controller("cards")
export class CardsController {
  constructor(
    private readonly cardsImportService: CardsImportService,
    private readonly studiedCardsService: StudiedCardsService
  ) {}

  @Get("check-answer")
  @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  async checkAnswer(
    @Query("id") id: number,
    @Query("n") n: string,
    @Req() req: any
  ) {
    return this.studiedCardsService.checkAnswer({
      userId: req.user.id,
      cardId: id,
      answer: n,
    });
  }

  @Post("import")
  @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  async import() {
    this.cardsImportService.importManual();
  }

  @Get("studied")
  @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  async getStudied(@Req() req: any) {
    return this.studiedCardsService.getStudied(req.user.id);
  }
}
