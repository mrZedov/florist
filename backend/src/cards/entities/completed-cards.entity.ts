import { Property } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/core';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'completed_cards' })
export class CompletedCards {
  @PrimaryKey()
  id!: number;

  @Property()
  userId: number;

  @Property()
  cardId: number;

  @Property({ onCreate: () => new Date() })
  created: Date;

  @Property({ default: 0 })
  success: number;

  @Property({ default: 0 })
  fail: number;
}
