import { Cascade, ManyToOne, Property } from "@mikro-orm/core";
import { PrimaryKey } from "@mikro-orm/core";
import { Entity } from "@mikro-orm/core";
import { ExaminationTickets } from "./examination-tickets.entity";

@Entity({ tableName: "examination_studied" })
export class ExaminationStudied {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  userId: number;

  @ManyToOne(() => ExaminationTickets, {
    nullable: false,
    cascade: [Cascade.ALL],
  })
  examinationTickets: ExaminationTickets;

  @Property({ onCreate: () => new Date() })
  created: Date;

  @Property({ default: 0 })
  success: number;

  @Property({ default: 0 })
  fail: number;

  @Property({ default: 0 })
  progress: number;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated: Date;
}
