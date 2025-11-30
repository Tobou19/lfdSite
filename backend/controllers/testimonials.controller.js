const db = require("../config/db.config.js");

// 🟢 Obtenir tous les témoignages
const getAll = async (req, res) => {
  try {
    const results = await db.queryAsync("SELECT * FROM testimonials ORDER BY created_at DESC");
    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Obtenir un témoignage par ID
const getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.queryAsync("SELECT * FROM testimonials WHERE id = ?", [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Témoignage introuvable" });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Créer un témoignage
const create = async (req, res) => {
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

  try {
    let insertId;

    if (db.isPostgres) {
      // PostgreSQL : INSERT ... RETURNING id
      const result = await db.queryAsync(
        `INSERT INTO testimonials 
         (full_name, age, condition_name, testimonial_text, result_text, result_value, follow_up_duration, verified) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
        [
          full_name,
          age || null,
          condition_name || null,
          testimonial_text,
          result_text || null,
          result_value || null,
          follow_up_duration || null,
          verified ?? false,
        ]
      );
      insertId = result[0].id;
    } else {
      // MySQL : INSERT SET ?
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
      const result = await db.queryAsync("INSERT INTO testimonials SET ?", data);
      insertId = result.insertId;
    }

    res.status(201).json({
      message: "✅ Témoignage créé",
      id: insertId,
      full_name,
      age,
      condition_name,
      testimonial_text,
      result_text,
      result_value,
      follow_up_duration,
      verified: verified ?? false,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur lors de la création du témoignage" });
  }
};

// 🟢 Mettre à jour un témoignage
const update = async (req, res) => {
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

  const updates = [];
  const values = [];

  if (full_name !== undefined) {
    updates.push("full_name = ?");
    values.push(full_name);
  }
  if (age !== undefined) {
    updates.push("age = ?");
    values.push(age);
  }
  if (condition_name !== undefined) {
    updates.push("condition_name = ?");
    values.push(condition_name);
  }
  if (testimonial_text !== undefined) {
    updates.push("testimonial_text = ?");
    values.push(testimonial_text);
  }
  if (result_text !== undefined) {
    updates.push("result_text = ?");
    values.push(result_text);
  }
  if (result_value !== undefined) {
    updates.push("result_value = ?");
    values.push(result_value);
  }
  if (follow_up_duration !== undefined) {
    updates.push("follow_up_duration = ?");
    values.push(follow_up_duration);
  }
  if (verified !== undefined) {
    updates.push("verified = ?");
    values.push(verified);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  values.push(id);

  try {
    const sql = `UPDATE testimonials SET ${updates.join(", ")} WHERE id = ?`;
    const result = await db.queryAsync(sql, values);

    // Vérifier si une ligne a été modifiée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Témoignage introuvable" });
    }

    res.json({
      message: "✅ Témoignage mis à jour",
      id,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Supprimer un témoignage
const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.queryAsync("DELETE FROM testimonials WHERE id = ?", [id]);

    // Vérifier si une ligne a été supprimée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Témoignage introuvable" });
    }

    res.json({ message: "🗑️ Témoignage supprimé avec succès" });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};