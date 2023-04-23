import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { ExaminationController } from "./controllers/examination.controller";
import { ExaminationAnswers } from "./entities/examination-answers.entity";
import { ExaminationCompleted } from "./entities/examination-completed.entity";
import { ExaminationStudied } from "./entities/examination-studied.entity";
import { ExaminationTicketsPictures } from "./entities/examination-tickets-pictures.entity";
import { ExaminationTickets } from "./entities/examination-tickets.entity";
import { ExaminationAnswersCrudService } from "./services/examination-answers-crud.services";
import { ExaminationImportService } from "./services/examination-import.service";
import { ExaminationStudiedService } from "./services/examination-studied.services";
import { ExaminationTicketsCrudService } from "./services/examination-tickets-crud.services";
import { ExaminationTicketsPicturesCrudService } from "./services/examination-tickets-pictures-crud.services";

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ExaminationTickets,
      ExaminationAnswers,
      ExaminationStudied,
      ExaminationCompleted,
      ExaminationTicketsPictures,
    ]),
    UsersModule,
  ],
  providers: [
    ExaminationAnswersCrudService,
    ExaminationTicketsCrudService,
    ExaminationImportService,
    ExaminationStudiedService,
    ExaminationTicketsPicturesCrudService,
  ],
  controllers: [ExaminationController],
  exports: [],
})
export class ExaminationModule {}
