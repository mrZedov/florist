import {
  Get,
  Controller,
  Post,
  UseGuards,
  Body,
  UsePipes,
  Req,
  Param,
  ParseIntPipe,
  Res,
} from "@nestjs/common";
import { CardsImportService } from "../services/cards-import.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/auth.guard";
import { CardsService } from "../services/cards.services";
import { StudiedCardsService } from "../services/studied-cards.services";
import { Response } from "express";

@Controller("cards")
export class CardsController {
  constructor(
    private readonly cardsImportService: CardsImportService,
    private readonly cardsService: CardsService,
    private readonly studiedCardsService: StudiedCardsService
  ) {}

  @Post('check-answer/:aa')
  //  @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  async checkAnswer(
    @Param('aa') aa: string,
    @Req() req: any,
    @Res() res: Response
  ) {
    console.log(1111);
    res.send('data');
    // return this.studiedCardsService.getStudied(req.user.id);
  }

  // @Post("import")
  // @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  // async import() {
  //   this.cardsImportService.importManual();
  // }

  // @Get("studied")
  // @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  // async getStudied(@Req() req: any) {
  //   return this.studiedCardsService.getStudied(req.user.id);
  // }
}
