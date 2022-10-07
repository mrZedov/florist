'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20221007213158 extends Migration {

  async up() {
    this.addSql('select 1');
  }

}
exports.Migration20221007213158 = Migration20221007213158;
