import express from 'express';
import dotenv from 'dotenv';
import ghostRoutes from './routes/ghostRoutes.js';

// Initialize dotenv at the very top
dotenv.config();

const app = express();

// 1. SETTINGS
app.set("view engine", "ejs");

// 2. MIDDLEWARE 
// This allows Express to read JSON data sent from your frontend (index.js)
app.use(express.json()); 
// This serves your CSS and Client-side JS
app.use(express.static('public'));

// 3. ROUTES
// Mount your ghost logic. Now all routes in ghostRoutes.js start with /ghosts
app.use('/ghosts', ghostRoutes); 

app.get('/', (req, res) => {
    res.render("index");
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'The void could not find that page.' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'The Void encountered an unexpected error.'
    });
});

// 4. START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The Void is open on port ${port}`);
});