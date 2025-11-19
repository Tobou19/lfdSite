import React, { useState } from "react";
import { Pencil, Trash2, Plus, Video, Eye, EyeOff, FileText, X } from "lucide-react";

export default function ServicesPage() {
  const [tab, setTab] = useState("services");

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestion de services</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {["services", "therapy", "articles"].map((t) => (
          <button
            key={t}
            className={`px-4 py-1 rounded-md ${
              tab === t ? "bg-violet-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab(t)}
          >
            {t === "services"
              ? "Services"
              : t === "therapy"
              ? "Psychothérapie vidéo"
              : "Articles"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "services" && <ServicesTab />}
      {tab === "therapy" && <TherapyTab />}
      {tab === "articles" && <ArticlesTab />}
    </div>
  );
}

/* -----------------------------
        SERVICES
------------------------------ */
function ServicesTab() {
  const [services, setServices] = useState([
    {
      id: 1,
      price: "120€",
      duration: "90 min",
      title: "Consultation Nutritionnelle",
      desc: "Bilan personnalisé.",
      includes: ["Bilan complet", "Plan personnalisé", "Suivi"],
      active: true,
    },
  ]);

  const [form, setForm] = useState(null); // null ou objet pour edit
  const toggleActive = (id) =>
    setServices(services.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  const removeService = (id) => setServices(services.filter((s) => s.id !== id));

  const openForm = (service = null) => setForm(service ?? { title: "", price: "", duration: "", desc: "", includes: [""] });
  const closeForm = () => setForm(null);

  const saveService = (e) => {
    e.preventDefault();
    if (form.id) {
      // update
      setServices(services.map((s) => (s.id === form.id ? form : s)));
    } else {
      // create
      setServices([...services, { ...form, id: Date.now(), active: true }]);
    }
    closeForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-700">Tous les services</h2>
        <button
          className="flex items-center gap-1 bg-violet-600 text-white px-3 py-1 rounded-md"
          onClick={() => openForm()}
        >
          <Plus className="w-4 h-4" /> Ajouter un service
        </button>
      </div>

      {form && (
        <form
          onSubmit={saveService}
          className="bg-gray-50 p-4 mb-4 rounded-md border flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700">{form.id ? "Modifier Service" : "Nouveau Service"}</h3>
            <button type="button" onClick={closeForm}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <input
            placeholder="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Prix"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Durée"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="border p-2 rounded"
          />
          <div>
            <label className="font-semibold">Inclus:</label>
            {form.includes.map((inc, idx) => (
              <div key={idx} className="flex gap-2 mb-1">
                <input
                  value={inc}
                  onChange={(e) => {
                    const arr = [...form.includes];
                    arr[idx] = e.target.value;
                    setForm({ ...form, includes: arr });
                  }}
                  className="border p-1 rounded flex-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    const arr = form.includes.filter((_, i) => i !== idx);
                    setForm({ ...form, includes: arr });
                  }}
                  className="bg-red-100 px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm({ ...form, includes: [...form.includes, ""] })}
              className="bg-green-100 px-2 rounded mt-1"
            >
              Ajouter inclus
            </button>
          </div>
          <button type="submit" className="bg-violet-600 text-white px-4 py-1 rounded mt-2">
            {form.id ? "Sauvegarder" : "Créer"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} toggleActive={toggleActive} removeService={removeService} openForm={openForm} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service, toggleActive, removeService, openForm }) {
  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold">{service.price}</h1>
      <p className="text-sm text-gray-500">{service.duration}</p>
      <h2 className="font-semibold">{service.title}</h2>
      <p className="text-sm text-gray-400">{service.desc}</p>
      <div className="flex flex-col gap-1 mt-2">
        <h3 className="text-sm font-bold">Inclus :</h3>
        {service.includes.map((i, idx) => (
          <span key={idx} className="text-xs text-gray-500">
            • {i}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        <button
          className="px-2 py-1 rounded bg-blue-100 text-blue-600 flex items-center gap-1"
          onClick={() => openForm(service)}
        >
          <Pencil className="w-3 h-3" />Modifier
        </button>
        <button
          onClick={() => toggleActive(service.id)}
          className={`px-2 py-1 rounded flex items-center gap-1 ${
            service.active ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
          }`}
        >
          {service.active ? (
            <>
              <EyeOff className="w-3 h-3" />Désactiver
            </>
          ) : (
            <>
              <Eye className="w-3 h-3" />Activer
            </>
          )}
        </button>
        <button
          onClick={() => removeService(service.id)}
          className="px-2 py-1 rounded bg-red-100 text-red-600 flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" />Supprimer
        </button>
      </div>
    </div>
  );
}

/* -----------------------------
        THÉRAPIE VIDÉO
------------------------------ */
function TherapyTab() {
  const [therapy, setTherapy] = useState([
    {
      id: 1,
      title: "Séance individuelle",
      duration: "60 min",
      price: "80€",
      desc: "Séance vidéo préenregistrée.",
      file: null,
      active: true,
    },
  ]);

  const [form, setForm] = useState(null);
  const toggleActive = (id) => setTherapy(therapy.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
  const removeTherapy = (id) => setTherapy(therapy.filter((t) => t.id !== id));
  const openForm = (t = null) =>
    setForm(t ?? { title: "", price: "", duration: "", desc: "", file: null });
  const closeForm = () => setForm(null);

  const saveTherapy = (e) => {
    e.preventDefault();
    if (form.id) {
      setTherapy(therapy.map((t) => (t.id === form.id ? form : t)));
    } else {
      setTherapy([...therapy, { ...form, id: Date.now(), active: true }]);
    }
    closeForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-700">Psychothérapie vidéo</h2>
        <button
          className="flex items-center gap-1 bg-violet-600 text-white px-3 py-1 rounded-md"
          onClick={() => openForm()}
        >
          <Plus className="w-4 h-4" /> Ajouter une séance
        </button>
      </div>

      {form && (
        <form
          onSubmit={saveTherapy}
          className="bg-gray-50 p-4 mb-4 rounded-md border flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700">{form.id ? "Modifier Séance" : "Nouvelle Séance"}</h3>
            <button type="button" onClick={closeForm}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <input
            placeholder="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Prix"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Durée"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          />
          <button type="submit" className="bg-violet-600 text-white px-4 py-1 rounded mt-2">
            {form.id ? "Sauvegarder" : "Créer"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {therapy.map((t) => (
          <div key={t.id} className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
            <h2 className="font-bold text-lg">{t.title}</h2>
            <p className="text-sm text-gray-500">
              {t.duration} — {t.price}
            </p>
            <p className="text-sm text-gray-400">{t.desc}</p>
            {t.file && (
              <div className="mt-2">
                <Video className="w-4 h-4 inline" />{" "}
                <span>{t.file.name}</span>
              </div>
            )}
            <div className="flex justify-between mt-3">
              <button className="px-2 py-1 rounded bg-blue-100 text-blue-600 flex items-center gap-1" onClick={() => openForm(t)}>
                <Pencil className="w-3 h-3" />Modifier
              </button>
              <button
                onClick={() => toggleActive(t.id)}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  t.active ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                }`}
              >
                {t.active ? (
                  <>
                    <EyeOff className="w-3 h-3" />Désactiver
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />Activer
                  </>
                )}
              </button>
              <button
                onClick={() => removeTherapy(t.id)}
                className="px-2 py-1 rounded bg-red-100 text-red-600 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------
        ARTICLES
------------------------------ */
function ArticlesTab() {
  const [articles, setArticles] = useState([
    { id: 1, title: "Bienfaits de la nutrition", img: "https://picsum.photos/300/200", excerpt: "Alimentation saine et mental.", active: true },
  ]);

  const [form, setForm] = useState(null);
  const toggleActive = (id) => setArticles(articles.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  const removeArticle = (id) => setArticles(articles.filter((a) => a.id !== id));
  const openForm = (a = null) => setForm(a ?? { title: "", img: "", excerpt: "" });
  const closeForm = () => setForm(null);
  const saveArticle = (e) => {
    e.preventDefault();
    if (form.id) {
      setArticles(articles.map((a) => (a.id === form.id ? form : a)));
    } else {
      setArticles([...articles, { ...form, id: Date.now(), active: true }]);
    }
    closeForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-700">Articles publiés</h2>
        <button
          className="flex items-center gap-1 bg-violet-600 text-white px-3 py-1 rounded-md"
          onClick={() => openForm()}
        >
          <Plus className="w-4 h-4" /> Publier un article
        </button>
      </div>

      {form && (
        <form
          onSubmit={saveArticle}
          className="bg-gray-50 p-4 mb-4 rounded-md border flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700">{form.id ? "Modifier Article" : "Nouvel Article"}</h3>
            <button type="button" onClick={closeForm}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <input
            placeholder="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Image URL"
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Extrait"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-violet-600 text-white px-4 py-1 rounded mt-2">
            {form.id ? "Sauvegarder" : "Créer"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((a) => (
          <div key={a.id} className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
            <img src={a.img} className="rounded-md h-32 w-full object-cover" />
            <h2 className="font-semibold">{a.title}</h2>
            <p className="text-sm text-gray-500">{a.excerpt}</p>
            <div className="flex justify-between mt-3">
              <button className="px-2 py-1 rounded bg-blue-100 text-blue-600 flex items-center gap-1" onClick={() => openForm(a)}>
                <Pencil className="w-3 h-3" />Modifier
              </button>
              <button
                onClick={() => toggleActive(a.id)}
                className={`px-2 py-1 rounded flex items-center gap-1 ${a.active ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
              >
                {a.active ? <><EyeOff className="w-3 h-3" />Désactiver</> : <><Eye className="w-3 h-3" />Activer</>}
              </button>
              <button
                onClick={() => removeArticle(a.id)}
                className="px-2 py-1 rounded bg-red-100 text-red-600 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
