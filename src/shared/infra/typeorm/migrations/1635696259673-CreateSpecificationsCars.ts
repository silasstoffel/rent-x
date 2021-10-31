import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1635696259673
    implements MigrationInterface
{
    private tableName = "specifications_cars";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    { name: "car_id", type: "uuid" },
                    { name: "specification_id", type: "uuid" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                ],
            })
        );

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                name: "FKCarSpacification",
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"],
                onDelete: "no action",
                onUpdate: "no action",
            })
        );

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                name: "FKSpacificationCar",
                referencedTableName: "specifications",
                referencedColumnNames: ["id"],
                columnNames: ["specification_id"],
                onDelete: "no action",
                onUpdate: "no action",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(this.tableName, 'FKSpacificationCar');
        await queryRunner.dropForeignKey(this.tableName, 'FKCarSpacification');
        await queryRunner.dropTable(this.tableName);
    }
}
