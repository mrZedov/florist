"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Migration } = require("@mikro-orm/migrations");

class Migration20221007213158 extends Migration {
  async up() {
    this.addSql(
      'create table "category" ("id" serial primary key, "name" varchar(300));'
    );
    this.addSql(`
      create table "cards" 
        ("id" serial primary key, "category_id" int4 null, "original_file_name" varchar(300), "original_file_ext" varchar(300), "name" varchar(300),
        "created" timestamptz(0) not null, "deleted" bool not null default false,
        constraint "category_id_studied" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade
        );
    `);
  }

  async down() {
    this.addSql('drop table "cards"');
    this.addSql('drop table "category"');
  }
}
exports.Migration20221007213158 = Migration20221007213158;
