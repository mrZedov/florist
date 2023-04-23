import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "category" })
export class Category {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;
}
