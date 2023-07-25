import { exec } from 'child_process';

exec(
  'ts-node -r tsconfig-paths/register --project ./tsconfig.json ./node_modules/.bin/typeorm migration:run -d ./src/db/migration/migration.ts',
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  },
);
