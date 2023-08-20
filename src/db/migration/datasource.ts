import { DataSource, DataSourceOptions } from 'typeorm';

const migrationConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'fullstack_app',
  entities: ['src/db/**/*.entity.ts'],
  migrations: ['src/db/migration/history/*.ts'],
  migrationsTableName: 'migration',
  logging: true,
};

const datasource = new DataSource(migrationConfig);
datasource.initialize();
export default datasource;
