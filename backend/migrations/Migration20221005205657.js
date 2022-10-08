'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20221005205657 extends Migration {
  async up() {
    this.addSql('create table "users" ("id" serial primary key, "name" varchar(150), "login" varchar(150), "password" varchar(100), "created" timestamptz(0) not null, "deleted" bool not null default false);');
  }

  async down() {
    this.addSql('drop table "users"');
  }
}
exports.Migration20221005205657 = Migration20221005205657;
