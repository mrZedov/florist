'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230506223836 extends Migration {

  async up() {
    this.addSql('alter table "examination_studied" drop constraint "examination_studied_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_completed" drop constraint "examination_completed_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_answers" drop constraint "examination_answers_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_tickets_pictures" drop constraint "examination_tickets_pictures_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_studied" add constraint "examination_studied_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "examination_completed" add constraint "examination_completed_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "examination_answers" add constraint "examination_answers_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "examination_tickets_pictures" add constraint "examination_tickets_pictures_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade on delete cascade;');
  }

  async down() {
    this.addSql('alter table "examination_studied" drop constraint "examination_studied_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_completed" drop constraint "examination_completed_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_answers" drop constraint "examination_answers_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_tickets_pictures" drop constraint "examination_tickets_pictures_examination_tickets_id_foreign";');

    this.addSql('alter table "examination_studied" add constraint "examination_studied_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');

    this.addSql('alter table "examination_completed" add constraint "examination_completed_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');

    this.addSql('alter table "examination_answers" add constraint "examination_answers_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');

    this.addSql('alter table "examination_tickets_pictures" add constraint "examination_tickets_pictures_examination_tickets_id_foreign" foreign key ("examination_tickets_id") references "examination_tickets" ("id") on update cascade;');
  }

}
exports.Migration20230506223836 = Migration20230506223836;
