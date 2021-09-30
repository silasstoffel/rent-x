import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddAvatarColumn1622500332632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const column = new TableColumn({
            name: "avatar",
            type: "varchar",
            isNullable: true
        });
        await queryRunner.addColumn("users", column);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar");
    }

}
