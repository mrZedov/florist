'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20221012065949 extends Migration {

  async up() {
    this.addSql('alter table "studied_cards" add column "progress" int4 not null default 0;');
  }
  async down() {
    this.addSql('alter table "studied_cards" drop column "progress";');
  }

}
exports.Migration20221012065949 = Migration20221012065949;
