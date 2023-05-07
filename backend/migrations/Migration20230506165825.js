'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230506165825 extends Migration {

  async up() {
    this.addSql('alter table "users" add column "update" timestamptz(0) null;');
  }

  async down() {
    this.addSql('alter table "users" drop column "update";');
  }

}
exports.Migration20230506165825 = Migration20230506165825;
