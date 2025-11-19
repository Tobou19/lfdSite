const db = require("../config/db.config.js");

// 🟢 Obtenir tous les bénéficiaires
const getBeneficiares = (req, res) => {
  db.query("SELECT * FROM beneficiaires", (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(200).json(results);
  });
};

// 🟢 Obtenir un bénéficiaire par ID
const getBeneficiaresById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM beneficiaires WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Bénéficiaire introuvable" });
    }

    res.status(200).json(results[0]);
  });
};

// 🟢 Créer un bénéficiaire et son carnet automatiquement
const createBeneficiares = (req, res) => {
  const { name, email, phone, birthdate, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Le nom et l'email sont requis" });
  }

  // 1️⃣ Ajouter le bénéficiaire
  db.query(
    "INSERT INTO beneficiaires (name, email, phone, birthdate, notes) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, birthdate, notes],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur MySQL :", err);
        return res.status(500).json({ error: "Erreur lors de l'ajout du bénéficiaire" });
      }

      const beneficiaireId = results.insertId;

      // 2️⃣ Créer un carnet vide pour ce bénéficiaire
      db.query(
        "INSERT INTO carnet (beneficiaireId) VALUES (?)",
        [beneficiaireId],
        (err2, results2) => {
          if (err2) {
            console.error("❌ Erreur MySQL :", err2);
            return res.status(500).json({ error: "Bénéficiaire créé mais erreur création carnet" });
          }

          res.status(201).json({
            message: "✅ Bénéficiaire et carnet créés avec succès",
            id: beneficiaireId,
            carnetId: results2.insertId,
          });
        }
      );
    }
  );
};


// 🟢 Mettre à jour un bénéficiaire
const updateBeneficiares = (req, res) => {
  const id = req.params.id;
  const { name, email, phone, birthdate, notes, idCarnet } = req.body;

  db.query(
    "UPDATE beneficiaires SET name=?, email=?, phone=?, birthdate=?, notes=?, idCarnet=? WHERE id=?",
    [name, email, phone, birthdate, notes, idCarnet, id],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur MySQL :", err);
        return res.status(500).json({ error: "Erreur lors de la mise à jour" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Bénéficiaire introuvable" });
      }

      res.json({ message: "✅ Bénéficiaire mis à jour avec succès" });
    }
  );
};

// 🟢 Supprimer un bénéficiaire
const removeBeneficiares = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM beneficiaires WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur lors de la suppression" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Bénéficiaire introuvable" });
    }

    res.json({ message: "✅ Bénéficiaire supprimé avec succès" });
  });
};


const addAppointment = (req, res) => {
  const idBeneficiaire = req.params.idBeneficiaire;
  const {date, time,notes} = req.body;

  if (!date || !time || !notes){
    return res.status(400).json({error: "Tous les champs sont requis"});
  }
  if(!idBeneficiaire){
    return res.status(400).json({error: "Veuillez selectionner un beneficiare"});
  }
  db.query("INSERT INTO appointment (date,time,notes,idBeneficiaire) VALUES (?,?,?,?)", [date,time,notes,idBeneficiaire], (err, results)=>{
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({error: "Erreur lors de l'enregistrement du rendez-vous"})
    }
    res.status(201).json({ message: "✅ Rendez-vous ajouté avec succès"});
  })
};
module.exports = {
  getBeneficiares,
  getBeneficiaresById,
  createBeneficiares,
  updateBeneficiares,
  removeBeneficiares,
  addAppointment,
};
