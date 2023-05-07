import { Cascade, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ExaminationTickets } from "./examination-tickets.entity";

@Entity({ tableName: "examination_completed" })
export class ExaminationCompleted {
  @PrimaryKey()
  id!: number;

  @Property()
  userId: number;

  @ManyToOne(() => ExaminationTickets, { nullable: false, cascade: [Cascade.ALL] })
  examinationTickets: ExaminationTickets;

  @Property({ onCreate: () => new Date() })
  created: Date;

  @Property({ default: 0 })
  success: number;

  @Property({ default: 0 })
  fail: number;
}
