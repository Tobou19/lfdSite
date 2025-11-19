const db = require("../config/db.config.js");

// 🟢 Obtenir le carnet d'un bénéficiaire
const getCarnetByBeneficiaireId = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM carnet WHERE beneficiaireId = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur MySQL :", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Carnet introuvable" });
      }

      const carnet = results[0];

      // Récupérer les détails liés : diagnostics, traitements, therapies, appointments, docs
      const queries = {
        diagnostics: "SELECT * FROM diagnostic WHERE carnetId = ?",
        traitements: "SELECT * FROM traitement WHERE carnetId = ?",
        therapies: "SELECT * FROM therapy WHERE carnetId = ?",
        appointments: "SELECT * FROM appointment WHERE carnetId = ?",
        docs: "SELECT * FROM doc WHERE carnetId = ?",
      };

      const resultsObj = {};

      let completed = 0;
      const total = Object.keys(queries).length;

      Object.entries(queries).forEach(([key, sql]) => {
        db.query(sql, [carnet.id], (err2, rows) => {
          if (err2) {
            console.error("❌ Erreur MySQL :", err2);
            return res.status(500).json({ error: `Erreur serveur (${key})` });
          }
          resultsObj[key] = rows;
          completed++;
          if (completed === total) {
            res.status(200).json({ ...carnet, ...resultsObj });
          }
        });
      });
    }
  );
};

// 🟢 Créer un carnet pour un bénéficiaire
const createCarnet = (req, res) => {
  const { beneficiaireId } = req.body;

  if (!beneficiaireId) {
    return res.status(400).json({ error: "beneficiaireId requis" });
  }

  db.query(
    "INSERT INTO carnet (beneficiaireId) VALUES (?)",
    [beneficiaireId],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur MySQL :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la création du carnet" });
      }
      res.status(201).json({ message: "✅ Carnet créé", id: results.insertId });
    }
  );
};

const updateCarnetAppointments = (req, res) => {
  const carnetId = req.params.id;
  const { diagnostics, traitements, therapies, appointments, docs } = req.body;

  if (!carnetId) return res.status(400).json({ error: "carnetId requis" });

  if (!appointments || appointments.length === 0) {
    return res.json({ message: "Aucun rendez-vous à mettre à jour" });
  }

  // Ici on supprime les anciens rendez-vous liés au carnet
  db.query("DELETE FROM appointment WHERE carnetId = ?", [carnetId], (err) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression des rendez-vous" });
    }

    // Préparer les nouvelles valeurs
    const values = appointments.map((a) => [carnetId, a.date, a.time, a.notes]);

    db.query(
      "INSERT INTO appointment (carnetId, date, time, notes) VALUES ?",
      [values],
      (err2) => {
        if (err2) {
          console.error("❌ Erreur MySQL :", err2);
          return res
            .status(500)
            .json({ error: "Erreur lors de l'enregistrement des rendez-vous" });
        }
        res.json({ message: "✅ Rendez-vous mis à jour avec succès" });
      }
    );
  });
};

module.exports = {
  getCarnetByBeneficiaireId,
  createCarnet,
  updateCarnetAppointments,
};
