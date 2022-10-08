'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20221008092154 extends Migration {

  async up() {
    this.addSql('select 1');
  }

}
exports.Migration20221008092154 = Migration20221008092154;
