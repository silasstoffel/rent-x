import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1636921525435 implements MigrationInterface {
    private tableName = 'users_token';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {name: "id", type: "uuid", isPrimary: true},
                    {name: "user_id", type: "uuid"},
                    {name: "refresh_token", type: "varchar"},
                    {name: "expires_date", type: "timestamp"},
                    {name: "created_at", type: "timestamp", default: "now()"},
                ],
                foreignKeys: [
                    {
                        name: "FKUserToken",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
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
