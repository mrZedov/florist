import { Property } from "@mikro-orm/core";
import { PrimaryKey } from "@mikro-orm/core";
import { Entity } from "@mikro-orm/core";

@Entity({ tableName: "log" })
export class Log {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, length: 2000 })
  message: string;

  @Property({ onCreate: () => new Date() })
  created: Date;
}
