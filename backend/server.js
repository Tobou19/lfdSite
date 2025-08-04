const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MySQL directement ici
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'test'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion MySQL :', err);
    process.exit(1);
  }
  console.log('✅ Connecté à MySQL');
});

// Route test
app.get('/', (req, res) => {
  res.send('Backend Express.js + MySQL prêt ✅');
});

// Exemple : Récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur MySQL :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      res.json(results);
    }
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
