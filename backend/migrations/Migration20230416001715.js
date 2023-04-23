'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230416001715 extends Migration {

  async up() {
    this.addSql('create table "examination_tickets" ("id" serial primary key, "name" varchar(255) not null, "examination_answers_true_id" int null);');
    this.addSql('alter table "examination_tickets" add constraint "examination_tickets_examination_answers_true_id_unique" unique ("examination_answers_true_id");');

    this.addSql('create table "examination_answers" ("id" serial primary key, "name" varchar(255) not null, "examination_tickets_id" int not null);');

    this.addSql('alter table "examination_tickets" add constraint "examination_tickets_examination_answers_true_id_foreign" foreign key ("examination_answers_true_id") references "examination_answers" ("id") on update cascade on delete set null;');

    this.addSql('alter table "examination_answers" add constraint "examination_answers_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');

    this.addSql('alter table "category" drop column "group";');
  }

  async down() {
    this.addSql('alter table "examination_answers" drop constraint "examination_answers_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_tickets" drop constraint "examination_tickets_examination_answers_true_id_foreign";');

    this.addSql('drop table if exists "examination_tickets" cascade;');

    this.addSql('drop table if exists "examination_answers" cascade;');

    this.addSql('alter table "category" add column "group" varchar(255) not null;');
  }

}
exports.Migration20230416001715 = Migration20230416001715;
