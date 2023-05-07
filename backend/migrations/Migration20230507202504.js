'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230507202504 extends Migration {

  async up() {
    this.addSql('alter table "examination_tickets" add column "year_of_exam" varchar(100) null;');
  }

  async down() {
    this.addSql('alter table "examination_tickets" drop column "year_of_exam";');
  }

}
exports.Migration20230507202504 = Migration20230507202504;
