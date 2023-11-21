import { MigrationInterface, QueryRunner } from "typeorm";

export class WishlistNameCreate1700553386464 implements MigrationInterface {
    name = 'WishlistNameCreate1700553386464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wishlist_name" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "customer_id" character varying NOT NULL, CONSTRAINT "PK_31afb60122a06a75ad03b69c913" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "wishlist_name_id" character varying NOT NULL, "variant_id" character varying, CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_94efb366c82b0bd25d75ddf74d2" FOREIGN KEY ("wishlist_name_id") REFERENCES "wishlist_name"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_94efb366c82b0bd25d75ddf74d2"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "wishlist_name"`);
    }

}
