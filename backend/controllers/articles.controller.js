const db = require("../config/db.config.js");

// 🔧 Helper pour parser JSON de manière sécurisée (version améliorée)
const parseJsonField = (field, fieldName, itemId) => {
  if (!field) return [];
  
  try {
    // Si c'est déjà un objet/array (JSONB PostgreSQL)
    if (typeof field === 'object') {
      return Array.isArray(field) ? field : [];
    }
    
    // Si c'est une string, essayer de parser
    if (typeof field === 'string') {
      const cleaned = field.trim();
      
      // Si la string est vide ou juste "[]"
      if (!cleaned || cleaned === '[]' || cleaned === '""' || cleaned === "''") {
        return [];
      }
      
      // Si ça commence par [ ou {, c'est probablement du JSON
      if (cleaned.startsWith('[') || cleaned.startsWith('{')) {
        try {
          const parsed = JSON.parse(cleaned);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.warn(`⚠️ JSON invalide pour ${fieldName} (ID: ${itemId}):`, cleaned);
          return [];
        }
      }
      
      // ✅ NOUVEAU : Si c'est une simple string (ex: "Sante+")
      // On la met dans un array au lieu de planter
      console.warn(`⚠️ String simple trouvée pour ${fieldName} (ID: ${itemId}): "${cleaned}" - Conversion en array`);
      return [cleaned];
    }
    
    return [];
  } catch (e) {
    console.warn(`⚠️ Erreur parsing ${fieldName} pour item ${itemId}:`, field, e.message);
    return [];
  }
};

// 🟢 Obtenir tous les articles
const getAllArticles = async (req, res) => {
  try {
    const results = await db.queryAsync(
      "SELECT * FROM articles ORDER BY published_date DESC"
    );

    // Parser les tags JSON de manière sécurisée
    const articles = results.map((article) => ({
      id: article.id,
      title: article.title || '',
      subtitle: article.subtitle || '',
      content: article.content || '',
      author: article.author || '',
      published_date: article.published_date,
      read_time: article.read_time || 0,
      tags: parseJsonField(article.tags, 'tags', article.id),
      image: article.image || '',
      created_at: article.created_at,
    }));

    res.json(articles);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Obtenir un article par ID
const getArticleById = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.queryAsync(
      "SELECT * FROM articles WHERE id = ?",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Article introuvable" });
    }

    const article = results[0];

    res.json({
      id: article.id,
      title: article.title || '',
      subtitle: article.subtitle || '',
      content: article.content || '',
      author: article.author || '',
      published_date: article.published_date,
      read_time: article.read_time || 0,
      tags: parseJsonField(article.tags, 'tags', article.id),
      image: article.image || '',
      created_at: article.created_at,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Créer un article
const createArticle = async (req, res) => {
  const {
    title,
    subtitle,
    content,
    author,
    published_date,
    read_time,
    tags,
    image,
  } = req.body;

  if (!title || !author || !published_date) {
    return res
      .status(400)
      .json({ error: "title, author et published_date sont requis" });
  }

  try {
    let insertId;

    if (db.isPostgres) {
      // PostgreSQL : INSERT ... RETURNING id
      const result = await db.queryAsync(
        `INSERT INTO articles (title, subtitle, content, author, published_date, read_time, tags, image) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
        [
          title,
          subtitle || null,
          content || null,
          author,
          published_date,
          read_time || null,
          JSON.stringify(Array.isArray(tags) ? tags : []),
          image || null,
        ]
      );
      insertId = result[0].id;
    } else {
      // MySQL : INSERT SET ?
      const result = await db.queryAsync("INSERT INTO articles SET ?", {
        title,
        subtitle: subtitle || null,
        content: content || null,
        author,
        published_date,
        read_time: read_time || null,
        tags: JSON.stringify(Array.isArray(tags) ? tags : []),
        image: image || null,
      });
      insertId = result.insertId;
    }

    res.status(201).json({
      message: "✅ Article créé",
      id: insertId,
      title,
      author,
      published_date,
      tags: Array.isArray(tags) ? tags : [],
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur lors de la création", details: err.message });
  }
};

// 🟢 Mettre à jour un article
const updateArticle = async (req, res) => {
  const id = req.params.id;
  const {
    title,
    subtitle,
    content,
    author,
    published_date,
    read_time,
    tags,
    image,
  } = req.body;

  const updates = [];
  const values = [];

  if (title !== undefined) {
    updates.push("title = ?");
    values.push(title);
  }
  if (subtitle !== undefined) {
    updates.push("subtitle = ?");
    values.push(subtitle);
  }
  if (content !== undefined) {
    updates.push("content = ?");
    values.push(content);
  }
  if (author !== undefined) {
    updates.push("author = ?");
    values.push(author);
  }
  if (published_date !== undefined) {
    updates.push("published_date = ?");
    values.push(published_date);
  }
  if (read_time !== undefined) {
    updates.push("read_time = ?");
    values.push(read_time);
  }
  if (tags !== undefined) {
    updates.push("tags = ?");
    values.push(JSON.stringify(Array.isArray(tags) ? tags : []));
  }
  if (image !== undefined) {
    updates.push("image = ?");
    values.push(image);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  values.push(id);

  try {
    const sql = `UPDATE articles SET ${updates.join(", ")} WHERE id = ?`;
    const result = await db.queryAsync(sql, values);

    // Vérifier si une ligne a été modifiée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Article introuvable" });
    }

    res.json({
      message: "✅ Article mis à jour",
      id,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Supprimer un article
const removeArticle = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.queryAsync("DELETE FROM articles WHERE id = ?", [
      id,
    ]);

    // Vérifier si une ligne a été supprimée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Article introuvable" });
    }

    res.json({ message: "🗑️ Article supprimé" });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  removeArticle,
};