import {MigrationInterface, QueryRunner} from "typeorm";

export class UserManagment1693487460856 implements MigrationInterface {
	name = "UserManagment1693487460856";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
		await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
		await queryRunner.query(`ALTER TABLE "users" ADD "shipping_info" jsonb`);
		await queryRunner.query(`ALTER TABLE "users" ADD "credit" integer NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_d9b6738725c4cce03e3ae08f939" PRIMARY KEY ("id", "uid")`);
		await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
		await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'MANAGER', 'CLIENT')`);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`,
		);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CLIENT'`);
		await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CLIENT'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
		await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('ADMIN', 'EDITOR')`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`,
		);
		await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
		await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_d9b6738725c4cce03e3ae08f939"`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "credit"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "shipping_info"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
	}
}
