import { getConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
    const connection = await createConnection();
    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO users(
            id, name, email, password, is_admin, created_at, driver_license
        ) VALUES (
            '${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXYYZZ'
        )`
    );

    await connection.close();
}

create().then(() => console.log("user admin was created."));
