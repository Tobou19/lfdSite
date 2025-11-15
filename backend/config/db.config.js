const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "lfdmanagement",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL :", err);
    process.exit(1);
  }
  console.log("✅ Connecté à MySQL");
});

// ✅ On exporte la connexion pour l’utiliser dans les controllers
module.exports = db;
