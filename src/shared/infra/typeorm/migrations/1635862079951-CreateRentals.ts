import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRentals1635862079951 implements MigrationInterface {
    private tableName = 'rentals';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isNullable = true;
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {name: "id", type: "uuid", isPrimary: true},
                    {name: "car_id", type: "uuid"},
                    {name: "user_id", type: "uuid"},
                    {name: "start_date", type: "timestamp", default: "now()"},
                    {name: "end_date", type: "timestamp", default: null, isNullable},
                    {name: "expected_return_date", type: "timestamp", default: null},
                    {name: "total", type: "numeric", isNullable},
                    {name: "created_at", type: "timestamp", default: "now()"},
                    {name: "updated_at", type: "timestamp", default: "now()"},
                ],
                foreignKeys: [
                    {
                        name: "FKCarRental",
                        referencedTableName: "cars",
                        referencedColumnNames: ["id"],
                        columnNames: ["car_id"],
                        onDelete: "no action",
                        onUpdate: "no action",
                    },
                    {
                        name: "FKUserRental",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "no action",
                        onUpdate: "no action",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
