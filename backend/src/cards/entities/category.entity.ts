import { Property } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/core';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'category' })
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name: string;
}
