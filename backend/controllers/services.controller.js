const db = require("../config/db.config.js");

// 🟢 Obtenir tous les services
const getAll = async (req, res) => {
  try {
    const results = await db.queryAsync("SELECT * FROM services");

    // Convertir le JSON "includes" de manière sécurisée
    const services = results.map((s) => {
      let includes = [];
      
      if (s.includes) {
        try {
          // Si c'est déjà un objet (JSONB PostgreSQL), le retourner tel quel
          if (typeof s.includes === 'object') {
            includes = Array.isArray(s.includes) ? s.includes : [];
          } else {
            // Sinon, parser la chaîne JSON
            includes = JSON.parse(s.includes);
          }
        } catch (e) {
          console.warn(`⚠️ Erreur parsing JSON pour service ${s.id}:`, s.includes);
          includes = [];
        }
      }

      return {
        ...s,
        includes,
      };
    });

    res.status(200).json(services);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Obtenir un service par ID
const getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.queryAsync("SELECT * FROM services WHERE id = ?", [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Service introuvable" });
    }

    const service = results[0];
    
    // Parser includes de manière sécurisée
    let includes = [];
    if (service.includes) {
      try {
        if (typeof service.includes === 'object') {
          includes = Array.isArray(service.includes) ? service.includes : [];
        } else {
          includes = JSON.parse(service.includes);
        }
      } catch (e) {
        console.warn(`⚠️ Erreur parsing JSON pour service ${service.id}`);
        includes = [];
      }
    }
    
    service.includes = includes;

    res.status(200).json(service);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Créer un service
const create = async (req, res) => {
  const { price, duration, title, desc, includes, active } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: "title et price sont requis" });
  }

  try {
    let insertId;

    if (db.isPostgres) {
      // PostgreSQL : INSERT ... RETURNING id
      const result = await db.queryAsync(
        `INSERT INTO services (price, duration, title, description, includes, active) 
         VALUES (?, ?, ?, ?, ?, ?) RETURNING id`,
        [
          price,
          duration || null,
          title,
          desc || "",
          JSON.stringify(includes || []),
          active ?? 1,
        ]
      );
      insertId = result[0].id;
    } else {
      // MySQL : INSERT SET ?
      const data = {
        price,
        duration,
        title,
        description: desc || "",
        includes: JSON.stringify(includes || []),
        active: active ?? 1,
      };
      const result = await db.queryAsync("INSERT INTO services SET ?", data);
      insertId = result.insertId;
    }

    res.status(201).json({
      message: "✅ Service créé",
      id: insertId,
      price,
      duration,
      title,
      description: desc || "",
      includes: includes || [],
      active: active ?? 1,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur lors de la création" });
  }
};

// 🟢 Mettre à jour un service
const update = async (req, res) => {
  const id = req.params.id;
  const { price, duration, title, desc, includes, active } = req.body;

  const updates = [];
  const values = [];

  if (price !== undefined) {
    updates.push("price = ?");
    values.push(price);
  }
  if (duration !== undefined) {
    updates.push("duration = ?");
    values.push(duration);
  }
  if (title !== undefined) {
    updates.push("title = ?");
    values.push(title);
  }
  if (desc !== undefined) {
    updates.push("description = ?");
    values.push(desc);
  }
  if (includes !== undefined) {
    updates.push("includes = ?");
    values.push(JSON.stringify(includes));
  }
  if (active !== undefined) {
    updates.push("active = ?");
    values.push(active);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  values.push(id);

  try {
    const sql = `UPDATE services SET ${updates.join(", ")} WHERE id = ?`;
    const result = await db.queryAsync(sql, values);

    // Vérifier si une ligne a été modifiée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Service introuvable" });
    }

    res.json({
      message: "✅ Service mis à jour",
      id,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Supprimer un service
const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.queryAsync("DELETE FROM services WHERE id = ?", [id]);

    // Vérifier si une ligne a été supprimée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Service introuvable" });
    }

    res.json({ message: "🗑️ Service supprimé avec succès" });
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