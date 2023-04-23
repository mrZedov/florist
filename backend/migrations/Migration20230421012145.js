"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Migration } = require("@mikro-orm/migrations");

class Migration20230421012145 extends Migration {
  async up() {
    this.addSql(
      'alter table "examination_tickets" alter column "name" type varchar(2000) using ("name"::varchar(2000));'
    );
  }

  async down() {
    this.addSql(
      'alter table "examination_tickets" alter column "name" type varchar(255) using ("name"::varchar(255));'
    );
  }
}
exports.Migration20230421012145 = Migration20230421012145;
