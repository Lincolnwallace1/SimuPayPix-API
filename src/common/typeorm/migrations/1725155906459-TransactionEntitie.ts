import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionEntitie1725155906459 implements MigrationInterface {
  name = 'TransactionEntitie1725155906459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "code" uuid NOT NULL, "valueTransaction" numeric(10,2) NOT NULL, "status" character varying(32) NOT NULL, "type" character varying(32) NOT NULL, "schedule" TIMESTAMP, "paying" integer, "receiving" integer, "reversalReason" character varying(1024), "sentAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_24a02b002efb0eb554c2f7773d1" UNIQUE ("code"), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_70cf34bdd43e79c983905cf39c8" FOREIGN KEY ("paying") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_459c93174e5994decbd47dc811a" FOREIGN KEY ("receiving") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_459c93174e5994decbd47dc811a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_70cf34bdd43e79c983905cf39c8"`,
    );
    await queryRunner.query(`DROP TABLE "transaction"`);
  }
}
