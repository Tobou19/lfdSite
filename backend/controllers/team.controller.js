const db = require("../config/db.config.js");

// 🔧 Helper pour parser JSON de manière sécurisée
const parseJsonField = (field, fieldName, memberId) => {
  if (!field) return [];
  
  try {
    // Si c'est déjà un objet/array (JSONB PostgreSQL)
    if (typeof field === 'object') {
      return Array.isArray(field) ? field : [];
    }
    
    // Si c'est une string, essayer de parser
    if (typeof field === 'string') {
      // Nettoyer la string au cas où
      const cleaned = field.trim();
      
      // Si la string est vide ou juste "[]"
      if (!cleaned || cleaned === '[]' || cleaned === '""') {
        return [];
      }
      
      const parsed = JSON.parse(cleaned);
      return Array.isArray(parsed) ? parsed : [];
    }
    
    return [];
  } catch (e) {
    console.warn(`⚠️ Erreur parsing ${fieldName} pour membre ${memberId}:`, field);
    return [];
  }
};

// 🟢 Obtenir tous les membres
const getAllMembers = async (req, res) => {
  try {
    const results = await db.queryAsync("SELECT * FROM team_members ORDER BY id");

    const members = results.map((member) => ({
      id: member.id,
      shortName: member.shortname || member.shortName || '',
      availability: member.availability ?? true,
      fullName: member.fullname || member.fullName || '',
      profession: member.profession || '',
      speciality: member.speciality || '',
      experience: member.experience || 0,
      description: member.description || '',
      domains: parseJsonField(member.domains, 'domains', member.id),
      certifications: parseJsonField(member.certifications, 'certifications', member.id),
      created_at: member.created_at,
    }));

    res.json(members);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Obtenir un membre par ID
const getMemberById = async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.queryAsync("SELECT * FROM team_members WHERE id = ?", [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }

    const member = results[0];

    res.json({
      id: member.id,
      shortName: member.shortname || member.shortName || '',
      availability: member.availability ?? true,
      fullName: member.fullname || member.fullName || '',
      profession: member.profession || '',
      speciality: member.speciality || '',
      experience: member.experience || 0,
      description: member.description || '',
      domains: parseJsonField(member.domains, 'domains', member.id),
      certifications: parseJsonField(member.certifications, 'certifications', member.id),
      created_at: member.created_at,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Créer un membre
const createMember = async (req, res) => {
  const {
    shortName,
    availability,
    fullName,
    profession,
    speciality,
    experience,
    description,
    domains,
    certifications,
  } = req.body;

  if (!fullName || !profession) {
    return res.status(400).json({ error: "fullName et profession sont requis" });
  }

  try {
    let insertId;

    if (db.isPostgres) {
      // PostgreSQL : INSERT ... RETURNING id
      const result = await db.queryAsync(
        `INSERT INTO team_members 
         (shortName, availability, fullName, profession, speciality, experience, description, domains, certifications) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
        [
          shortName || null,
          availability ?? true,
          fullName,
          profession,
          speciality || null,
          experience || null,
          description || null,
          JSON.stringify(Array.isArray(domains) ? domains : []),
          JSON.stringify(Array.isArray(certifications) ? certifications : []),
        ]
      );
      insertId = result[0].id;
    } else {
      // MySQL : INSERT SET ?
      const data = {
        shortName: shortName || null,
        availability: availability ?? true,
        fullName,
        profession,
        speciality: speciality || null,
        experience: experience || null,
        description: description || null,
        domains: JSON.stringify(Array.isArray(domains) ? domains : []),
        certifications: JSON.stringify(Array.isArray(certifications) ? certifications : []),
      };
      const result = await db.queryAsync("INSERT INTO team_members SET ?", data);
      insertId = result.insertId;
    }

    res.status(201).json({
      message: "✅ Membre créé",
      id: insertId,
      fullName,
      profession,
      domains: Array.isArray(domains) ? domains : [],
      certifications: Array.isArray(certifications) ? certifications : [],
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur lors de la création", details: err.message });
  }
};

// 🟢 Mettre à jour un membre
const updateMember = async (req, res) => {
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
    certifications,
  } = req.body;

  const updates = [];
  const values = [];

  if (shortName !== undefined) {
    updates.push("shortName = ?");
    values.push(shortName);
  }
  if (availability !== undefined) {
    updates.push("availability = ?");
    values.push(availability);
  }
  if (fullName !== undefined) {
    updates.push("fullName = ?");
    values.push(fullName);
  }
  if (profession !== undefined) {
    updates.push("profession = ?");
    values.push(profession);
  }
  if (speciality !== undefined) {
    updates.push("speciality = ?");
    values.push(speciality);
  }
  if (experience !== undefined) {
    updates.push("experience = ?");
    values.push(experience);
  }
  if (description !== undefined) {
    updates.push("description = ?");
    values.push(description);
  }
  if (domains !== undefined) {
    updates.push("domains = ?");
    values.push(JSON.stringify(Array.isArray(domains) ? domains : []));
  }
  if (certifications !== undefined) {
    updates.push("certifications = ?");
    values.push(JSON.stringify(Array.isArray(certifications) ? certifications : []));
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  values.push(id);

  try {
    const sql = `UPDATE team_members SET ${updates.join(", ")} WHERE id = ?`;
    const result = await db.queryAsync(sql, values);

    // Vérifier si une ligne a été modifiée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }

    res.json({
      message: "✅ Membre mis à jour",
      id,
    });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// 🟢 Supprimer un membre
const removeMember = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.queryAsync("DELETE FROM team_members WHERE id = ?", [id]);

    // Vérifier si une ligne a été supprimée
    const affectedRows = db.isPostgres ? result.length : result.affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }

    res.json({ message: "🗑️ Membre supprimé" });
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  removeMember,
};