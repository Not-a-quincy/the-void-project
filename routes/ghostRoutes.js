import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// GET all names from the database
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT name FROM ghosts ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'The Void failed to speak.' });
    }
});

// POST a new name into the database
router.post('/', async (req, res) => {

    const { name } = req.body;
    try {
        await db.query('INSERT INTO ghosts (name) VALUES (?)', [name]);
        res.status(201).json({ name });
    } catch (err) {
        res.status(500).json({ error: 'The Void rejected your name.' });
    }
});

export default router;