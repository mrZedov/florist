'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20221007213158 extends Migration {
  async up() {
    this.addSql('create table "cards" ("id" serial primary key, "file_name" varchar(300), "name" varchar(300), "created" timestamptz(0) not null, "deleted" bool not null default false);');
  }

  async down() {
    this.addSql('drop table "cards"');
  }
}
exports.Migration20221007213158 = Migration20221007213158;
