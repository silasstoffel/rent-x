import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecifications1621295632648 implements MigrationInterface {
  private tableName: string;

  constructor() {
    this.tableName = "specifications";
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "name", type: "varchar" },
        { name: "description", type: "varchar" },
        { name: "created_at", type: "timestamp", default: "now()" },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
