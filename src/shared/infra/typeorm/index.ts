import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host: string = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    const database = process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database;
    return createConnection(Object.assign(defaultOptions, { host, database }));
};
