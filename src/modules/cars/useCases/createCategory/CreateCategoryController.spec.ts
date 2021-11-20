import {app} from "@shared/infra/http/app";

import request from 'supertest';
import {hash} from 'bcrypt';
import {v4 as uuidV4} from 'uuid';
import {Connection} from "typeorm";

import createConnection from '@shared/infra/typeorm';


describe("Category Controller", () => {
    let connection: Connection;
    const userLogin = 'admin@rentx.com.br';
    const userPassword = 'admin';

    beforeAll(async () => {
        const connection = await createConnection();
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

    afterAll(async() => {
        connection && await connection.close()
    })

    it('Should be able to create category', async () => {

        const tokenResponse = await request(app)
            .post('/sessions')
            .send({
                email: userLogin,
                password: userPassword
            });
        expect(tokenResponse.status).toBe(200);

        const {refresh_token: token} = tokenResponse.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: "Category Test",
                description: 'Category Description'
            }).set({
                Authorization: `Bearer ${token}`
            });

        expect(response.status).toBe(201);
    });

    it('Should not be able to create category with name exists', async () => {

        const tokenResponse = await request(app)
            .post('/sessions')
            .send({
                email: userLogin,
                password: userPassword
            });

        const {refresh_token: token} = tokenResponse.body;

        await request(app)
            .post('/categories')
            .send({
                name: "Category Test",
                description: 'Category Description'
            }).set({
                Authorization: `Bearer ${token}`
            });

        const response = await request(app)
            .post('/categories')
            .send({
                name: "Category Test",
                description: 'Category Description'
            }).set({
                Authorization: `Bearer ${token}`
            });

        expect(response.status).toBe(400);
    });
});
