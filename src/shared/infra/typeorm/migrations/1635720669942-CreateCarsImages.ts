import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCarsImages1635720669942 implements MigrationInterface {

    private tableName = "cars_image";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {name: "id", type: "uuid"},
                    {name: "car_id", type: "uuid"},
                    {name: "image_name", type: "varchar"},
                    {name: "created_at", type: "timestamp", default: "now()"},
                ],
                foreignKeys: [
                    {
                        name: "FKCarImage",
                        referencedTableName: "cars",
                        referencedColumnNames: ["id"],
                        columnNames: ["car_id"],
                        onDelete: "no action",
                        onUpdate: "no action",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(this.tableName, 'FKCarImage');
        await queryRunner.dropTable(this.tableName);
    }
}
