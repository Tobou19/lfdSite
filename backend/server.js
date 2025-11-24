const dotenv = require("dotenv");
// Charger les variables d'environnement
dotenv.config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const db = require("./config/db.config.js");
const jwt = require("jsonwebtoken");
const beneficiaresRouter = require("./routes/beneficiares.routes.js");
const carnetRouter = require("./routes/carnet.routes.js");
const servicesRouter = require("./routes/services.routes.js");
const reservationsRouter = require("./routes/reservations.routes.js");
const testimonialsRouter = require("./routes/testimonials.routes.js");
const teamRouter = require("./routes/team.routes.js");
const articlesRouter = require("./routes/articles.routes.js");
const usersRouter = require("./routes/users.routes.js");


app.use(cors());
app.use(express.json());

const auth = require("./middlewares/auth");

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

app.get("/api/appointment", (req, res) => {
  db.query("SELECT * FROM contact", (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);
      res.status(500).json({ error: "Erreur serveur" });
    } else {
      res.status(200).json(results);
    }
  });
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const user = results[0];

    // ❗ Vérification SANS cryptage pour le moment
    if (user.password !== password) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // 🔥 Génération d’un token valide 7 jours
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "jkAZ9sJH8aSD7as8d7asd8A7D8A7d8ASD7as8d7A8SD7A8s7d8AS87D",
      { expiresIn: "7d" }
    );
    localStorage.setItem("user", JSON.stringify(res.data.user));


    res.json({
      message: "Authentification réussie",
      token,
      user: { id: user.id, email: user.email },
    });
  });
});


app.post("/api/contact", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
    preferredDate,
    preferredTime,
  } = req.body;

  db.query(
    "INSERT INTO contact (firstName, lastName, email, phone, subject, message, preferredDate, preferredTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      preferredDate,
      preferredTime,
    ],
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

app.use("/beneficiaires",beneficiaresRouter);
app.use("/carnet",carnetRouter);
app.use("/services",servicesRouter);
app.use("/reservations",reservationsRouter);
app.use("/testimonials",testimonialsRouter);
app.use("/team",teamRouter);
app.use("/articles",articlesRouter);
app.use("/users",usersRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
