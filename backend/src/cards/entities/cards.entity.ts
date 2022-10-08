import { Property } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/core';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'cards' })
export class Cards {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name: string;

  @Property()
  fileName: string;

  @Property({ onCreate: () => new Date() })
  created: Date;

  @Property({ default: false, type: 'boolean' })
  deleted: boolean;
}
