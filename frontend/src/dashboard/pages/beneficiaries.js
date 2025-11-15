import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

export default function ManageBeneficiaries() {
  
  // --- State ---
  const [beneficiaries, setBeneficiaries] = useState([]);
  // const [therapies, setTherapies] = useState(initialTherapies);
  // const [appointments, setAppointments] = useState(initialAppointments);
  // const [docs, setDocs] = useState(initialDocs);

  // const [selected, setSelected] = useState(null); 
  // const [query, setQuery] = useState("");
  // const [therapyFilter, setTherapyFilter] = useState("");
  // const [showAddModal, setShowAddModal] = useState(false);
  // const [editing, setEditing] = useState(null); 
  // const [form, setForm] = useState({ name: "", email: "", phone: "", birthdate: "", notes: "" });

  
useEffect(() => {
  const fetchBeneficiaires = async () => {
    const beneficiaires = await axios.get("http://localhost:5000/beneficiaires");
    setBeneficiaries(beneficiaires.data);
  }
  fetchBeneficiaires();
}, []);


  // --- Données initiales simulées ---
  const initialBeneficiaries = [
    { id: 1, name: "Alice Mbarga", email: "alice@example.com", phone: "670000111", birthdate: "1995-02-10", notes: "Patient présentant anxiété légère." },
    { id: 2, name: "Jean Talla", email: "jean@example.com", phone: "690123456", birthdate: "1988-07-22", notes: "Suivi pour rééducation cardiaque." },
    { id: 3, name: "Mireille Nkoa", email: "mireille@example.com", phone: "678888999", birthdate: "2000-11-05", notes: "Suivi psychologique." },
  ];

  const initialTherapies = {
    1: [{ id: 1, name: "Thérapie Cognitive" }, { id: 2, name: "Relaxation Guidée" }],
    2: [{ id: 3, name: "Thérapie de Groupe" }],
    3: [],
  };

  const initialAppointments = {
    1: [{ id: 1, date: "2025-10-01", time: "10:00", notes: "Première séance" }, { id: 2, date: "2025-10-15", time: "14:00", notes: "Suivi intermédiaire" }],
    2: [{ id: 3, date: "2025-10-05", time: "09:00", notes: "Séance de groupe" }],
    3: [],
  };

  const initialDocs = { 1: [{ id: 1, name: "Bilan_initial.pdf", uploadedAt: "2025-09-01" }], 2: [], 3: [] };


    // --- State ---
    // const [beneficiaries, setBeneficiaries] = useState([]);
    const [therapies, setTherapies] = useState(initialTherapies);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [docs, setDocs] = useState(initialDocs);
  
    const [selected, setSelected] = useState(null); 
    const [query, setQuery] = useState("");
    const [therapyFilter, setTherapyFilter] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [editing, setEditing] = useState(null); 
    const [form, setForm] = useState({ name: "", email: "", phone: "", birthdate: "", notes: "" , idCarnet: ""});

  // quick appt toggle
  const [showQuickAppt, setShowQuickAppt] = useState(false);

  // small helpers for unique ids
  const nextId = (arr) => (arr.length ? Math.max(...arr.map((a) => a.id)) + 1 : 1);
  const nextChildId = (objMap) => {
    const all = Object.values(objMap).flat();
    return all.length ? Math.max(...all.map((a) => a.id)) + 1 : 1;
  };

  // --- Effects ---
  useEffect(() => {
    if (selected) {
      const fresh = beneficiaries.find((b) => b.id === selected.id);
      setSelected(fresh || null);
    }
  }, [beneficiaries]);

  // --- Derived data ---
  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return beneficiaries.filter((b) => {
      const matchesQuery = !q || b.name.toLowerCase().includes(q) || (b.email && b.email.toLowerCase().includes(q)) || (b.phone && b.phone.includes(q));
      const matchesTherapy = !therapyFilter || (therapies[b.id] && therapies[b.id].some((t) => t.name === therapyFilter));
      return matchesQuery && matchesTherapy;
    });
  }, [beneficiaries, query, therapyFilter, therapies]);

  const allTherapiesUnique = useMemo(() => {
    const flat = Object.values(therapies).flat();
    const names = [...new Map(flat.map((t) => [t.name, t])).values()];
    return names;
  }, [therapies]);

  // --- Beneficiary CRUD ---
  function openAddModal() {
    setForm({ name: "", email: "", phone: "", birthdate: "", notes: "" });
    setEditing(null);
    setShowAddModal(true);
  }

  async function handleSaveBeneficiary() {
    if (!form.name || !form.email) { alert("Le nom et l'email sont requis."); return; }
  
    if (editing) {
      await axios.put(`http://localhost:5000/beneficiaires/${editing}`, form);
    } else {
      await axios.post("http://localhost:5000/beneficiaires/add", form);
    }
  
    const res = await axios.get("http://localhost:5000/beneficiaires");
    setBeneficiaries(res.data);
    setShowAddModal(false);
    setEditing(null);
  }
  

  function startEdit(b) {
    setEditing(b.id);
    setForm({ name: b.name || "", email: b.email || "", phone: b.phone || "", birthdate: b.birthdate || "", notes: b.notes || "" });
    setShowAddModal(true);
  }

  async function handleDeleteBeneficiary(id) {
    if (!window.confirm("Supprimer ce bénéficiaire ? Toutes ses données seront supprimées.")) return;
  
    try {
      await axios.delete(`http://localhost:5000/beneficiaires/${id}`);
  
      // seulement après confirmation côté serveur, mettre à jour le state
      setBeneficiaries((prev) => prev.filter((b) => b.id !== id));
      setTherapies((prev) => { const cp = { ...prev }; delete cp[id]; return cp; });
      setAppointments((prev) => { const cp = { ...prev }; delete cp[id]; return cp; });
      setDocs((prev) => { const cp = { ...prev }; delete cp[id]; return cp; });
      if (selected?.id === id) setSelected(null);
  
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Impossible de supprimer ce bénéficiaire. Vérifiez que l'ID existe.");
    }
  }
  

  // --- Therapy management ---
  function addTherapy(name) {
    if (!selected || !name) return;
    const id = nextChildId(therapies);
    setTherapies((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), { id, name }] }));
  }

  function removeTherapy(tid) {
    if (!selected) return;
    setTherapies((prev) => ({ ...prev, [selected.id]: (prev[selected.id] || []).filter((t) => t.id !== tid) }));
  }

  // --- Appointments management ---
  const [apptForm, setApptForm] = useState({ date: "", time: "", notes: "" });

  const  addAppointment = async (payload) => {
    if (!selected) return;
    const id = nextChildId(appointments);
    setAppointments((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), { id, ...payload }] }));
    axios.post(`http://localhost:5000/beneficiaires/appointment/${6}`, payload);
  }

  function removeAppointment(id) {
    if (!selected) return;
    setAppointments((prev) => ({ ...prev, [selected.id]: (prev[selected.id] || []).filter((a) => a.id !== id) }));
  }

  // --- Docs management ---
  const [docName, setDocName] = useState("");
  function addDoc(filename) {
    if (!selected) return;
    const id = nextChildId(docs);
    setDocs((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), { id, name: filename, uploadedAt: new Date().toISOString().split("T")[0] }] }));
  }

  function removeDoc(id) {
    if (!selected) return;
    setDocs((prev) => ({ ...prev, [selected.id]: (prev[selected.id] || []).filter((d) => d.id !== id) }));
  }

  // --- Download fiche de suivi ---
  function downloadFollowUpSheet() {
    if (!selected) return;
    const content = `
Fiche de suivi - ${selected.name}
Email: ${selected.email}
Téléphone: ${selected.phone}
Date de naissance: ${selected.birthdate}
Notes: ${selected.notes}

Thérapies:
${(therapies[selected.id] || []).map(t => t.name).join(", ")}

Rendez-vous:
${(appointments[selected.id] || []).map(a => `${a.date} ${a.time} - ${a.notes}`).join("\n")}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Fiche_Suivi_${selected.name.replace(/\s/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // --- Small UI components ---
  function EmptyState({ title, subtitle }) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
        <div className="text-2xl font-semibold mb-2">{title}</div>
        <p className="text-sm">{subtitle}</p>
      </div>
    );
  }

  const [therapyInput, setTherapyInput] = useState("");

  // --- Render ---
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestion des bénéficiaires</h1>
            <p className="text-sm text-gray-500">Ajoute, édite, filtre et gère documents, thérapies et rendez-vous.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Recherche par nom, email ou téléphone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white shadow-sm text-sm w-80"
            />
            <select
              value={therapyFilter}
              onChange={(e) => setTherapyFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white text-sm"
            >
              <option value="">Tous types de thérapie</option>
              {allTherapiesUnique.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
            <button onClick={openAddModal} className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-500 text-sm">
              + Nouveau bénéficiaire
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: liste */}
          <div className="col-span-1 bg-white rounded-xl shadow p-4 h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-700">Liste</h2>
              <div className="text-sm text-gray-500">{filteredList.length} résultat(s)</div>
            </div>
            <ul className="space-y-2">
              {filteredList.length === 0 ? (
                <div className="text-sm text-gray-500 p-3">Aucun bénéficiaire trouvé.</div>
              ) : (
                filteredList.map((b) => (
                  <li
                    key={b.id}
                    className={`p-3 rounded-lg cursor-pointer transition flex items-center justify-between ${selected?.id === b.id ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`}
                    onClick={() => setSelected(b)}
                  >
                    <div>
                      <div className="font-semibold text-gray-800">{b.name}</div>
                      <div className="text-xs text-gray-500">{b.email} • {b.phone}</div>
                      <div className="text-xs text-gray-400 mt-1">{b.notes?.slice(0, 50)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); startEdit(b); }} className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded">Éditer</button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteBeneficiary(b.id); }} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">Suppr</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Middle + Right: details */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {/* Middle left */}
            <div className="bg-white rounded-xl shadow p-4 h-[70vh] overflow-y-auto">
              {selected ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selected.name}</h2>
                      <div className="text-sm text-gray-500">{selected.email} • {selected.phone}</div>
                      <div className="text-sm text-gray-400 mt-2">{selected.birthdate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Rendez-vous</div>
                      <div className="text-2xl font-semibold text-green-600">{(appointments[selected.id] || []).length}</div>
                      <div className="text-xs text-gray-400">Thérapies: {(therapies[selected.id] || []).length}</div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm text-gray-600">{selected.notes || "Aucune note."}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Thérapies suivies</h3>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {(therapies[selected.id] || []).map((t) => (
                        <div key={t.id} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center gap-2">
                          {t.name}
                          <button onClick={() => removeTherapy(t.id)} className="ml-2 text-xs text-red-500">x</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={therapyInput} onChange={(e) => setTherapyInput(e.target.value)} placeholder="Ajouter une thérapie" className="flex-1 px-3 py-2 border rounded-md text-sm" />
                      <button onClick={() => { if (therapyInput.trim()) { addTherapy(therapyInput.trim()); setTherapyInput(""); } }} className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm">Ajouter</button>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div>
                    <h3 className="font-semibold mb-2">Documents</h3>
                    <div className="space-y-2 mb-3">
                      {(docs[selected.id] || []).map((d) => (
                        <div key={d.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div>
                            <div className="text-sm font-medium">{d.name}</div>
                            <div className="text-xs text-gray-400">Téléversé: {d.uploadedAt}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => alert(`Aperçu simulé: ${d.name}`)} className="text-xs px-2 py-1 bg-white border rounded">Aperçu</button>
                            <button onClick={() => removeDoc(d.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">Suppr</button>
                          </div>
                        </div>
                      ))}
                      {(!docs[selected.id] || docs[selected.id].length === 0) && <div className="text-sm text-gray-400">Aucun document.</div>}
                    </div>
                    <div className="flex gap-2">
                      <input value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Nom du document (ex: bilan.pdf)" className="flex-1 px-3 py-2 border rounded-md text-sm" />
                      <button onClick={() => { if (docName.trim()) { addDoc(docName.trim()); setDocName(""); } }} className="bg-emerald-600 text-white px-3 py-2 rounded-md text-sm">Téléverser</button>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyState title="Sélectionnez un bénéficiaire" subtitle="Cliquer sur un nom à gauche pour voir / gérer les détails." />
              )}
            </div>

                      {/* Right: appointments + quick actions */}
                      <div className="bg-white rounded-xl shadow p-4 h-[70vh] overflow-y-auto">
              {selected ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Rendez-vous</h3>
                    <div className="text-sm text-gray-500">{(appointments[selected.id] || []).length} total</div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {(appointments[selected.id] || []).length === 0 ? (
                      <div className="text-sm text-gray-400">Aucun rendez-vous.</div>
                    ) : (
                      (appointments[selected.id] || []).map((a) => (
                        <div key={a.id} className="p-3 rounded border bg-gray-50 flex justify-between items-start">
                          <div>
                            <div className="font-medium">{a.date} • {a.time}</div>
                            <div className="text-sm text-gray-600">{a.notes}</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => removeAppointment(a.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">Suppr</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="border-t pt-3 mb-4">
                    <h4 className="text-sm font-medium mb-2">Ajouter un rendez-vous</h4>
                    <div className="space-y-2">
                      <input type="date" value={apptForm.date} onChange={(e) => setApptForm((p) => ({ ...p, date: e.target.value }))} className="w-full px-3 py-2 border rounded text-sm" />
                      <input type="time" value={apptForm.time} onChange={(e) => setApptForm((p) => ({ ...p, time: e.target.value }))} className="w-full px-3 py-2 border rounded text-sm" />
                      <input value={apptForm.notes} onChange={(e) => setApptForm((p) => ({ ...p, notes: e.target.value }))} placeholder="Notes (optionnel)" className="w-full px-3 py-2 border rounded text-sm" />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (!apptForm.date || !apptForm.time) { alert("Date et heure requises"); return; }
                            addAppointment({ date: apptForm.date, time: apptForm.time, notes: apptForm.notes });
                            setApptForm({ date: "", time: "", notes: "" });
                          }}
                          className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
                        >
                          Ajouter
                        </button>
                        <button onClick={() => setApptForm({ date: "", time: "", notes: "" })} className="bg-gray-100 px-3 py-2 rounded text-sm">Annuler</button>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div>
                    <h4 className="text-sm font-medium mb-2">Actions rapides</h4>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => { navigator.clipboard?.writeText(selected.email); alert("Email copié"); }} className="text-sm px-3 py-2 bg-gray-50 rounded">Copier email</button>
                      <button
                        onClick={() => {
                          setForm({ name: selected.name, email: selected.email, phone: selected.phone, birthdate: selected.birthdate, notes: selected.notes });
                          setEditing(selected.id);
                          setShowAddModal(true);
                        }}
                        className="text-sm px-3 py-2 bg-yellow-50 rounded"
                      >
                        Éditer profil
                      </button>
                      <button onClick={() => handleDeleteBeneficiary(selected.id)} className="text-sm px-3 py-2 bg-red-50 text-red-600 rounded">Supprimer profil</button>
                      <button onClick={downloadFollowUpSheet} className="text-sm px-3 py-2 bg-emerald-50 text-emerald-700 rounded">Télécharger fiche de suivi</button>
                      <button onClick={() => setShowQuickAppt(!showQuickAppt)} className="text-sm px-3 py-2 bg-blue-50 text-blue-700 rounded">
                        {showQuickAppt ? "Annuler rendez-vous rapide" : "Programmer rendez-vous rapide"}
                      </button>

                      {showQuickAppt && (
                        <div className="mt-2 p-2 border rounded bg-gray-50 space-y-2">
                          <input type="date" value={apptForm.date} onChange={(e) => setApptForm((p) => ({ ...p, date: e.target.value }))} className="w-full px-2 py-1 border rounded text-sm" />
                          <input type="time" value={apptForm.time} onChange={(e) => setApptForm((p) => ({ ...p, time: e.target.value }))} className="w-full px-2 py-1 border rounded text-sm" />
                          <input value={apptForm.notes} onChange={(e) => setApptForm((p) => ({ ...p, notes: e.target.value }))} placeholder="Notes (optionnel)" className="w-full px-2 py-1 border rounded text-sm" />
                          <button
                            onClick={() => {
                              if (!apptForm.date || !apptForm.time) { alert("Date et heure requises"); return; }
                              addAppointment({ date: apptForm.date, time: apptForm.time, notes: apptForm.notes });
                              setApptForm({ date: "", time: "", notes: "" });
                              setShowQuickAppt(false);
                            }}
                            className="w-full bg-blue-600 text-white px-2 py-1 rounded text-sm"
                          >
                            Programmer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <EmptyState title="Rendez-vous & Actions" subtitle="Sélectionne un bénéficiaire pour gérer ses rendez-vous et actions rapides." />
              )}
            </div>
          </div>
        </div>

        {/* Add / Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{editing ? "Éditer bénéficiaire" : "Ajouter un bénéficiaire"}</h3>
                <button onClick={() => { setShowAddModal(false); setEditing(null); }} className="text-gray-500">Fermer</button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input className="p-2 border rounded" placeholder="Nom complet" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                <input className="p-2 border rounded" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                <input className="p-2 border rounded" placeholder="Téléphone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                <input className="p-2 border rounded" type="date" value={form.birthdate} onChange={(e) => setForm((f) => ({ ...f, birthdate: e.target.value }))} />
                <textarea className="col-span-2 p-2 border rounded" placeholder="Notes / historique" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
                <input type="number" className="p-2 border rounded" placeholder="Carnet" value={form.idCarnet} onChange={(e) => setForm((f) => ({ ...f, idCarnet: e.target.value }))} />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => { setShowAddModal(false); setEditing(null); }} className="px-4 py-2 bg-gray-100 rounded">Annuler</button>
                <button onClick={handleSaveBeneficiary} className="px-4 py-2 bg-green-600 text-white rounded">{editing ? "Enregistrer" : "Ajouter"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

