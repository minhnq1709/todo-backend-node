import express from 'express';
import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/user.js';
import { Todo } from './entities/todo.js';
configDotenv();
const PORT = (process.env.PORT ?? 3000); // nullish coalescing: a ?? b return b when a is null or undefined
const POSTGRES_USER = (process.env.POSTGRES_USER ?? 'postgres');
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? '1234';
const POSTGRES_DB = process.env.POSTGRES_DB ?? 'postgres';
const POSTGRES_PORT = (process.env.POSTGRES_PORT ?? 5432);
const POSTGRES_HOST = process.env.POSTGRES_HOST ?? 'localhost';
const dbClient = new DataSource({
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [User, Todo],
    synchronize: true, // auto create db schema on app launch, use when debug or dev, avoid production to prevent data loss
    logging: false
});
const app = express();
// a route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, async (err) => {
    if (err)
        throw err;
    try {
        await dbClient.initialize();
    }
    catch (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map