import * as process from 'process';
import dotenv from 'dotenv';
import { Client } from 'pg';
import CryptoJS from 'crypto-js';

dotenv.config();

export async function getUserById(id: number) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    try {
        const queryUserById = {
            text: `SELECT id, username FROM users WHERE id = $1`,
            values: [id]
        };

        const user = await client.query(queryUserById);
        console.log(user);

        await client.end();
        return user.rows && user.rows[0];

    } catch (error) {
        await client.end();
        console.log(error);
        return error;
    }
}

export default async function getUser(name: string, passText: string) {

    const password = CryptoJS.SHA256(passText).toString();
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    await client.connect();

    try {
        const queryUser = {
            name: 'get-user',
            text: `SELECT id, username FROM users WHERE username = $1 AND password = $2`,
            values: [name, password]
        }

        const user = await client.query(queryUser);
        console.log(user);
        
        await client.end();
        return user.rows && user.rows[0];

    } catch (err) {
        await client.end();
        console.error(err);
        return err;
    }
}