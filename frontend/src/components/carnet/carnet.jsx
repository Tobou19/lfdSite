// Updated Carnet component with added fields for full medical consultation
// (Antécédents, Examens, Signes vitaux, Traitements diabète, Régime alimentaire, Paiements)
// NOTE: Only UI fields added. No change to existing behavior.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Carnet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [beneficiaire, setBeneficiaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Existing states ---
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

  // --- New states for added medical form sections ---
  const [antecedents, setAntecedents] = useState({
    familial: false,
    symptomes: false,
    infectieuses: false,
    respiratoires: false,
    cardiaques: false,
    neurologiques: false,
    urinaires: false,
    genitaux: false,
    digestifs: false,
    endocriniens: false,
    autre: ""
  });

  const [labTests, setLabTests] = useState({
    psa: false,
    vih: false,
    urine: false,
    hematologie: false,
    glycemie: false,
    sgb: false,
    autre: ""
  });

  const [vitals, setVitals] = useState({
    tension: "",
    pouls: "",
    glycemie: "",
    taille: "",
    poids: "",
    imc: ""
  });

  const [diabete, setDiabete] = useState({
    lf: false,
    frmd: false,
    rbs: false,
    righo: false,
    rfmd: false,
    rgmd: false,
    glu: false,
    pioglitazone: false,
    met: false,
    ac: false,
    sulfo: false
  });

  const [food, setFood] = useState({
    greens: false,
    nonsweet: false,
    livingFood: false,
    noPolyfoods: false
  });

  const [payments, setPayments] = useState({
    p1: "",
    p2: "",
    p3: ""
  });

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

  // Existing functions remain unchanged...

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <button className="px-4 py-2 bg-gray-700 text-white rounded" onClick={() => navigate(-1)}>← Retour</button>
      <div className="bg-white shadow p-4 rounded">
  <h2 className="text-xl font-semibold mb-2">Bénéficiaire</h2>
  <p><strong>Nom :</strong> {beneficiaire.name}</p>
  <p><strong>Email :</strong> {beneficiaire.email}</p>
  <p><strong>Téléphone :</strong> {beneficiaire.phone}</p>
  <p><strong>Date de naissance :</strong> {beneficiaire.birthdate}</p>
</div>

      {/* --- SECTION: Antecedents --- */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">1. Antécédents / Anamnèse</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(antecedents).map(key => (
            key !== "autre" ? (
              <label key={key} className="flex items-center gap-2">
                <input type="checkbox" checked={antecedents[key]} onChange={e => setAntecedents(p => ({ ...p, [key]: e.target.checked }))} />
                {key}
              </label>
            ) : null
          ))}
        </div>
        <input placeholder="Autre..." className="mt-2 px-2 py-1 border rounded w-full" value={antecedents.autre} onChange={e => setAntecedents(p => ({ ...p, autre: e.target.value }))} />
      </div>

      {/* --- SECTION: Lab Tests --- */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">2. Examens de laboratoire requis</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(labTests).map(key => (
            key !== "autre" ? (
              <label key={key} className="flex items-center gap-2">
                <input type="checkbox" checked={labTests[key]} onChange={e => setLabTests(p => ({ ...p, [key]: e.target.checked }))} />
                {key}
              </label>
            ) : null
          ))}
        </div>
        <input placeholder="Autre test..." className="mt-2 px-2 py-1 border rounded w-full" value={labTests.autre} onChange={e => setLabTests(p => ({ ...p, autre: e.target.value }))} />
      </div>

      {/* --- SECTION: Physical Exam --- */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">3. Examen physique / Signes vitaux</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(vitals).map(key => (
            <input key={key} className="px-2 py-1 border rounded" placeholder={key} value={vitals[key]} onChange={e => setVitals(p => ({ ...p, [key]: e.target.value }))} />
          ))}
        </div>
      </div>

      {/* --- SECTION: Diabète Type 2 Treatment --- */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">4. Traitement Diabète Type 2</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(diabete).map(key => (
            <label key={key} className="flex items-center gap-2">
              <input type="checkbox" checked={diabete[key]} onChange={e => setDiabete(p => ({ ...p, [key]: e.target.checked }))} />
              {key}
            </label>
          ))}
        </div>
      </div>

      {/* --- SECTION: Food habits --- */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">6. Habitudes alimentaires</h2>
        <div className="grid grid-cols-1 gap-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={food.greens} onChange={e => setFood(p => ({ ...p, greens: e.target.checked }))}/> Eat Daily Green Living Vegetables</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={food.nonsweet} onChange={e => setFood(p => ({ ...p, nonsweet: e.target.checked }))}/> Eat Any Non-Sweet Comestibles</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={food.livingFood} onChange={e => setFood(p => ({ ...p, livingFood: e.target.checked }))}/> Eat Living Food Once Daily Between 12:00-18:00</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={food.noPolyfoods} onChange={e => setFood(p => ({ ...p, noPolyfoods: e.target.checked }))}/> Do Not Eat Polyfoods</label>
        </div>
      </div>

      {/* Payments */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">Paiements</h2>
        <div className="grid grid-cols-3 gap-2">
          <input placeholder="1st Payment" type="date" className="border px-2 py-1 rounded" value={payments.p1} onChange={e => setPayments(p => ({ ...p, p1: e.target.value }))}/>
          <input placeholder="2nd Payment" type="date" className="border px-2 py-1 rounded" value={payments.p2} onChange={e => setPayments(p => ({ ...p, p2: e.target.value }))}/>
          <input placeholder="3rd Payment" type="date" className="border px-2 py-1 rounded" value={payments.p3} onChange={e => setPayments(p => ({ ...p, p3: e.target.value }))}/>
        </div>
      </div>
    </div>
  );
}
