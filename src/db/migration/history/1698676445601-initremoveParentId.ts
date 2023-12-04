import { MigrationInterface, QueryRunner } from "typeorm";

export class InitremoveParentId1698676445601 implements MigrationInterface {
    name = 'InitremoveParentId1698676445601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "parent_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "parent_id" integer`);
    }

}
