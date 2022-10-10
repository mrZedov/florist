'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20221008092154 extends Migration {
  async up() {
    this.addSql(`
      create table "studied_cards" (
        "id" serial primary key, "user_id" int4 not null, "card_id" int4 not null, "created" timestamptz(0) not null, "success" int4 default 0, "fail" int4 default 0,
        "updated" timestamptz(0) not null,
        constraint "cards_id_studied" foreign key ("card_id") references "cards" ("id") on update cascade on delete cascade,
        constraint "user_id_user" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade
      );`);

    this.addSql(`
      create table "completed_cards" (
        "id" serial primary key, "user_id" int4 not null, "card_id" int4 not null, "created" timestamptz(0) not null, "success" int4 default 0, "fail" int4 default 0,
        constraint "cards_id_studied" foreign key ("card_id") references "cards" ("id") on update cascade on delete cascade,
        constraint "user_id_user" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade
      );`);

            
  }

  async down() {
    this.addSql('drop table "studied_cards"');
    this.addSql('drop table "completed_cards"');
  }
}
exports.Migration20221008092154 = Migration20221008092154;
