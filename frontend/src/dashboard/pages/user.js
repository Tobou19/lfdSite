import { useState, useEffect } from "react";
import axios from "axios";
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
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = "http://localhost:5000/users";

  // 🔄 Charger les utilisateurs
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Status par défaut si pas présent dans la base
      const usersWithStatus = res.data.map((u) => ({
        ...u,
        status: u.status || "active",
      }));

      setUsers(usersWithStatus);
      setError("");
    } catch (err) {
      setError("Impossible de récupérer les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ➕ Ajouter un utilisateur
  const handleAdd = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/create`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => [
        ...prev,
        {
          id: res.data.id,
          ...newUser,
          status: "active",
        },
      ]);

      // Reset formulaire
      setNewUser({ name: "", email: "", password: "", role: "user" });
      setError("");
    } catch (err) {
      setError("Erreur lors de la création de l'utilisateur.");
    }
  };

  // 🗑 Supprimer
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression.");
    }
  };

  // 🔄 Activer / désactiver
  const handleToggleStatus = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const updatedStatus = user.status === "active" ? "inactive" : "active";

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/update/${id}`,
        { status: updatedStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: updatedStatus } : u))
      );
    } catch (err) {
      setError("Impossible de changer le statut.");
    }
  };

  // 🔍 Filtre recherche
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 h-screen bg-gray-50 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <User /> Gestion des Utilisateurs
      </h1>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Ajout utilisateur */}
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
          <label className="text-xs font-bold text-gray-600">
            Mot de passe
          </label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, password: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Mot de passe"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/6">
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
        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : (
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

                    {/* Statut */}
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

                    {/* Actions */}
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
        )}
      </div>
    </div>
  );
}
