import { useState, useEffect } from "react";
import { User2Icon, Pencil, Trash2, Plus, X } from "lucide-react";

export default function ManageDashbord() {
  const [team, setTeam] = useState([]);

  // Modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Formulaire Add
  const [newMember, setNewMember] = useState({
    fullName: "",
    shortName: "",
    availability: "",
    profession: "",
    speciality: "",
    experience: "",
    description: "",
    domains: "",
    certifications: "",
  });

  // Formulaire Edit
  const [editData, setEditData] = useState({
    id: null,
    fullName: "",
    shortName: "",
    availability: "",
    profession: "",
    speciality: "",
    experience: "",
    description: "",
    domains: "",
    certifications: "",
  });

  // Charger membres
  useEffect(() => {
    fetch("http://localhost:5000/team")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Erreur récupération équipe :", err));
  }, []);

  // Supprimer
  const removeMember = (id) => {
    if (window.confirm("Supprimer ce membre ?")) {
      fetch(`http://localhost:5000/team/delete/${id}`, { method: "DELETE" })
        .then(() => setTeam(team.filter((m) => m.id !== id)))
        .catch((err) => console.error(err));
    }
  };

  // Ouvrir modal édition
  const editMember = (m) => {
    setEditData({
      id: m.id,
      fullName: m.fullName,
      shortName: m.shortName || "",
      availability: m.availability || "",
      profession: m.profession,
      speciality: m.speciality,
      experience: m.experience || "",
      description: m.description || "",
      domains: m.domains ? m.domains.join(", ") : "",
      certifications: m.certifications ? m.certifications.join(", ") : "",
    });
    setShowEditModal(true);
  };

  // Ajouter
  const submitAdd = (e) => {
    e.preventDefault();
    const payload = {
      ...newMember,
      domains: newMember.domains.split(",").map((d) => d.trim()),
      certifications: newMember.certifications.split(",").map((c) => c.trim()),
    };

    fetch("http://localhost:5000/team/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((added) => {
        setTeam([...team, { ...payload, id: added.id }]);
        setShowAddModal(false);
        setNewMember({
          fullName: "",
          shortName: "",
          availability: "",
          profession: "",
          speciality: "",
          experience: "",
          description: "",
          domains: "",
          certifications: "",
        });
      });
  };

  // Modifier
  const submitEdit = (e) => {
    e.preventDefault();
    const payload = {
      ...editData,
      domains: editData.domains.split(",").map((d) => d.trim()),
      certifications: editData.certifications.split(",").map((c) => c.trim()),
    };

    fetch(`http://localhost:5000/team/update/${editData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        setTeam(team.map((m) => (m.id === editData.id ? { ...payload, id: editData.id } : m)));
        setShowEditModal(false);
      });
  };

  return (
    <div className="flex flex-col p-4 gap-4 min-h-screen bg-gray-50">
      {/* Header */}
      <h1 className="text-xl font-bold text-gray-800">Good day!</h1>

      {/* Upcoming Appointment */}
      <div className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row gap-4 w-full">
        <div className="md:w-1/3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-600">Upcoming Appointment</h2>
            <h2 className="text-sm font-bold text-green-600 cursor-pointer">See all</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-col items-center justify-center gap-1 p-4 bg-violet-100 rounded-md w-full md:w-24">
              <span className="text-xs text-gray-500">Sunday</span>
              <span className="text-lg font-bold text-violet-600">12:00</span>
              <span className="text-xs text-gray-500">2025</span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-blue-100">
                  <User2Icon className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-700 text-sm">Dr. John Doe</h3>
                  <p className="text-xs text-gray-400">Therapist, Cardiologist</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-semibold">Douala Cameroun, Matin - 12:00</p>
              <button className="mt-2 bg-violet-500 text-white px-3 py-1 rounded hover:bg-violet-400 font-semibold w-max">
                Schedule with Dr
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gestion équipe */}
      <div className="bg-white rounded-md shadow p-4 w-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-700">Gestion de l’équipe</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1 rounded-md text-sm hover:bg-violet-400"
          >
            <Plus className="w-4 h-4" /> Ajouter un membre
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-md hover:shadow-md transition"
            >
              <div className="h-16 w-16 bg-violet-200 rounded-full flex items-center justify-center text-xl font-bold text-violet-700 mb-2">
                {member.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-md font-semibold text-gray-800">{member.fullName}</h3>
              <p className="text-xs text-gray-500">{member.profession}</p>
              <p className="text-[10px] text-gray-400">{member.speciality}</p>
              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                <button
                  onClick={() => editMember(member)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  <Pencil className="w-3 h-3" /> Éditer
                </button>
                <button
                  onClick={() => removeMember(member.id)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  <Trash2 className="w-3 h-3" /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL AJOUT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2">
          <form
            onSubmit={submitAdd}
            className="bg-white p-6 rounded-md shadow-md w-full max-w-sm overflow-auto max-h-[90vh]"
          >
            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-lg">Ajouter un membre</h2>
              <X onClick={() => setShowAddModal(false)} className="cursor-pointer" />
            </div>
            {["fullName","shortName","availability","profession","speciality","experience","description","domains","certifications"].map((field) => (
              <input
                key={field}
                required={field==="fullName" || field==="profession"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border p-2 rounded w-full mb-2"
                value={newMember[field]}
                onChange={(e) => setNewMember({ ...newMember, [field]: e.target.value })}
              />
            ))}
            <button className="w-full bg-violet-500 text-white p-2 rounded hover:bg-violet-400 mt-2">Ajouter</button>
          </form>
        </div>
      )}

      {/* MODAL EDIT */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2">
          <form
            onSubmit={submitEdit}
            className="bg-white p-6 rounded-md shadow-md w-full max-w-sm overflow-auto max-h-[90vh]"
          >
            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-lg">Modifier membre</h2>
              <X onClick={() => setShowEditModal(false)} className="cursor-pointer" />
            </div>
            {["fullName","shortName","availability","profession","speciality","experience","description","domains","certifications"].map((field) => (
              <input
                key={field}
                required={field==="fullName" || field==="profession"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border p-2 rounded w-full mb-2"
                value={editData[field]}
                onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
              />
            ))}
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400 mt-2">Enregistrer</button>
          </form>
        </div>
      )}
    </div>
  );
}
