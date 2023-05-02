'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230502222440 extends Migration {

  async up() {
    this.addSql('alter table "users" add column "email" varchar(300) null;');
  }

  async down() {
    this.addSql('alter table "users" drop column "email";');
  }

}
exports.Migration20230502222440 = Migration20230502222440;
