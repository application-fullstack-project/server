import { exec } from 'child_process';

exec(
  `ts-node -r tsconfig-paths/register --project ./tsconfig.json ./node_modules/.bin/typeorm migration:generate -d ./src/db/migration/migration.ts ./src/db/migration/history/${process.argv[2]}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  },
);
