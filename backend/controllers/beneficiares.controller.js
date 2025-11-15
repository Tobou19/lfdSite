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

// 🟢 Créer un bénéficiaire
const createBeneficiares = (req, res) => {
  const { name, email, phone, birthdate, notes, idCarnet } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Le nom et l'email sont requis" });
  }

  db.query(
    "INSERT INTO beneficiaires (name, email, phone, birthdate, notes, idCarnet) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, phone, birthdate, notes, idCarnet],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur MySQL :", err);
        return res.status(500).json({ error: "Erreur lors de l'ajout" });
      }
      res.status(201).json({ message: "✅ Bénéficiaire ajouté avec succès", id: results.insertId });
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
