const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./config/db.config.js"); // ⚠ Doit utiliser pg.pool / pg.client

// Routes modules
const beneficiaresRouter = require("./routes/beneficiares.routes.js");
const carnetRouter = require("./routes/carnet.routes.js");
const servicesRouter = require("./routes/services.routes.js");
const reservationsRouter = require("./routes/reservations.routes.js");
const testimonialsRouter = require("./routes/testimonials.routes.js");
const teamRouter = require("./routes/team.routes.js");
const articlesRouter = require("./routes/articles.routes.js");
const usersRouter = require("./routes/users.routes.js");

const app = express();
app.use(cors());
app.use(express.json());


// ➤ Root check
app.get("/", (req, res) => {
  const dbType = "PostgreSQL (Supabase)";
  res.json({ message: "Backend Express + PostgreSQL OK 🟢", database: dbType });
});


// ========================================================
// 🔥 USERS LIST (PG)
// ========================================================
app.get("/users", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ PostgreSQL error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// ========================================================
// 🔥 CONTACT APPOINTMENT (PG)
// ========================================================
app.get("/api/appointment", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM contact`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ PostgreSQL error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// ========================================================
// 🔥 LOGIN (PGSQL VERSION)
// ========================================================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ❗ PostgreSQL = pas de ?
    const result = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // 🔥 JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Connexion validée 🔐",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      }
    });

  } catch (err) {
    console.error("❌ Login PG error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// ========================================================
// 🔥 CONTACT FORM (PGSQL VERSION)
// ========================================================
app.post("/api/contact", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    subject,
    message,
    preferreddate,
    preferredtime
  } = req.body;

  try {
    await db.query(
      `INSERT INTO contact (
        firstname, lastname, email, phone, subject, message, preferreddate, preferredtime
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [firstname, lastname, email, phone, subject, message, preferreddate, preferredtime]
    );

    res.json({ message: "📨 Message enregistré avec succès" });
  } catch (err) {
    console.error("❌ Insert error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// ========================================================
// 🔗 AUTO MOUNT ROUTES (déjà PostgreSQL-ready)
// ========================================================
app.use("/beneficiaires", beneficiaresRouter);
app.use("/carnet", carnetRouter);
app.use("/services", servicesRouter);
app.use("/reservations", reservationsRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/team", teamRouter);
app.use("/articles", articlesRouter);
app.use("/users", usersRouter);


// ========================================================
// 🚀 SERVER START
// ========================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server online → http://localhost:${PORT}`));
