import React, { useState, useMemo } from "react";

export default function ManageEntries() {
  // --- Données initiales simulées ---
  const initialEntries = [
    { id: 1, person: "Alice Mbarga", type: "Entrée", date: "2025-09-30", time: "08:00", notes: "Arrivée normale" },
    { id: 2, person: "Jean Talla", type: "Sortie", date: "2025-09-30", time: "12:00", notes: "Sortie déjeuner" },
    { id: 3, person: "Mireille Nkoa", type: "Entrée", date: "2025-09-30", time: "09:30", notes: "" },
  ];

  // --- State ---
  const [entries, setEntries] = useState(initialEntries);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ person: "", type: "Entrée", date: "", time: "", notes: "" });
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // --- Helpers ---
  const nextId = (arr) => (arr.length ? Math.max(...arr.map((a) => a.id)) + 1 : 1);

  // --- Filtering & Searching ---
  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesQuery = !q || e.person.toLowerCase().includes(q);
      const matchesType = !typeFilter || e.type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [entries, query, typeFilter]);

  // --- CRUD ---
  function handleSaveEntry() {
    if (!form.person || !form.date || !form.time) {
      alert("Nom, date et heure requis.");
      return;
    }

    if (editing) {
      setEntries((prev) => prev.map((e) => (e.id === editing ? { ...e, ...form } : e)));
      setEditing(null);
    } else {
      const id = nextId(entries);
      setEntries((prev) => [{ id, ...form }, ...prev]);
    }
    setForm({ person: "", type: "Entrée", date: "", time: "", notes: "" });
    setShowAddModal(false);
  }

  function startEdit(entry) {
    setEditing(entry.id);
    setForm({ ...entry });
    setShowAddModal(true);
  }

  function handleDelete(id) {
    if (!window.confirm("Supprimer cette entrée ?")) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (selectedEntry?.id === id) setSelectedEntry(null);
  }

  function downloadReport() {
    const text = filteredEntries.map(e => `${e.person} • ${e.type} • ${e.date} ${e.time} • ${e.notes}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report_entries.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- Render ---
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Entrées / Sorties</h1>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Rechercher une personne..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white text-sm"
            />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 border rounded-md text-sm bg-white">
              <option value="">Tous types</option>
              <option value="Entrée">Entrée</option>
              <option value="Sortie">Sortie</option>
            </select>
            <button onClick={() => setShowAddModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-500 text-sm">
              + Ajouter
            </button>
            <button onClick={downloadReport} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 text-sm">
              Télécharger rapport
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 h-[70vh] overflow-y-auto">
          {filteredEntries.length === 0 ? (
            <div className="text-gray-500 text-center py-10">Aucune entrée / sortie trouvée.</div>
          ) : (
            <ul className="space-y-2">
              {filteredEntries.map((e) => (
                <li key={e.id} className="p-3 rounded-lg bg-gray-50 flex justify-between items-center hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedEntry(e)}>
                  <div>
                    <div className="font-semibold">{e.person} • {e.type}</div>
                    <div className="text-xs text-gray-500">{e.date} {e.time}</div>
                    {e.notes && <div className="text-xs text-gray-400">{e.notes}</div>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={(ev) => { ev.stopPropagation(); startEdit(e); }} className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded">Éditer</button>
                    <button onClick={(ev) => { ev.stopPropagation(); handleDelete(e.id); }} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">Suppr</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{editing ? "Éditer entrée / sortie" : "Ajouter entrée / sortie"}</h3>
                <button onClick={() => { setShowAddModal(false); setEditing(null); }} className="text-gray-500">Fermer</button>
              </div>
              <div className="space-y-3">
                <input placeholder="Nom de la personne" value={form.person} onChange={(e) => setForm((f) => ({ ...f, person: e.target.value }))} className="w-full px-3 py-2 border rounded text-sm" />
                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full px-3 py-2 border rounded text-sm">
                  <option value="Entrée">Entrée</option>
                  <option value="Sortie">Sortie</option>
                </select>
                <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2 border rounded text-sm" />
                <input type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} className="w-full px-3 py-2 border rounded text-sm" />
                <textarea placeholder="Notes (optionnel)" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className="w-full px-3 py-2 border rounded text-sm" />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => { setShowAddModal(false); setEditing(null); }} className="px-4 py-2 bg-gray-100 rounded">Annuler</button>
                <button onClick={handleSaveEntry} className="px-4 py-2 bg-green-600 text-white rounded">{editing ? "Enregistrer" : "Ajouter"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
