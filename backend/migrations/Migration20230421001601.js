'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230421001601 extends Migration {

  async up() {
    this.addSql('create table "examination_tickets_pictures" ("id" serial primary key, "path" varchar(255) not null, "examination_tickets_id" int not null);');
    this.addSql('alter table "examination_tickets_pictures" add constraint "examination_tickets_pictures_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');
  }

  async down() {
    this.addSql('drop table if exists "examination_tickets_pictures" cascade;');
  }

}
exports.Migration20230421001601 = Migration20230421001601;
