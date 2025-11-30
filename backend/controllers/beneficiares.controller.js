const db = require("../config/db.config.js");

// 🟢 Obtenir tous les bénéficiaires
const getBeneficiares = async (req, res) => {
  try {
    const results = await db.queryAsync(
      "SELECT * FROM beneficiaires ORDER BY created_at DESC"
    );

    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Obtenir un bénéficiaire par ID
const getBeneficiaresById = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.queryAsync(
      "SELECT * FROM beneficiaires WHERE id = ?",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Bénéficiaire introuvable" });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Créer un bénéficiaire et son carnet automatiquement
const createBeneficiares = async (req, res) => {
  const { name, email, phone, birthdate, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Le nom et l'email sont requis" });
  }

  try {
    let beneficiaireId;

    // 1️⃣ Ajouter le bénéficiaire
    if (db.isPostgres) {
      // PostgreSQL : INSERT ... RETURNING id
      const result = await db.queryAsync(
        `INSERT INTO beneficiaires (name, email, phone, birthdate, notes) 
         VALUES (?, ?, ?, ?, ?) RETURNING id`,
        [name, email, phone || null, birthdate || null, notes || null]
      );
      beneficiaireId = result[0].id;
    } else {
      // MySQL
      const result = await db.queryAsync(
        "INSERT INTO beneficiaires (name, email, phone, birthdate, notes) VALUES (?, ?, ?, ?, ?)",
        [name, email, phone || null, birthdate || null, notes || null]
      );
      beneficiaireId = result.insertId;
    }

    // 2️⃣ Créer un carnet vide pour ce bénéficiaire
    let carnetId;

    if (db.isPostgres) {
      const carnetResult = await db.queryAsync(
        "INSERT INTO carnet (beneficiaireId) VALUES (?) RETURNING id",
        [beneficiaireId]
      );
      carnetId = carnetResult[0].id;
    } else {
      const carnetResult = await db.queryAsync(
        "INSERT INTO carnet (beneficiaireId) VALUES (?)",
        [beneficiaireId]
      );
      carnetId = carnetResult.insertId;
    }

    res.status(201).json({
      message: "✅ Bénéficiaire et carnet créés avec succès",
      id: beneficiaireId,
      carnetId: carnetId,
      name,
      email,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    
    // Gestion des erreurs de duplication d'email
    if (err.code === '23505' || err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }
    
    res.status(500).json({ 
      error: "Erreur lors de l'ajout du bénéficiaire", 
      details: err.message 
    });
  }
};

// 🟢 Mettre à jour un bénéficiaire
const updateBeneficiares = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, birthdate, notes, idCarnet } = req.body;

  const updates = [];
  const values = [];

  if (name !== undefined) {
    updates.push("name = ?");
    values.push(name);
  }
  if (email !== undefined) {
    updates.push("email = ?");
    values.push(email);
  }
  if (phone !== undefined) {
    updates.push("phone = ?");
    values.push(phone);
  }
  if (birthdate !== undefined) {
    updates.push("birthdate = ?");
    values.push(birthdate);
  }
  if (notes !== undefined) {
    updates.push("notes = ?");
    values.push(notes);
  }
  if (idCarnet !== undefined) {
    updates.push("idCarnet = ?");
    values.push(idCarnet);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  values.push(id);

  try {
    const sql = `UPDATE beneficiaires SET ${updates.join(", ")} WHERE id = ?`;
    const result = await db.queryAsync(sql, values);

    // Vérifier si une ligne a été modifiée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Bénéficiaire introuvable" });
    }

    res.json({
      message: "✅ Bénéficiaire mis à jour avec succès",
      id,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    
    // Gestion des erreurs de duplication d'email
    if (err.code === '23505' || err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }
    
    res.status(500).json({ 
      error: "Erreur lors de la mise à jour", 
      details: err.message 
    });
  }
};

// 🟢 Supprimer un bénéficiaire
const removeBeneficiares = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.queryAsync(
      "DELETE FROM beneficiaires WHERE id = ?",
      [id]
    );

    // Vérifier si une ligne a été supprimée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Bénéficiaire introuvable" });
    }

    res.json({ message: "✅ Bénéficiaire supprimé avec succès" });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ 
      error: "Erreur lors de la suppression", 
      details: err.message 
    });
  }
};

// 🟢 Ajouter un rendez-vous
const addAppointment = async (req, res) => {
  const idBeneficiaire = req.params.idBeneficiaire;
  const { date, time, notes } = req.body;

  if (!date || !time || !notes) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  if (!idBeneficiaire) {
    return res.status(400).json({ error: "Veuillez sélectionner un bénéficiaire" });
  }

  try {
    let appointmentId;

    if (db.isPostgres) {
      // PostgreSQL : INSERT ... RETURNING id
      const result = await db.queryAsync(
        `INSERT INTO appointment (date, time, notes, idBeneficiaire) 
         VALUES (?, ?, ?, ?) RETURNING id`,
        [date, time, notes, idBeneficiaire]
      );
      appointmentId = result[0].id;
    } else {
      // MySQL
      const result = await db.queryAsync(
        "INSERT INTO appointment (date, time, notes, idBeneficiaire) VALUES (?, ?, ?, ?)",
        [date, time, notes, idBeneficiaire]
      );
      appointmentId = result.insertId;
    }

    res.status(201).json({
      message: "✅ Rendez-vous ajouté avec succès",
      id: appointmentId,
      date,
      time,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ 
      error: "Erreur lors de l'enregistrement du rendez-vous", 
      details: err.message 
    });
  }
};

module.exports = {
  getBeneficiares,
  getBeneficiaresById,
  createBeneficiares,
  updateBeneficiares,
  removeBeneficiares,
  addAppointment,
};