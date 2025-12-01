import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  UserPlus,
  Trash2,
  CheckCircle,
  Search,
  UserCircle2,
} from "lucide-react";

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all"); // all | beneficiaries | nonBeneficiaries

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("https://lfdsite.onrender.com/api/appointment");
        setAppointments(res.data);
      } catch (err) {
        console.error("Erreur lors du fetch des RDVs :", err);
      }
    };
    fetchAppointments();
  }, []);

  // --- Filter + Search Logic ---
  const filteredAppointments = appointments.filter((a) => {
    const matchDate = filterDate
      ? a.preferredDate?.split("T")[0] === filterDate
      : true;
    const matchSearch = search
      ? a.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        a.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        a.email?.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchTab =
      tab === "all"
        ? true
        : tab === "beneficiaries"
        ? a.isBeneficiary
        : !a.isBeneficiary;

    return matchDate && matchSearch && matchTab;
  });

  const handleDelete = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    // axios.delete(`/api/appointment/${id}`)
  };

  const handleValidate = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "confirmed" } : a
      )
    );
    // axios.put(`/api/appointment/${id}`, { status: "confirmed" })
  };

  const handleTransform = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, isBeneficiary: true } : a
      )
    );
    // axios.post(`/api/beneficiaries`, {...a})
  };

  return (
    <div className="p-6 h-screen bg-gray-50 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <CalendarDays /> Gestion des Rendez-vous
      </h1>

      {/* Barre de filtres */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Rechercher par nom, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-600">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              tab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setTab("beneficiaries")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              tab === "beneficiaries" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Bénéficiaires
          </button>
          <button
            onClick={() => setTab("nonBeneficiaries")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              tab === "nonBeneficiaries" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            Non Bénéficiaires
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white shadow rounded-lg p-4 flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-xs uppercase text-gray-600">
              <th className="p-2">Nom</th>
              <th className="p-2">Prénom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Téléphone</th>
              <th className="p-2">Date</th>
              <th className="p-2">Heure</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a) => (
                <tr
                  key={a.id}
                  className="border-b text-sm hover:bg-gray-50 transition"
                >
                  <td className="p-2 font-bold">{a.lastName}</td>
                  <td className="p-2">{a.firstName}</td>
                  <td className="p-2">{a.email}</td>
                  <td className="p-2">{a.phone}</td>
                  <td className="p-2">
                    {a.preferredDate?.split("T")[0] || "-"}
                  </td>
                  <td className="p-2">{a.preferredTime || "-"}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        a.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {a.status || "pending"}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleValidate(a.id)}
                      className="bg-green-500 hover:bg-green-400 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <CheckCircle size={16} /> Valider
                    </button>
                    {!a.isBeneficiary && (
                      <button
                        onClick={() => handleTransform(a.id)}
                        className="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <UserPlus size={16} /> Bénéficiaire
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(a.id)}
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
                  colSpan="8"
                  className="text-center py-4 text-gray-500 italic"
                >
                  Aucun rendez-vous trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
