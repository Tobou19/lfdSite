import { useState } from "react";
import {
  User,
  Search,
  PlusCircle,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Dupont",
      email: "alice@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: 2,
      name: "Jean Mbarga",
      email: "jean@example.com",
      role: "user",
      status: "inactive",
    },
    {
      id: 3,
      name: "Fatima Ngono",
      email: "fatima@example.com",
      role: "therapist",
      status: "active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  // Filtrage
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "active",
      },
    ]);
    setNewUser({ name: "", email: "", role: "user" });
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  return (
    <div className="p-6 h-screen bg-gray-50 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <User /> Gestion des Utilisateurs
      </h1>

      {/* Ajout */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-3 items-start md:items-end">
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs font-bold text-gray-600">Nom</label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Nom complet"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs font-bold text-gray-600">Email</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, email: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Email utilisateur"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs font-bold text-gray-600">Rôle</label>
          <select
            value={newUser.role}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, role: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="user">Utilisateur</option>
            <option value="therapist">Thérapeute</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <PlusCircle size={16} /> Ajouter
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white shadow rounded-lg p-4 flex gap-2 items-center">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher par nom, email ou rôle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-none outline-none text-sm"
        />
      </div>

      {/* Tableau */}
      <div className="bg-white shadow rounded-lg p-4 flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-xs uppercase text-gray-600">
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Rôle</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u) => (
                <tr key={u.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="p-2 font-bold">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 capitalize">{u.role}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        u.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`px-2 py-1 rounded flex items-center gap-1 text-white ${
                        u.status === "active"
                          ? "bg-yellow-500 hover:bg-yellow-400"
                          : "bg-green-500 hover:bg-green-400"
                      }`}
                    >
                      {u.status === "active" ? (
                        <>
                          <XCircle size={16} /> Désactiver
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} /> Activer
                        </>
                      )}
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-400 text-white px-2 py-1 rounded flex items-center gap-1">
                      <Edit size={16} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 italic"
                >
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
