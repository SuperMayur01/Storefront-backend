import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client:Pool

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database:POSTGRES_DB_TEST,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD,
    });
}else  {
    client = new Pool({
        host: POSTGRES_HOST,
        database:POSTGRES_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD,
    });
}

export default client;