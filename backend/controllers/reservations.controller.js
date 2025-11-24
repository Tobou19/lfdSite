const db = require("../config/db.config.js");

// 🟢 Obtenir toutes les réservations
const getAllReservations = (req, res) => {
  db.query("SELECT * FROM reservations", (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(200).json(results);
  });
};

// 🟢 Obtenir une réservation par ID
const getReservationById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM reservations WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (results.length === 0)
      return res.status(404).json({ error: "Réservation introuvable" });
    res.status(200).json(results[0]);
  });
};

// 🟢 Créer une réservation
const createReservation = (req, res) => {
  const { clientName, serviceTitle, date, status, email, phone, type } = req.body;

  if (!clientName || !serviceTitle || !date) {
    return res
      .status(400)
      .json({ error: "clientName, serviceTitle et date sont requis" });
  }

  const data = {
    clientName,
    serviceTitle,
    date,
    status: status ?? "pending",
    email,
    phone,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.query("INSERT INTO reservations SET ?", data, (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur lors de la création" });
    }
    res.status(201).json({ message: "✅ Réservation créée", id: results.insertId, ...data });
  });
};

// 🟢 Mettre à jour une réservation
const updateReservation = (req, res) => {
  const id = req.params.id;
  const { clientName, serviceTitle, date, status, email, phone, type } = req.body;

  const updateData = {
    clientName,
    serviceTitle,
    date,
    status,
    email,
    phone,
    type,
    updatedAt: new Date(),
  };

  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

  db.query("UPDATE reservations SET ? WHERE id = ?", [updateData, id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Réservation introuvable" });
    res.json({ message: "✅ Réservation mise à jour", id, ...updateData });
  });
};

// 🟢 Supprimer une réservation
const deleteReservation = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM reservations WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Réservation introuvable" });
    res.json({ message: "🗑️ Réservation supprimée avec succès" });
  });
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
