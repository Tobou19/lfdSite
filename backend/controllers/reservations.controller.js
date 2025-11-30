const db = require("../config/db.config.js");

// 📌 Obtenir toutes les réservations
const getAllReservations = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM reservations`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Erreur PostgreSQL :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 📌 Obtenir une réservation par ID
const getReservationById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(`SELECT * FROM reservations WHERE id = $1`, [id]);
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Réservation introuvable" });

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Erreur PostgreSQL :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 📌 Créer une réservation
const createReservation = async (req, res) => {
  const { clientname, servicetitle, date, status, email, phone, type } = req.body;

  if (!clientname || !servicetitle || !date)
    return res.status(400).json({ error: "clientName, serviceTitle et date sont requis" });

  try {
    const result = await db.query(
      `INSERT INTO reservations (clientname, servicetitle, date, status, email, phone, type, createdat, updatedat)
       VALUES ($1,$2,$3,$4,$5,$6,$7, NOW(), NOW())
       RETURNING *`,
      [clientname, servicetitle, date, status ?? "pending", email, phone, type]
    );

    res.status(201).json({ message: "✅ Réservation créée", data: result.rows[0] });
  } catch (error) {
    console.error("❌ Erreur PostgreSQL :", error);
    res.status(500).json({ error: "Erreur lors de la création" });
  }
};

// 📌 Mettre à jour une réservation
const updateReservation = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const fields = Object.keys(updates)
    .filter(k => updates[k] !== undefined)
    .map((key, i) => `${key.toLowerCase()} = $${i + 1}`);

  const values = Object.values(updates).filter(v => v !== undefined);
  values.push(id); // paramètre $n final

  try {
    const result = await db.query(
      `UPDATE reservations SET ${fields.join(", ")}, updatedat = NOW() WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rowCount === 0)
      return res.status(404).json({ error: "Réservation introuvable" });

    res.json({ message: "♻️ Réservation mise à jour", data: result.rows[0] });
  } catch (error) {
    console.error("❌ Erreur PostgreSQL :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 📌 Supprimer une réservation
const deleteReservation = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(`DELETE FROM reservations WHERE id = $1`, [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ error: "Réservation introuvable" });

    res.json({ message: "🗑️ Réservation supprimée avec succès" });
  } catch (error) {
    console.error("❌ Erreur PostgreSQL :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
