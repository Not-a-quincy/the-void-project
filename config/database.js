import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const db = pool.promise();

export default db;

// Connection Test
db.getConnection()
    .then(connection => {
        console.log('✅ SQL Connection established successfully.');
        connection.release(); // Return it to the pool
    })
    .catch(err => {
        console.error('❌ SQL Connection failed:', err.message);
    });