import { MigrationInterface, QueryRunner } from 'typeorm';

export class CampaignsFields21746297999992 implements MigrationInterface {
  name = 'CampaignsFields21746297999992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "remainingBudget" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "statusId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD CONSTRAINT "FK_6136b71f36179b8e20282592ba4" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP CONSTRAINT "FK_6136b71f36179b8e20282592ba4"`,
    );
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "statusId"`);
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP COLUMN "remainingBudget"`,
    );
  }
}
