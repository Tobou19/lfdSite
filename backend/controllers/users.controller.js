const db = require("../config/db.config.js");

// 🟢 Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const results = await db.queryAsync(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );

    res.json(results);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Obtenir un utilisateur par ID
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.queryAsync(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Créer un utilisateur
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email et password sont requis" });
  }

  try {
    let insertId;

    if (db.isPostgres) {
      // PostgreSQL : INSERT ... RETURNING id
      const result = await db.queryAsync(
        `INSERT INTO users (name, email, password, role) 
         VALUES (?, ?, ?, ?) RETURNING id`,
        [name, email, password, role || "user"]
      );
      insertId = result[0].id;
    } else {
      // MySQL : INSERT SET ?
      const data = {
        name,
        email,
        password,
        role: role || "user",
      };
      const result = await db.queryAsync("INSERT INTO users SET ?", data);
      insertId = result.insertId;
    }

    res.status(201).json({
      message: "✅ Utilisateur créé",
      id: insertId,
      name,
      email,
      role: role || "user",
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    
    // Gestion des erreurs de duplication d'email
    if (err.code === '23505' || err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }
    
    res.status(500).json({ error: "Erreur lors de la création", details: err.message });
  }
};

// 🟢 Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password, role } = req.body;

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
  if (password !== undefined) {
    updates.push("password = ?");
    values.push(password);
  }
  if (role !== undefined) {
    updates.push("role = ?");
    values.push(role);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  values.push(id);

  try {
    const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    const result = await db.queryAsync(sql, values);

    // Vérifier si une ligne a été modifiée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    res.json({
      message: "✅ Utilisateur mis à jour",
      id,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    
    // Gestion des erreurs de duplication d'email
    if (err.code === '23505' || err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }
    
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Supprimer un utilisateur
const removeUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.queryAsync("DELETE FROM users WHERE id = ?", [id]);

    // Vérifier si une ligne a été supprimée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    res.json({ message: "🗑️ Utilisateur supprimé" });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};