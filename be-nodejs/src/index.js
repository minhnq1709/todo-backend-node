import { createServer } from 'http';
import { URL } from 'url';
import { Client, Pool } from 'pg';
import { configDotenv } from 'dotenv';
import * as  bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

configDotenv();

// email config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'minhnq1709@gmail.com',
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN
    }
});

const saltRounds = 10;


const PG_USER = process.env.POSTGRE_USER || 'postgres';
const PG_PASSWORD = process.env.POSTGRE_PASSWORD || '1234';
const PG_DB = process.env.POSTGRE_DB || 'postgres';
const PG_PORT = process.env.POSTGRE_PORT || 5432;
const PG_HOST = process.env.POSTGRE_HOST || 'localhost';

const dbPool = new Pool({
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DB
});

async function getBodyAsObject(req) {
    let body = [];
    return new Promise((resolve, reject) => {
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
        req.on('error', (err) => {
            reject(err);
        });
    });

}

const responseHead = {
    'content-type': 'application/json'
};

const serverApp = createServer(async (req, res) => {
    const baseUrl = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseUrl);
    console.log(`Parsed url: ${parsedUrl}`);

    const reqUrl = req.url;
    const httpMethod = req.method;

    // process headers
    const headers = req.headers;

    // endpoints
    // FR-03: create task
    if (reqUrl == '/api/v1/todos' && httpMethod == 'POST') {
        if (!req.headers.authorization) {
            console.log('No authorization header');
            res.writeHead(401, responseHead);
            res.end(JSON.stringify({
                errorCode: 'UNAUTHORIZED'
            }));
            return;
        }
        else {
            res.writeHead(201, responseHead);
            // check body
            const body = await getBodyAsObject(req);
            console.log(body);
            res.end(JSON.stringify({
                id: 'pseudoId',
                status: 'TODO'
            }));
        }
    }
    else if (reqUrl == '/api/v1/auth/register' && httpMethod == 'POST') {
        // check email attached with email
        const reqBody = await getBodyAsObject(req);
        const email = reqBody.email;
        const queryGetUserResult = await dbPool.query({
            name: 'fetch-user',
            text: 'SELECT * FROM users WHERE email=$1',
            values: [email]
        });
        const isEmailFound = queryGetUserResult.rows.length;
        if (isEmailFound) {
            res.writeHead(400, responseHead);
            res.end(JSON.stringify({
                'errorMessage': 'Email is used for another account'
            }));
            return;
        }
        // const foundEmail = queryGetUserResult.rows[0].email;

        const password = reqBody.password;
        // hash password
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // store pass in db
            const queryInsertUserResult = await dbPool.query({
                name: 'insert-user',
                text: 'INSERT INTO users(email, password_hash, is_verified) VALUES ($1,$2,$3);',
                values: [email, hash, true]
            });
        });

        res.writeHead(200, responseHead);
        res.end(JSON.stringify({
            message: 'Account created, waiting for email verification'
        }));
    }
    else if (reqUrl == '/api/v1/todos' && httpMethod == 'POST') {
        // authentication

        // create task
        const reqBody = getBodyAsObject(req);
        if (!('title' in reqBody)) {
            res.writeHead(200);
        }
    }
});

const PORT = 3000;
async function startServer() {
    try {
        console.log(await dbPool.query('SELECT NOW()'));

        // init db
        await dbPool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(50) UNIQUE NOT NULL,
            password_hash CHAR(60) NOT NULL,
            is_verified BOOLEAN NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now()
        )`);
        await dbPool.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id),
            title VARCHAR(200) NOT NULL,
            description VARCHAR(2000),
            status VARCHAR(11) CHECK (status IN ('TODO', 'IN-PROGRESS', 'DONE')),
            due_date TIMESTAMPTZ,
            priority VARCHAR(8) CHECK(priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        )`);
    } catch (e) {
        console.error(e);
    }
    try {
        await transporter.verify();
        console.log('Server is ready to send mails');
    } catch (e) {
        console.error(e);

    }
    serverApp.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

startServer();