const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'bazaar_db',
    password: 'password',
    port: 5433,
});

app.get('/api/articles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des articles");
    }
});

app.listen(port, () => {
    console.log(`Serveur API en cours d'exécution sur http://localhost:${port}`);
});
