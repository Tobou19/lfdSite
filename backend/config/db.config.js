const dotenv = require("dotenv");
dotenv.config();

// ✅ Lire la variable d'environnement
const USE_POSTGRES = process.env.USE_POSTGRES === "true";

let db;

if (USE_POSTGRES) {
  // 🔹 PostgreSQL (Supabase)
  const { Pool } = require('pg');

  // Option 1 : Utiliser DATABASE_URL si disponible
  if (process.env.DATABASE_URL) {
    db = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    console.log('📡 Connexion via DATABASE_URL...');
  } 
  // Option 2 : Utiliser les paramètres individuels
  else {
    db = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT) || 5432,
      ssl: { rejectUnauthorized: false },
    });
    console.log('📡 Connexion via paramètres séparés...');
  }

  // Test de connexion avec timeout
  const testConnection = async () => {
    try {
      const client = await db.connect();
      console.log('✅ Connecté à PostgreSQL (Supabase) !');
      client.release();
    } catch (err) {
      console.error('❌ Erreur PostgreSQL :', err.message);
      console.log('\n🔧 Solutions possibles :');
      console.log('1. Vérifiez votre connexion Internet');
      console.log('2. Vérifiez les credentials Supabase dans .env');
      console.log('3. Allez sur : https://supabase.com/dashboard/project/sfxfgaxpsocgrirfrmtw/settings/database');
      console.log('4. Copiez la "Connection string" dans DATABASE_URL');
      console.log('5. Ou basculez sur MySQL local avec : USE_POSTGRES=false\n');
      // Ne pas quitter le process, juste avertir
    }
  };

  testConnection();

} else {
  // 🔹 MySQL (local XAMPP)
  const mysql = require('mysql2/promise');

  db = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'lfdmanagement',
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Test de connexion
  db.getConnection()
    .then(connection => {
      console.log('✅ Connecté à MySQL (Local) !');
      connection.release();
    })
    .catch(err => {
      console.error('❌ Erreur MySQL :', err.message);
      console.log('\n🔧 Solutions possibles :');
      console.log('1. Vérifiez que XAMPP est démarré');
      console.log('2. Vérifiez que MySQL est actif');
      console.log('3. Vérifiez les credentials dans .env\n');
    });
}

// ✅ Fonction helper pour gérer les différences de syntaxe
db.isPostgres = USE_POSTGRES;

// ✅ Helper pour les requêtes avec placeholder
db.queryAsync = async (sql, params = []) => {
  try {
    if (USE_POSTGRES) {
      // PostgreSQL utilise $1, $2, etc.
      let pgSql = sql;
      let paramIndex = 1;
      while (pgSql.includes('?')) {
        pgSql = pgSql.replace('?', `$${paramIndex}`);
        paramIndex++;
      }
      const result = await db.query(pgSql, params);
      return result.rows;
    } else {
      // MySQL utilise ?
      const [rows] = await db.query(sql, params);
      return rows;
    }
  } catch (err) {
    console.error('❌ Erreur requête DB :', err.message);
    throw err;
  }
};

module.exports = db;