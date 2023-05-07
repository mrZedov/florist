'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230507163951 extends Migration {

  async up() {
    this.addSql('create table "log" ("id" serial primary key, "message" varchar(2000) null, "created" timestamptz(0) not null);');
  }

  async down() {
    this.addSql('drop table if exists "log" cascade;');
  }

}
exports.Migration20230507163951 = Migration20230507163951;
