import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserDeleteUsername1621550326296
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const column = new TableColumn({
    name: "username",
    type: "varchar",
    isUnique: true,
    });
    await queryRunner.addColumn("users", column);
  }
}
