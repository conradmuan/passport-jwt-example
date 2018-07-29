import * as process from 'process';
import dotenv from 'dotenv';
import { Client } from 'pg';
import CryptoJS from 'crypto-js';

dotenv.config();

export default async function createUsersTable() {
	const client = new Client({
		connectionString: process.env.DATABASE_URL
	});

	await client.connect();

	try {
		
		const createSchema = `CREATE TABLE IF NOT EXISTS "users" (
			"id" SERIAL PRIMARY KEY,
			"username" VARCHAR NOT NULL,
			"password" VARCHAR(64) NOT NULL
		)`;

		const seed = {
			name: 'seed',
			text: `INSERT INTO users(username, password) values ($1, $2) RETURNING *;`,
			values: ['conradmuan', CryptoJS.SHA256('my-new-pass').toString()]
		}

		const schemaResponse = await client.query(createSchema);
		console.log(schemaResponse);

		const response = await client.query(seed);
		console.log(response);

		await client.end();
		return response;

	} catch (err) {
		console.error(err);
		await client.end();
		return err;
	}
}

if (require.main === module) {
	createUsersTable();
}