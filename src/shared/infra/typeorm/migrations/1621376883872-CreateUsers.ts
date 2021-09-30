import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1621376883872 implements MigrationInterface {
  private tableName: string;

  constructor() {
    this.tableName = "users";
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
    name: this.tableName,
    columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "name", type: "varchar" },
        { name: "username", type: "varchar", isUnique: true },
        { name: "password", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "driver_license", type: "varchar" },
        { name: "is_admin", type: "boolean", default: false },
        { name: "created_at", type: "timestamp", default: "now()" },
    ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
