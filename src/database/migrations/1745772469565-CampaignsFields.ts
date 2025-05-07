import { MigrationInterface, QueryRunner } from 'typeorm';

export class CampaignsFields1745772469565 implements MigrationInterface {
  name = 'CampaignsFields1745772469565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "endsAt" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "startsIn" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "budget" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "ownerId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD CONSTRAINT "FK_90d64375279aec38e309f12ff78" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP CONSTRAINT "FK_90d64375279aec38e309f12ff78"`,
    );
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "ownerId"`);
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "budget"`);
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "startsIn"`);
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "endsAt"`);
  }
}
