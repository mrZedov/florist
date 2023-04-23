import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ExaminationTickets } from "./examination-tickets.entity";

@Entity({ tableName: "examination_tickets_pictures" })
export class ExaminationTicketsPictures {
  @PrimaryKey()
  id!: number;

  @Property()
  path: string;

  @ManyToOne(() => ExaminationTickets, { nullable: false })
  examinationTickets: ExaminationTickets;
}
