import { Property } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/core';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'studied_cards' })
export class StudiedCards {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  userId: number;

  @Property()
  cardId: number;

  @Property({ onCreate: () => new Date() })
  created: Date;

  @Property({ default: 0 })
  success: number;

  @Property({ default: 0 })
  fail: number;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated: Date;
}
