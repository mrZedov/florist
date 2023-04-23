import {
  Cascade,
  Collection,
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

  @Property({length:2000})
  name: string;

  @OneToMany(
    () => ExaminationAnswers,
    (examinationAnswers) => examinationAnswers.examinationTickets,
    { cascade: [Cascade.REMOVE], orphanRemoval: true }
  )
  examinationAnswers = new Collection<ExaminationAnswers>(this);

  @OneToMany(
    () => ExaminationTicketsPictures,
    (examinationTicketsPictures) => examinationTicketsPictures.examinationTickets,
    { cascade: [Cascade.ALL], orphanRemoval: true }
  )
  examinationTicketsPictures = new Collection<ExaminationTicketsPictures>(this);
  
  @OneToOne(
    () => ExaminationAnswers,
    (examinationAnswersTrue) => examinationAnswersTrue.examinationTicketsTrue,
    { owner: true, nullable: true }
  )
  examinationAnswersTrue: ExaminationAnswers;
}
