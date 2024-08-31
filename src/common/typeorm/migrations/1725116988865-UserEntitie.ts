import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntitie1725116988865 implements MigrationInterface {
  name = 'UserEntitie1725116988865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(128) NOT NULL, "fullname" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "accountBalance" numeric(10,2) NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
