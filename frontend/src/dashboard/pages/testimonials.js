import { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  PlusCircle,
  MessageSquare,
} from "lucide-react";
import axios from "axios";

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    full_name: "",
    age: "",
    condition_name: "",
    testimonial_text: "",
    result_text: "",
    result_value: "",
    follow_up_duration: "",
    verified: false,
  });

  const API_URL = "https://lfdsite.onrender.com/testimonials"; // adapte à ton backend

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_URL}`);
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async () => {
    try {
      if (modalData.id) {
        await axios.put(`${API_URL}/update/${modalData.id}`, modalData);
      } else {
        await axios.post(`${API_URL}/create`, modalData);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi des données");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce témoignage ?")) return;
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (t) => {
    try {
      const newStatus = t.status === "published" ? "draft" : "published";
      await axios.put(`${API_URL}/update/${t.id}`, { status: newStatus });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = testimonials.filter(
    (t) =>
      t.full_name.toLowerCase().includes(search.toLowerCase()) ||
      t.testimonial_text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 h-screen bg-gray-50 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <MessageSquare /> Gestion des Témoignages
      </h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded flex items-center gap-1 w-fit"
      >
        <PlusCircle size={16} /> Ajouter un témoignage
      </button>

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
                  <td className="p-2 font-bold">{t.full_name}</td>
                  <td className="p-2">{t.testimonial_text}</td>
                  <td className="p-2">{t.created_at?.split("T")[0]}</td>
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
                      onClick={() => handleToggleStatus(t)}
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
                      onClick={() => {
                        setModalData({ ...t });
                        setIsModalOpen(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <Edit size={16} /> Éditer
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
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  Aucun témoignage trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Pro */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">
              {modalData.id ? "Éditer Témoignage" : "Ajouter Témoignage"}
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Colonne gauche */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-semibold mb-1">Nom</label>
                  <input
                    type="text"
                    value={modalData.full_name}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, full_name: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Âge</label>
                  <input
                    type="number"
                    value={modalData.age}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, age: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Pathologie</label>
                  <input
                    type="text"
                    value={modalData.condition_name}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, condition_name: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={modalData.verified}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, verified: e.target.checked }))
                    }
                  />
                  <span>Témoignage vérifié</span>
                </div>
              </div>

              {/* Colonne droite */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-semibold mb-1">Message</label>
                  <textarea
                    value={modalData.testimonial_text}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, testimonial_text: e.target.value }))
                    }
                    className="w-full h-24 border border-gray-300 rounded px-3 py-2 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Résultat (texte)</label>
                  <input
                    type="text"
                    value={modalData.result_text}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, result_text: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Résultat (valeur)</label>
                  <input
                    type="text"
                    value={modalData.result_value}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, result_value: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Durée du suivi</label>
                  <input
                    type="text"
                    value={modalData.follow_up_duration}
                    onChange={(e) =>
                      setModalData((prev) => ({ ...prev, follow_up_duration: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white"
              >
                {modalData.id ? "Mettre à jour" : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
