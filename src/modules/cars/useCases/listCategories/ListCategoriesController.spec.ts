import {app} from "@shared/infra/http/app";

import request from 'supertest';
import {hash} from 'bcrypt';
import {v4 as uuidV4} from 'uuid';
import {Connection} from "typeorm";

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

const userLogin = 'admin@rentx.com.br';
const userPassword = 'admin';

describe("List Category Controller", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash(userPassword, 8);
        await connection.query('DELETE FROM users');
        await connection.query('DELETE FROM categories');
        await connection.query(
            `INSERT INTO users(
            id, name, email, password, is_admin, created_at, driver_license
        ) VALUES (
            '${id}', 'Admin', '${userLogin}', '${password}', true, 'now()', 'XXYYZZ'
        )`);
    });

    it('Should be able to list all available categories', async () => {

        const tokenResponse = await request(app)
            .post('/sessions')
            .send({
                email: userLogin,
                password: userPassword
            });

        const {token} = tokenResponse.body;

        await request(app)
            .post('/categories')
            .send({
                name: "Category Test",
                description: 'Category Description'
            }).set({
                Authorization: `Bearer ${token}`
            });

        const response = await request(app).get('/categories');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual('Category Test');
    });

});
