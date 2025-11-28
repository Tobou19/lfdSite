import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Video, Eye, EyeOff, FileText, X } from "lucide-react";

import {
  RectangleStackIcon,
  UserIcon,
  UserGroupIcon,
  TrophyIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/solid";

export default function ServicesPage() {
  const [tab, setTab] = useState("services");

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestion de services</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {["services", "therapy", "articles", "reservations", "produits"].map((t) => (
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
              : t === "articles"
              ? "Articles"
              : t === "produits"
              ? "Produits"
              : "Réservations"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "services" && <ServicesTab />}
      {tab === "therapy" && <TherapyTab />}
      {tab === "articles" && <ArticlesTab />}
      {tab === "reservations" && <ReservationsTable />}
      {tab === "produits" && <ProduitsTab />}
    </div>
  );
}



/* -----------------------------
        PRODUITS
------------------------------ */
function ProduitsTab() {
  const [form, setForm] = useState(null);
  const products = [
    {
      id: 1,
      name: "Superfood Mix Détox",
      description: "Mélange 100% naturel – spiruline, moringa, gingembre et curcuma.",
      price: 8500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NsS0nlgjgOUMCHXF1VuerX09oE9fKvCCXg&s",
      status: "confirmed"
    },
    {
      id: 2,
      name: "Thé Minceur Métabolique",
      description: "Accélère la combustion, régule l'appétit & réduit la rétention d’eau.",
      price: 6500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkOlyZyrSDD8ZzWSkXcF3q3OLMaYYGc8SYw&s",
      status: "confirmed"
    },
    {
      id: 3,
      name: "Huile de Nigelle Premium",
      description: "Anti-inflammatoire puissant – excellente pour le diabète & l’immunité.",
      price: 9500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju8v1p1_krQqji7uh3IWrTQdFjC7FxgZUgA&s",
      status: "confirmed"
    },
    {
      id: 4,
      name: "Superfood Mix Détox",
      description: "Mélange 100% naturel – spiruline, moringa, gingembre et curcuma.",
      price: 8500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NsS0nlgjgOUMCHXF1VuerX09oE9fKvCCXg&s",
      status: "confirmed"
    },
    {
      id: 5,
      name: "Thé Minceur Métabolique",
      description: "Accélère la combustion, régule l'appétit & réduit la rétention d’eau.",
      price: 6500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkOlyZyrSDD8ZzWSkXcF3q3OLMaYYGc8SYw&s",
      status: "confirmed"
    },
    {
      id: 6,
      name: "Huile de Nigelle Premium",
      description: "Anti-inflammatoire puissant – excellente pour le diabète & l’immunité.",
      price: 9500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju8v1p1_krQqji7uh3IWrTQdFjC7FxgZUgA&s",
      status: "confirmed"
    }
  ];

  const openForm = () => {
    setForm({
      title: "",
      price: "",
      duration: "",
      desc: "",
      includes: [""],
      type: "Standard", 
    })
  }
  return <div>
    {/* Header */}
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-lg font-bold text-gray-700">Tous les produits</h2>
      <button
        className="flex items-center gap-1 bg-violet-600 text-white px-3 py-1 rounded-md"
        onClick={() => openForm()}
      >
        <Plus className="w-4 h-4" /> Ajouter un produit
      </button>
    </div>

    <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <UserIcon className="size-6"/>Nom
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <ClipboardDocumentCheckIcon className="size-6"/>Service
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2 text-sm text-gray-700">{p.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{p.service}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{p.price}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{p.description}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : p.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-right flex justify-end gap-2">
                  <button className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    Voir
                  </button>
                  <button className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center text-gray-400 p-4">Aucun produit trouvée</p>
        )}
      </div>
  </div>;
}

/* -----------------------------
        SERVICES
------------------------------ */
function ServicesTab() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(null);

  // -- 1. Charger services depuis backend --
  const loadServices = async () => {
    const res = await fetch("http://localhost:5000/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

const openForm = (service = null) =>
  setForm(
    service ?? {
      title: "",
      price: "",
      duration: "",
      desc: "",
      includes: [""],
      type: "Standard", 
    }
  );


  const closeForm = () => setForm(null);

  // -- 3. Sauvegarder service (edit + create) --
  const saveService = async (e) => {
    e.preventDefault();

    const body = {
      title: form.title,
      price: form.price,
      duration: form.duration,
      desc: form.desc,
      includes: form.includes,
      active: form.active ?? true,
    };

    if (form.id) {
      // update
      await fetch(`http://localhost:5000/services/update/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      // create
      await fetch("http://localhost:5000/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    closeForm();
    loadServices();
  };

  // -- 4. Toggle active --
  const toggleActive = async (id) => {
    await fetch(`http://localhost:5000/services/toggle/${id}`, {
      method: "PATCH",
    });
    loadServices();
  };

  // -- 5. Supprimer --
  const removeService = async (id) => {
    await fetch(`http://localhost:5000/services/delete/${id}`, {
      method: "DELETE",
    });
    loadServices();
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-700">Tous les services</h2>
        <button
          className="flex items-center gap-1 bg-violet-600 text-white px-3 py-1 rounded-md"
          onClick={() => openForm()}
        >
          <Plus className="w-4 h-4" /> Ajouter un service
        </button>
      </div>

      {/* Formulaire */}
      {form && (
        <form
          onSubmit={saveService}
          className="bg-gray-50 p-4 mb-4 rounded-md border flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700">
              {form.id ? "Modifier Service" : "Nouveau Service"}
            </h3>
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
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
          </select>

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

          {/* includes */}
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
              onClick={() =>
                setForm({ ...form, includes: [...form.includes, ""] })
              }
              className="bg-green-100 px-2 rounded mt-1"
            >
              Ajouter inclus
            </button>
          </div>

          <button
            type="submit"
            className="bg-violet-600 text-white px-4 py-1 rounded mt-2"
          >
            {form.id ? "Sauvegarder" : "Créer"}
          </button>
        </form>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            toggleActive={toggleActive}
            removeService={removeService}
            openForm={openForm}
          />
        ))}
      </div>
    </div>
  );
}


function ServiceCard({ service, toggleActive, removeService, openForm }) {
  // Fonction de suppression avec confirmation
  const handleDelete = () => {
    if (window.confirm(`Voulez-vous vraiment supprimer "${service.title}" ?`)) {
      removeService(service.id);
    }
  };

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

      {/* Boutons d'action réduits */}
      <div className="flex justify-between mt-3 text-xs gap-1">
        <button
          className="px-2 py-0.5 rounded bg-blue-100 text-blue-600 flex items-center gap-1"
          onClick={() => openForm(service)}
        >
          <Pencil className="w-3 h-3" />Modifier
        </button>

        <button
          onClick={() => toggleActive(service.id)}
          className={`px-2 py-0.5 rounded flex items-center gap-1 ${
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
          onClick={handleDelete}
          className="px-2 py-0.5 rounded bg-red-100 text-red-600 flex items-center gap-1"
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
        RÉSERVATIONS
------------------------------ */
function ReservationsTable() {
  const [reservations, setReservations] = useState([]);

  // Charger les réservations depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error("Erreur fetch reservations:", err));
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Réservations récentes</h2>
      <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <UserIcon className="size-6"/>Nom
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <ClipboardDocumentCheckIcon className="size-6"/>Service
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2 text-sm text-gray-700">{r.clientName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{r.serviceTitle}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{r.phone}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{new Date(r.date).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      r.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : r.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-right flex justify-end gap-2">
                  <button className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    Voir
                  </button>
                  <button className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reservations.length === 0 && (
          <p className="text-center text-gray-400 p-4">Aucune réservation trouvée</p>
        )}
      </div>
    </div>
  );
}


/* -----------------------------
        ARTICLES
------------------------------ */
function ArticlesTab() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState(null);

  // Charger articles depuis backend
  const loadArticles = async () => {
    try {
      const res = await fetch("http://localhost:5000/articles");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Erreur fetch articles:", err);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openForm = (a = null) =>
    setForm(
      a ?? {
        title: "",
        subtitle: "",
        content: "",
        author: "",
        published_date: "",
        read_time: "",
        tags: [],
        image: "",
      }
    );
  
  const closeForm = () => setForm(null);
  

  const saveArticle = async (e) => {
    e.preventDefault();
  
    const body = {
      title: form.title,
      subtitle: form.subtitle,
      content: form.content,
      author: form.author,
      published_date: form.published_date,
      read_time: form.read_time,
      tags: form.tags,
      image: form.image,
    };
  
    try {
      if (form.id) {
        // Modifier article existant
        await fetch(`http://localhost:5000/articles/update/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        // Créer nouvel article
        await fetch("http://localhost:5000/articles/create/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      closeForm();
      loadArticles();
    } catch (err) {
      console.error("Erreur sauvegarde article:", err);
    }
  };
  

  const toggleActive = async (id) => {
    try {
      await fetch(`http://localhost:5000/articles/toggle/${id}`, { method: "PATCH" });
      loadArticles();
    } catch (err) {
      console.error(err);
    }
  };
  
  const removeArticle = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await fetch(`http://localhost:5000/articles/delete/${id}`, { method: "DELETE" });
      loadArticles();
    } catch (err) {
      console.error(err);
    }
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
  <form onSubmit={saveArticle} className="bg-gray-50 p-4 mb-4 rounded-md border flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-gray-700">{form.id ? "Modifier Article" : "Nouvel Article"}</h3>
      <button type="button" onClick={closeForm}><X className="w-5 h-5 text-gray-600" /></button>
    </div>

    <input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border p-2 rounded" />
    <input placeholder="Sous-titre" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="border p-2 rounded" />
    <textarea placeholder="Contenu" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="border p-2 rounded" />
    <input placeholder="Auteur" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="border p-2 rounded" />
    <input type="date" placeholder="Date de publication" value={form.published_date} onChange={(e) => setForm({ ...form, published_date: e.target.value })} className="border p-2 rounded" />
    <input placeholder="Temps de lecture" value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="border p-2 rounded" />
    <input placeholder="Tags (séparés par des virgules)" value={form.tags.join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map(t => t.trim()) })} className="border p-2 rounded" />
    <input placeholder="URL ou nom de l'image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border p-2 rounded" />

    <button type="submit" className="bg-violet-600 text-white px-4 py-1 rounded mt-2">
      {form.id ? "Sauvegarder" : "Créer"}
    </button>
  </form>
)}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {articles.map((a) => (
    <div key={a.id} className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
      <img src={a.image} alt={a.title} className="rounded-md h-32 w-full object-cover" />
      <h2 className="font-semibold">{a.title}</h2>
      <h3 className="text-sm text-gray-500">{a.subtitle}</h3>
      <p className="text-xs text-gray-400">{a.author} • {new Date(a.published_date).toLocaleDateString()} • {a.read_time}</p>
      <p className="text-sm text-gray-500">{a.content.substring(0, 100)}...</p>
      <div className="flex justify-between mt-3">
        <button onClick={() => openForm(a)} className="px-2 py-1 rounded bg-blue-100 text-blue-600 flex items-center gap-1"><Pencil className="w-3 h-3" />Modifier</button>
        <button onClick={() => toggleActive(a.id)} className={`px-2 py-1 rounded flex items-center gap-1 ${a.active ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
          {a.active ? <><EyeOff className="w-3 h-3" />Désactiver</> : <><Eye className="w-3 h-3" />Activer</>}
        </button>
        <button onClick={() => removeArticle(a.id)} className="px-2 py-1 rounded bg-red-100 text-red-600 flex items-center gap-1"><Trash2 className="w-3 h-3" />Supprimer</button>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
