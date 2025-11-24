const db = require("../config/db.config.js");

// 🟢 Obtenir tous les utilisateurs
const getAllUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, role, created_at FROM users",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      res.json(results);
    }
  );
};

// 🟢 Obtenir un utilisateur par ID
const getUserById = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      if (results.length === 0)
        return res.status(404).json({ error: "Utilisateur introuvable" });
      res.json(results[0]);
    }
  );
};

// 🟢 Créer un utilisateur
const createUser = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email et password sont requis" });
  }

  const data = { name, email, password, role: role || "user" };

  db.query("INSERT INTO users SET ?", data, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création" });
    res.status(201).json({ message: "✅ Utilisateur créé", id: results.insertId });
  });
};

// 🟢 Mettre à jour un utilisateur
const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, password, role } = req.body;

  const updateData = { name, email, password, role };
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  db.query("UPDATE users SET ? WHERE id = ?", [updateData, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Utilisateur introuvable" });
    res.json({ message: "✅ Utilisateur mis à jour", id });
  });
};

// 🟢 Supprimer un utilisateur
const removeUser = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Utilisateur introuvable" });
    res.json({ message: "🗑️ Utilisateur supprimé" });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
