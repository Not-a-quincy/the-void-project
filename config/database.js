import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const db = pool;

export default db;

// Connection Test
db.connect()
    .then(client => {
        console.log('✅ PostgreSQL Connection established successfully.');
        client.release();
    })
    .catch(err => {
        console.error('❌ PostgreSQL Connection failed:', err.message);
    });