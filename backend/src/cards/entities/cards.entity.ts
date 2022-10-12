import { Property } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/core';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'cards' })
export class Cards {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  categoryId: number

  @Property()
  originalFileName: string

  @Property()
  originalFileExt: string
  
  @Property({ nullable: true })
  name: string;

  @Property({ onCreate: () => new Date() })
  created: Date;

  @Property({ default: false, type: 'boolean' })
  deleted: boolean;
}
