export default {
    type: 'postgresql',
    host: process.env.CENTRAL_PG_HOST,
    port: process.env.CENTRAL_PG_PORT,
    user: process.env.CENTRAL_PG_USER,
    password: process.env.CENTRAL_PG_PASSWORD,
    dbName: process.env.CENTRAL_PG_DB,
    debug: !!process.env.CENTRAL_PG_DEBUG,
    entities: ['./dist/**/*.entity.js', './node_modules/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts', './node_modules/**/*.entity.ts'],
    discovery: { warnWhenNoEntities: false },
    autoLoadEntities: true,
    migrations: {
      tableName: 'migrations', // name of database table with log of executed transactions
      path: './migrations', // path to the folder with migrations
      pattern: /^[\w-]+\d+\.(js|ts)$/, // regex pattern for the migration files
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: true, // wrap all migrations in master transaction
      dropTables: true, // allow to disable table dropping
      safe: false, // allow to disable table and column dropping
      emit: 'js', // migration generation mode
    },
  };
  