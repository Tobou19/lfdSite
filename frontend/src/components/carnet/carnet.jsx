import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Carnet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [beneficiaire, setBeneficiaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carnet de suivi
  const [diagnostics, setDiagnostics] = useState([]);
  const [diagnosticInput, setDiagnosticInput] = useState("");

  const [traitements, setTraitements] = useState([]);
  const [traitementInput, setTraitementInput] = useState("");

  const [therapies, setTherapies] = useState([]);
  const [therapyInput, setTherapyInput] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [apptForm, setApptForm] = useState({ date: "", time: "", notes: "" });

  const [docs, setDocs] = useState([]);
  const [docName, setDocName] = useState("");
  const [showQuickAppt, setShowQuickAppt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/beneficiaires/${id}`);
        setBeneficiaire(res.data);

        setDiagnostics(res.data.diagnostics || []);
        setTraitements(res.data.traitements || []);
        setTherapies(res.data.therapies || []);
        setAppointments(res.data.appointments || []);
        setDocs(res.data.docs || []);
      } catch (err) {
        setError("Erreur lors du chargement du bénéficiaire");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // --- Ajouter / Supprimer ---
  const addTraitement = () => {
    if (!traitementInput.trim()) return;
    setTraitements(prev => [...prev, { id: Date.now(), name: traitementInput.trim() }]);
    setTraitementInput("");
  };
  const removeTraitement = tid => {
    setTraitements(prev => prev.filter(t => t.id !== tid));
  };

  const addTherapy = () => {
    if (!therapyInput.trim()) return;
    setTherapies(prev => [...prev, { id: Date.now(), name: therapyInput.trim() }]);
    setTherapyInput("");
  };
  const removeTherapy = tid => {
    setTherapies(prev => prev.filter(t => t.id !== tid));
  };

  const addDiagnostic = () => {
    if (!diagnosticInput.trim()) return;
    setDiagnostics(prev => [...prev, { id: Date.now(), name: diagnosticInput.trim() }]);
    setDiagnosticInput("");
  };
  const removeDiagnostic = did => {
    setDiagnostics(prev => prev.filter(d => d.id !== did));
  };

  const addAppointment = () => {
    if (!apptForm.date || !apptForm.time) {
      alert("Date et heure requises");
      return;
    }
    const newAppt = { id: Date.now(), ...apptForm };
    setAppointments(prev => [...prev, newAppt]);
    setApptForm({ date: "", time: "", notes: "" });
    setShowQuickAppt(false);
  };
  const removeAppointment = aid => setAppointments(prev => prev.filter(a => a.id !== aid));


  // --- Nouveau state pour la planification ---
const [planTreatment, setPlanTreatment] = useState({ treatmentId: "", frequency: "daily", sessions: 1, startDate: "" });

const frequencies = {
  daily: 1,
  weekly: 7,
  biweekly: 14
};

// --- Fonction pour générer rendez-vous ---
const planAppointments = () => {
  if (!planTreatment.treatmentId || !planTreatment.startDate || planTreatment.sessions < 1) {
    alert("Veuillez remplir tous les champs pour la planification.");
    return;
  }
  
  const treatment = traitements.find(t => t.id === parseInt(planTreatment.treatmentId));
  if (!treatment) return;
  
  const newAppointments = [];
  let currentDate = new Date(planTreatment.startDate);
  const incrementDays = frequencies[planTreatment.frequency];
  
  for (let i = 0; i < planTreatment.sessions; i++) {
    const appt = {
      id: Date.now() + i,
      date: currentDate.toISOString().split("T")[0],
      time: "09:00", // on peut rendre cela configurable plus tard
      notes: `Rendez-vous pour ${treatment.name}`
    };
    newAppointments.push(appt);
    currentDate.setDate(currentDate.getDate() + incrementDays);
  }

  setAppointments(prev => [...prev, ...newAppointments]);
};

  const addDoc = () => {
    if (!docName.trim()) return;
    setDocs(prev => [...prev, { id: Date.now(), name: docName.trim(), uploadedAt: new Date().toISOString().split("T")[0] }]);
    setDocName("");
  };
  const removeDoc = did => setDocs(prev => prev.filter(d => d.id !== did));

  const handleSave = async () => {
    try {
      // 1️⃣ On récupère l'ID du carnet associé au bénéficiaire
      const carnetRes = await axios.get(`http://localhost:5000/dashboard/carnet/${id}`);
      const carnetId = carnetRes.data.id;
  
      // 2️⃣ On envoie toutes les données du carnet, y compris les rendez-vous
      await axios.put(`http://localhost:5000/dashboard/carnet/update/${carnetId}`, {
        diagnostics,
        traitements,
        therapies,
        appointments,
        docs
      });
  
      alert("Carnet sauvegardé avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde du carnet");
    }
  };
  

  const downloadFollowUpSheet = () => {
    if (!beneficiaire) return;
    const content = `
Fiche de suivi - ${beneficiaire.name}
Email: ${beneficiaire.email}
Téléphone: ${beneficiaire.phone}
Date de naissance: ${beneficiaire.birthdate}

Diagnostics:
${diagnostics.map(d => d.name).join("\n")}

Traitements:
${traitements.map(t => t.name).join("\n")}

Thérapies:
${therapies.map(t => t.name).join("\n")}

Rendez-vous:
${appointments.map(a => `${a.date} ${a.time} - ${a.notes}`).join("\n")}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Fiche_Suivi_${beneficiaire.name.replace(/\s/g,"_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Info & Carnet */}
      <div className="space-y-4">
        <button className="px-4 py-2 bg-gray-700 text-white rounded" onClick={()=>navigate(-1)}>← Retour</button>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Bénéficiaire</h2>
          <p><strong>Nom :</strong> {beneficiaire.name}</p>
          <p><strong>Email :</strong> {beneficiaire.email}</p>
          <p><strong>Téléphone :</strong> {beneficiaire.phone}</p>
          <p><strong>Date de naissance :</strong> {beneficiaire.birthdate}</p>
        </div>

        <div className="bg-white shadow p-4 rounded space-y-3">
          <h3 className="font-semibold">Diagnostics</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {diagnostics.map(d=>(
              <div key={d.id} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-1">
                {d.name} <button onClick={()=>removeDiagnostic(d.id)} className="text-xs text-red-500">x</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <input value={diagnosticInput} onChange={e=>setDiagnosticInput(e.target.value)} placeholder="Ajouter un diagnostic" className="flex-1 px-2 py-1 border rounded"/>
            <button onClick={addDiagnostic} className="bg-gray-600 text-white px-3 py-1 rounded">Ajouter</button>
          </div>

          <h3 className="font-semibold">Traitements</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {traitements.map(t=>(
              <div key={t.id} className="px-3 py-1 bg-yellow-100 rounded flex items-center gap-1">
                {t.name} <button onClick={()=>removeTraitement(t.id)} className="text-xs text-red-500">x</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <input value={traitementInput} onChange={e=>setTraitementInput(e.target.value)} placeholder="Ajouter un traitement" className="flex-1 px-2 py-1 border rounded"/>
            <button onClick={addTraitement} className="bg-yellow-600 text-white px-3 py-1 rounded">Ajouter</button>
          </div>

          <button onClick={handleSave} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">💾 Sauvegarder</button>
        </div>
      </div>

      {/* Right: Thérapies, RDV, Docs */}
      <div className="space-y-4">
      <div className="bg-white shadow p-4 rounded">
  <h3 className="font-semibold mb-2">Planification des rendez-vous</h3>
  <div className="space-y-2">
    <select value={planTreatment.treatmentId} onChange={e=>setPlanTreatment(p=>({...p, treatmentId:e.target.value}))} className="w-full px-2 py-1 border rounded">
      <option value="">Sélectionner un traitement</option>
      {traitements.map(t=>(
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>
    <input type="date" value={planTreatment.startDate} onChange={e=>setPlanTreatment(p=>({...p,startDate:e.target.value}))} className="w-full px-2 py-1 border rounded"/>
    <select value={planTreatment.frequency} onChange={e=>setPlanTreatment(p=>({...p,frequency:e.target.value}))} className="w-full px-2 py-1 border rounded">
      <option value="daily">Quotidien</option>
      <option value="weekly">Hebdomadaire</option>
      <option value="biweekly">Bi-hebdomadaire</option>
    </select>
    <input type="number" value={planTreatment.sessions} min={1} onChange={e=>setPlanTreatment(p=>({...p,sessions:e.target.value}))} placeholder="Nombre de séances" className="w-full px-2 py-1 border rounded"/>
    <button onClick={planAppointments} className="w-full bg-purple-600 text-white px-3 py-1 rounded">Planifier les rendez-vous</button>
  </div>
</div>

        {/* Thérapies */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="font-semibold mb-2">Thérapies suivies</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {therapies.map(t=>(
              <div key={t.id} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full flex items-center gap-1">
                {t.name} <button onClick={()=>removeTherapy(t.id)} className="text-xs text-red-500">x</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <input value={therapyInput} onChange={e=>setTherapyInput(e.target.value)} placeholder="Ajouter une thérapie" className="flex-1 px-2 py-1 border rounded"/>
            <button onClick={addTherapy} className="bg-indigo-600 text-white px-3 py-1 rounded">Ajouter</button>
          </div>
        </div>

        {/* RDV */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="font-semibold mb-2">Rendez-vous ({appointments.length})</h3>
          <div className="space-y-2 mb-2">
            {appointments.length === 0 ? <p className="text-gray-400 text-sm">Aucun rendez-vous.</p> :
              appointments.map(a=>(
                <div key={a.id} className="flex justify-between items-center p-2 border rounded bg-gray-50">
                  <div>{a.date} • {a.time} - {a.notes}</div>
                  <button onClick={()=>removeAppointment(a.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">Suppr</button>
                </div>
              ))
            }
          </div>
          <div className="space-y-2 border-t pt-2">
            <input type="date" value={apptForm.date} onChange={e=>setApptForm(p=>({...p,date:e.target.value}))} className="w-full px-2 py-1 border rounded"/>
            <input type="time" value={apptForm.time} onChange={e=>setApptForm(p=>({...p,time:e.target.value}))} className="w-full px-2 py-1 border rounded"/>
            <input type="text" value={apptForm.notes} onChange={e=>setApptForm(p=>({...p,notes:e.target.value}))} placeholder="Notes (optionnel)" className="w-full px-2 py-1 border rounded"/>
            <button onClick={addAppointment} className="bg-blue-600 text-white px-3 py-1 rounded w-full">Programmer</button>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="font-semibold mb-2">Documents</h3>
          <div className="space-y-2 mb-2">
            {docs.length === 0 ? <p className="text-gray-400 text-sm">Aucun document.</p> :
              docs.map(d=>(
                <div key={d.id} className="flex justify-between p-2 border rounded bg-gray-50">
                  <div>{d.name} ({d.uploadedAt})</div>
                  <button onClick={()=>removeDoc(d.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">Suppr</button>
                </div>
              ))
            }
          </div>
          <div className="flex gap-2">
            <input value={docName} onChange={e=>setDocName(e.target.value)} placeholder="Nom document" className="flex-1 px-2 py-1 border rounded"/>
            <button onClick={addDoc} className="bg-emerald-600 text-white px-3 py-1 rounded">Téléverser</button>
          </div>
        </div>

        <button onClick={downloadFollowUpSheet} className="w-full bg-emerald-50 text-emerald-700 px-3 py-2 rounded">📄 Télécharger fiche de suivi</button>
      </div>
    </div>
  );
}
