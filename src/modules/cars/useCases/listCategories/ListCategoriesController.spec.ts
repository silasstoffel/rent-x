import {app} from "@shared/infra/http/app";

import request from 'supertest';
import {hash} from 'bcrypt';
import {v4 as uuidV4} from 'uuid';
import {Connection} from "typeorm";

import createConnection from '@shared/infra/typeorm';

describe("List Category Controller", () => {

    let connection: Connection;
    const userLogin = 'admin-list@rentx.com.br';
    const userPassword = 'admin-list-category';
    const categoriesNames = [];

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash(userPassword, 8);
        await connection.query(`DELETE FROM users WHERE email = '${userLogin}'`);
        await connection.query('DELETE FROM categories');
        await connection.query(
            `INSERT INTO users(
            id, name, email, password, is_admin, created_at, driver_license
        ) VALUES (
            '${id}', 'Admin', '${userLogin}', '${password}', true, 'now()', 'XXYYZZ'
        )`);
    });

    afterAll(async () => {
        categoriesNames.map(async (name) => {
            await connection.query(`DELETE FROM categories WHERE name = '${name}'`);
        });
        await connection.close();
    });

    it('Should be able to list all available categories', async () => {

        const tokenResponse = await request(app)
            .post('/sessions')
            .send({
                email: userLogin,
                password: userPassword
            });

        const {refresh_token: token} = tokenResponse.body;
        const category = `${token}-category`;
        categoriesNames.push(category);

        await request(app)
            .post('/categories')
            .send({
                name: category,
                description: 'Category Description'
            }).set({
                Authorization: `Bearer ${token}`
            });

        const response = await request(app).get('/categories');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty('name', category);
    });

});
