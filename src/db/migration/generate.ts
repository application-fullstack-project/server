import { exec } from 'child_process';

exec(
  `npx typeorm-ts-node-esm migration:generate -d src/db/migration/datasource.ts src/db/migration/history/init${process.argv[2]}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  },
);
