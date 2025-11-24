const db = require("../config/db.config.js");

// 🟢 Obtenir tous les services
const getAll = (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    // Convertir le JSON "includes"
    const services = results.map((s) => ({
      ...s,
      includes: s.includes ? JSON.parse(s.includes) : [],
    }));

    res.status(200).json(services);
  });
};

// 🟢 Obtenir un service par ID
const getOne = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM services WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Service introuvable" });
    }

    const service = results[0];
    service.includes = service.includes ? JSON.parse(service.includes) : [];

    res.status(200).json(service);
  });
};

// 🟢 Créer un service
const create = (req, res) => {
  const { price, duration, title, desc, includes, active } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: "title et price sont requis" });
  }

  const data = {
    price,
    duration,
    title,
    description: desc || "",
    includes: JSON.stringify(includes || []),
    active: active ?? 1,
  };

  db.query("INSERT INTO services SET ?", data, (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur lors de la création" });
    }

    res.status(201).json({
      message: "✅ Service créé",
      id: results.insertId,
      ...data,
      includes: includes || [],
    });
  });
};

// 🟢 Mettre à jour un service
const update = (req, res) => {
  const id = req.params.id;
  const { price, duration, title, desc, includes, active } = req.body;

  const updateData = {
    price,
    duration,
    title,
    description: desc,
    active,
  };

  if (includes) updateData.includes = JSON.stringify(includes);

  // Nettoyer les undefined
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  db.query(
    "UPDATE services SET ? WHERE id = ?",
    [updateData, id],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur MySQL :", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Service introuvable" });
      }

      res.json({
        message: "✅ Service mis à jour",
        id,
        ...updateData,
        includes: includes || undefined,
      });
    }
  );
};

// 🟢 Supprimer un service
const remove = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM services WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Service introuvable" });
    }

    res.json({ message: "🗑️ Service supprimé avec succès" });
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
