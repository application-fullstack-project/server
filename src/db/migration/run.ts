import { exec } from 'child_process';

exec(
  `npx typeorm-ts-node-esm migration:run -d src/db/migration/datasource.ts`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  },
);
