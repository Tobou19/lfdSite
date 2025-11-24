const db = require("../config/db.config.js");

// 🟢 Obtenir tous les témoignages
const getAll = (req, res) => {
  db.query("SELECT * FROM testimonials", (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    res.status(200).json(results);
  });
};

// 🟢 Obtenir un témoignage par ID
const getOne = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM testimonials WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Témoignage introuvable" });
    }

    res.status(200).json(results[0]);
  });
};

// 🟢 Créer un témoignage
const create = (req, res) => {
  const {
    full_name,
    age,
    condition_name,
    testimonial_text,
    result_text,
    result_value,
    follow_up_duration,
    verified,
  } = req.body;

  if (!full_name || !testimonial_text) {
    return res.status(400).json({ error: "full_name et testimonial_text sont requis" });
  }

  const data = {
    full_name,
    age,
    condition_name,
    testimonial_text,
    result_text,
    result_value,
    follow_up_duration,
    verified: verified ?? false,
  };

  db.query("INSERT INTO testimonials SET ?", data, (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur lors de la création du témoignage" });
    }

    res.status(201).json({
      message: "✅ Témoignage créé",
      id: results.insertId,
      ...data,
    });
  });
};

// 🟢 Mettre à jour un témoignage
const update = (req, res) => {
  const id = req.params.id;
  const {
    full_name,
    age,
    condition_name,
    testimonial_text,
    result_text,
    result_value,
    follow_up_duration,
    verified,
  } = req.body;

  const updateData = {
    full_name,
    age,
    condition_name,
    testimonial_text,
    result_text,
    result_value,
    follow_up_duration,
    verified,
  };

  // Nettoyer les undefined
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  db.query("UPDATE testimonials SET ? WHERE id = ?", [updateData, id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Témoignage introuvable" });
    }

    res.json({
      message: "✅ Témoignage mis à jour",
      id,
      ...updateData,
    });
  });
};

// 🟢 Supprimer un témoignage
const remove = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM testimonials WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Témoignage introuvable" });
    }

    res.json({ message: "🗑️ Témoignage supprimé avec succès" });
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
