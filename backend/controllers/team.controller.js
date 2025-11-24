const db = require("../config/db.config.js");

// 🟢 Obtenir tous les membres
const getAllMembers = (req, res) => {
  db.query("SELECT * FROM team_members", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });

    const members = results.map(member => ({
      ...member,
      domains: member.domains ? JSON.parse(member.domains) : [],
      certifications: member.certifications ? JSON.parse(member.certifications) : []
    }));

    res.json(members);
  });
};

// 🟢 Créer un membre
const createMember = (req, res) => {
  const {
    shortName,
    availability,
    fullName,
    profession,
    speciality,
    experience,
    description,
    domains,
    certifications
  } = req.body;

  if (!fullName || !profession) {
    return res.status(400).json({ error: "fullName et profession sont requis" });
  }

  const data = {
    shortName,
    availability,
    fullName,
    profession,
    speciality,
    experience,
    description,
    domains: JSON.stringify(domains || []),
    certifications: JSON.stringify(certifications || [])
  };

  db.query("INSERT INTO team_members SET ?", data, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création" });
    res.status(201).json({ message: "✅ Membre créé", id: results.insertId });
  });
};

// 🟢 Mettre à jour un membre
const updateMember = (req, res) => {
  const id = req.params.id;

  const {
    shortName,
    availability,
    fullName,
    profession,
    speciality,
    experience,
    description,
    domains,
    certifications
  } = req.body;

  const updateData = {
    shortName,
    availability,
    fullName,
    profession,
    speciality,
    experience,
    description,
    domains: domains ? JSON.stringify(domains) : undefined,
    certifications: certifications ? JSON.stringify(certifications) : undefined
  };

  Object.keys(updateData).forEach(
    key => updateData[key] === undefined && delete updateData[key]
  );

  db.query(
    "UPDATE team_members SET ? WHERE id = ?",
    [updateData, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      if (results.affectedRows === 0)
        return res.status(404).json({ error: "Membre introuvable" });

      res.json({ message: "✅ Membre mis à jour", id });
    }
  );
};

// 🟢 Supprimer un membre
const removeMember = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM team_members WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Membre introuvable" });

    res.json({ message: "🗑️ Membre supprimé" });
  });
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  removeMember
};
