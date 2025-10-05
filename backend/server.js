const dotenv = require("dotenv");
// Charger les variables d'environnement
dotenv.config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "lfd_gestion",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL :", err);
    process.exit(1);
  }
  console.log("✅ Connecté à MySQL");
});


app.get("/", (req, res) => {
  res.send("Backend Express.js + MySQL prêt ✅");
});


app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);
      res.status(500).json({ error: "Erreur serveur" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/appointment", (req, res)=>{
  db.query("SELECT * FROM contact", (err,results)=>{
    if(err){
      console.error("Erreur MySQL :", err);
      res.status(500).json({error: "Erreur serveur"});
    }else{
      res.status(200).json(results);
    }
  })
});
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Erreur MySQL :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else if (results.length > 0) {
        res.json({ message: "Authentification réussie", user: results[0] });
      } else {
        res.status(401).json({ error: "Identifiants invalides" });
      }
    }
  );
});

app.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, phone, subject, message, preferredDate, preferredTime } = req.body;

  db.query(
    "INSERT INTO contact (firstName, lastName, email, phone, subject, message, preferredDate, preferredTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, phone, subject, message, preferredDate, preferredTime],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur MySQL :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json({ message: "✅ Votre demande a ete envoye" });
      }
    }
  );
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
