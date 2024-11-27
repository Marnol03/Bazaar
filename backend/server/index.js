const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5001;

// Configuration pour les fichiers statiques
const path = require('path');
const { get } = require('http');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use(bodyParser.json());


// Clé secrète pour JWT 
const JWT_SECRET = 'dlhFgo35ijktidn7h';

// Connexion à la base de données PostgreSQL
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'bazaar_db',
    password: 'password',
    port: 5433,
});

//le transporteur SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'geteyesale@gmail.com', 
        pass: 'nvke absp jkad eayu',
    },
});

//envoyer un e-mail
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: '"Bazaar-support-SARL" <geteyesale@gmail.com>',
            to, 
            subject, 
            html: htmlContent, 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé :', info.messageId);
        return info;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        throw error;
    }
};

// Route : Récupération des articles (existant)
app.get('/api/articles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        console.log("articles recupérés");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des articles");
    }
});

// Route : Enregistrement d'un utilisateur
app.post('/api/register', async (req, res) => {
    const { email, motDePasse, numero, name } = req.body;
    console.log("req.body", req.body);
    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        await pool.query(
            'INSERT INTO users (email, password, phone, username) VALUES ($1, $2, $3, $4)',
            [email, hashedPassword, numero, name]
        );
        getuser();
        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'enregistrement." });
    }
});

// Route : Connexion d'un utilisateur
app.post('/api/login', async (req, res) => {
    const { email, motDePasse } = req.body;
    
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            console.log("utilisateur non trouvé");
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }

        const isPasswordValid = await bcrypt.compare(motDePasse, user.rows[0].password);
        if (!isPasswordValid) {
            console.log("mot de passe pareil a l\´ancien ");
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '30min' });

        console.log("connexion reussie");
        res.json({ message: 'Connexion réussie.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
});

app.post('/api/recover-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Vérifie si l'utilisateur existe
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }

        // Générer un token JWT pour la réinitialisation
        const resetToken = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '15m' });

        // Construire le lien de réinitialisation
        const resetLink = `http://localhost:3000/connexion/reset-password?token=${resetToken}`;

        const htmlContent = `
            <p>Bonjour,</p>
            <p>Vous avez demandé une réinitialisation de votre mot de passe.</p>
            <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>Si vous n'avez pas fait cette demande, ignorez cet email.</p>
        `;

        // Envoyer l'email
        await sendEmail(email, 'Réinitialisation de mot de passe', htmlContent);

        res.json({ message: 'Email de réinitialisation envoyé.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du mot de passe." });
    }
});


// Route : Réinitialisation du mot de passe
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    console.table(req.body);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, decoded.id]);
        
        getuser();
        res.json({ message: 'Mot de passe réinitialisé avec succès.' });

    } catch (error) {
        console.error(error);
        console.log("erreur lors de la réinitialisation du mot de passe");
        res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe." });
    }
});


// function : Récupération des utilisateurs
async function getuser() {
    try {
        const result = await pool.query('SELECT * FROM users');
        console.log("users recupérés: ", result.rows);
    } catch (error) {
        console.error(error);
        console.log("Erreur lors de la récupération des utilisateurs");
    }
};

getuser();
app.listen(port, () => {
    console.log(`Serveur API en cours d'exécution sur http://localhost:${port}`);
});
