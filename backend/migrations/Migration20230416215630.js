'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230416215630 extends Migration {

  async up() {
    this.addSql('create table "examination_studied" ("id" serial primary key, "user_id" int null, "examination_tickets_id" int not null, "created" timestamptz(0) not null, "success" int not null default 0, "fail" int not null default 0, "progress" int not null default 0, "updated" timestamptz(0) not null);');

    this.addSql('create table "examination_completed" ("id" serial primary key, "user_id" int not null, "examination_tickets_id" int not null, "created" timestamptz(0) not null, "success" int not null default 0, "fail" int not null default 0);');

    this.addSql('alter table "examination_studied" add constraint "examination_studied_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');

    this.addSql('alter table "examination_completed" add constraint "examination_completed_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');
  }

  async down() {
    this.addSql('drop table if exists "examination_studied" cascade;');

    this.addSql('drop table if exists "examination_completed" cascade;');
  }

}
exports.Migration20230416215630 = Migration20230416215630;
