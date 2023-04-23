import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ExaminationTickets } from "./examination-tickets.entity";

@Entity({ tableName: "examination_answers" })
export class ExaminationAnswers {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @ManyToOne(() => ExaminationTickets, { nullable: false })
  examinationTickets: ExaminationTickets;

  @OneToOne({ mappedBy: 'examinationAnswersTrue', orphanRemoval: true })
  examinationTicketsTrue: ExaminationTickets;
}
