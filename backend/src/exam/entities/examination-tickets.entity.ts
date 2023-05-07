import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ExaminationAnswers } from "./examination-answers.entity";
import { ExaminationTicketsPictures } from "./examination-tickets-pictures.entity";

@Entity({ tableName: "examination_tickets" })
export class ExaminationTickets {
  @PrimaryKey()
  id!: number;

  @Property({ length: 2000 })
  name: string;

  @OneToMany(() => ExaminationAnswers, (e) => e.examinationTickets)
  examinationAnswers: ExaminationAnswers[];

  @OneToMany(() => ExaminationTicketsPictures, (e) => e.examinationTickets)
  examinationTicketsPictures: ExaminationTicketsPictures[];

  @OneToOne(() => ExaminationAnswers, (e) => e.examinationTicketsTrue, {
    owner: true,
    nullable: true,
  })
  examinationAnswersTrue: ExaminationAnswers;
}
