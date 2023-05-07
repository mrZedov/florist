import { Property } from "@mikro-orm/core";
import { PrimaryKey } from "@mikro-orm/core";
import { Entity } from "@mikro-orm/core";

@Entity({ tableName: "users" })
export class Users {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, length: 150 })
  name: string;

  @Property({ length: 150 })
  login: string;

  @Property({ onCreate: () => new Date() })
  created: Date;

  @Property({ nullable: true, length: 100 })
  password: string;

  @Property({ default: false, type: "boolean" })
  deleted: boolean;

  @Property({ nullable: true, length: 300 })
  email: string;

  @Property({ nullable: true })
  update: Date;
}
