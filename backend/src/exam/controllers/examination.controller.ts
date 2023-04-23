import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/auth.guard";
import { ExaminationImportService } from "../services/examination-import.service";
import { ExaminationStudiedService } from "../services/examination-studied.services";

@Controller("examination")
export class ExaminationController {
  constructor(
    private readonly examinationImportService: ExaminationImportService,
    private readonly examinationStudiedService: ExaminationStudiedService
  ) {}

  @Post("import")
  @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  async import() {
    this.examinationImportService.importManual();
  }

  @Get("studied")
  @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  async getStudied(@Req() req: any) {
    return this.examinationStudiedService.getStudied(req.user.id);
  }

  @Get("check-answer")
  @UseGuards(AuthGuard("jwt"), JwtAuthGuard)
  async checkAnswer(
    @Query("id") id: number,
    @Query("n") n: string,
    @Req() req: any
  ) {
    return this.examinationStudiedService.checkAnswer({
      userId: req.user.id,
      cardId: id,
      answer: n,
    });
  }
}
