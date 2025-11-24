const db = require("../config/db.config.js");

// 🟢 Obtenir tous les articles
const getAllArticles = (req, res) => {
  db.query("SELECT * FROM articles ORDER BY published_date DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// 🟢 Obtenir un article par ID
const getArticleById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM articles WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Article introuvable" });
    res.json(results[0]);
  });
};

// 🟢 Créer un article
const createArticle = (req, res) => {
  const { title, subtitle, content, author, published_date, read_time, tags, image } = req.body;

  if (!title || !author || !published_date) {
    return res.status(400).json({ error: "title, author et published_date sont requis" });
  }

  const data = {
    title,
    subtitle,
    content,
    author,
    published_date,
    read_time,
    tags: tags ? JSON.stringify(tags) : JSON.stringify([]),
    image
  };

  db.query("INSERT INTO articles SET ?", data, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création" });
    res.status(201).json({ message: "✅ Article créé", id: results.insertId });
  });
};

// 🟢 Mettre à jour un article
const updateArticle = (req, res) => {
  const id = req.params.id;
  const { title, subtitle, content, author, published_date, read_time, tags, image } = req.body;

  const updateData = {
    title,
    subtitle,
    content,
    author,
    published_date,
    read_time,
    tags: tags ? JSON.stringify(tags) : undefined,
    image
  };

  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

  db.query("UPDATE articles SET ? WHERE id = ?", [updateData, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Article introuvable" });
    res.json({ message: "✅ Article mis à jour", id });
  });
};

// 🟢 Supprimer un article
const removeArticle = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM articles WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Article introuvable" });
    res.json({ message: "🗑️ Article supprimé" });
  });
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  removeArticle
};
