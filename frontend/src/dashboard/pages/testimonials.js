import { useState } from "react";
import {
  Search,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  PlusCircle,
  MessageSquare,
} from "lucide-react";

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Alice Dupont",
      message: "Un excellent accompagnement, je recommande vivement !",
      date: "2025-09-25",
      status: "published",
    },
    {
      id: 2,
      name: "Jean Mbarga",
      message: "Service rapide et efficace. Merci pour tout 🙏",
      date: "2025-09-20",
      status: "draft",
    },
    {
      id: 3,
      name: "Fatima Ngono",
      message: "Une expérience très positive, j’ai été bien écoutée.",
      date: "2025-09-15",
      status: "published",
    },
  ]);

  const [search, setSearch] = useState("");
  const [newTestimonial, setNewTestimonial] = useState({ name: "", message: "" });

  // Filtrage
  const filtered = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newTestimonial.name || !newTestimonial.message) return;
    setTestimonials((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTestimonial.name,
        message: newTestimonial.message,
        date: new Date().toISOString().split("T")[0],
        status: "draft",
      },
    ]);
    setNewTestimonial({ name: "", message: "" });
  };

  const handleDelete = (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "published" ? "draft" : "published" }
          : t
      )
    );
  };

  return (
    <div className="p-6 h-screen bg-gray-50 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <MessageSquare /> Gestion des Témoignages
      </h1>

      {/* Ajout */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-3 items-start md:items-end">
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs font-bold text-gray-600">Nom</label>
          <input
            type="text"
            value={newTestimonial.name}
            onChange={(e) =>
              setNewTestimonial((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Nom de l'auteur"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-xs font-bold text-gray-600">Message</label>
          <textarea
            value={newTestimonial.message}
            onChange={(e) =>
              setNewTestimonial((prev) => ({ ...prev, message: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Écrivez le témoignage..."
          />
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
          placeholder="Rechercher par nom ou message..."
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
              <th className="p-2">Message</th>
              <th className="p-2">Date</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <tr key={t.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="p-2 font-bold">{t.name}</td>
                  <td className="p-2">{t.message}</td>
                  <td className="p-2">{t.date}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        t.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(t.id)}
                      className={`px-2 py-1 rounded flex items-center gap-1 text-white ${
                        t.status === "published"
                          ? "bg-yellow-500 hover:bg-yellow-400"
                          : "bg-green-500 hover:bg-green-400"
                      }`}
                    >
                      {t.status === "published" ? (
                        <>
                          <XCircle size={16} /> Dépublier
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} /> Publier
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
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
                  Aucun témoignage trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
