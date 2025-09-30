import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar } from "lucide-react";
import { mockData } from "../data/mockData";
import axios from "axios";


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'consultation',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
    
      setMessage(res.data.message || "Votre message a été envoyé ✅");
      setError(false);
      setIsSubmitted(true); 
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Erreur de données ❌");
        setError(true);
      } else {
        setMessage("Le serveur ne répond pas. Veuillez réessayer plus tard.");
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="display-medium">Contactez-Nous</h1>
          <p className="body-large">
            Prenez le premier pas vers votre transformation santé. Notre équipe est là pour vous accompagner.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      
      {error == true ? (message && (
        <div className="text-center mt-4 text-sm text-red-500">{message}</div>
      )) : (message && (
        <div className="text-center mt-4 text-sm text-green-500">{message}</div>
      ))}

      {isLoading ? (
        <div className="flex justify-center items-center" style={{ height: "100vh" }}>
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      ) : (
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="form-header">
                <h2 className="heading-1">Prendre Rendez-vous</h2>
                <p className="body-medium">
                  Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">Prénom *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Nom *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Type de consultation *</label>
                  <select
                    id="subject"
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="consultation">Consultation nutritionnelle</option>
                    <option value="jus">Protocole de jus thérapeutiques</option>
                    <option value="alimentation">Formation alimentation vivante</option>
                    <option value="suivi">Suivi personnalisé</option>
                    <option value="other">Autre demande</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredDate" className="form-label">Date souhaitée</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      className="form-input"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="preferredTime" className="form-label">Horaire préféré</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      className="form-select"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                    >
                      <option value="">Sélectionner un créneau</option>
                      <option value="morning">Matin (9h-12h)</option>
                      <option value="afternoon">Après-midi (14h-17h)</option>
                      <option value="evening">Fin de journée (17h-18h)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Décrivez brièvement votre situation ou vos questions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Parlez-nous de votre état de santé actuel, vos objectifs, ou toute question que vous pourriez avoir..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-cta form-submit" disabled={isSubmitted}>
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message envoyé !
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Envoyer ma demande
                    </>
                  )}
                </button>

                <p className="form-disclaimer body-small">
                  * Champs obligatoires. Vos données sont traitées de manière confidentielle 
                  et ne seront jamais partagées avec des tiers.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <div className="contact-info-card">
                <h3 className="heading-2">Nos Coordonnées</h3>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <MapPin size={24} />
                    </div>
                    <div className="contact-content">
                      <h4 className="heading-3">Adresse</h4>
                      <p className="body-medium">{mockData.contact.address}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <Phone size={24} />
                    </div>
                    <div className="contact-content">
                      <h4 className="heading-3">Téléphone</h4>
                      <p className="body-medium">{mockData.contact.phone}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <Mail size={24} />
                    </div>
                    <div className="contact-content">
                      <h4 className="heading-3">Email</h4>
                      <p className="body-medium">{mockData.contact.email}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <Clock size={24} />
                    </div>
                    <div className="contact-content">
                      <h4 className="heading-3">Horaires</h4>
                      <p className="body-medium">{mockData.contact.hours.weekdays}</p>
                      <p className="body-medium">{mockData.contact.hours.saturday}</p>
                      <p className="body-small">{mockData.contact.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="appointment-info">
                <div className="info-header">
                  <Calendar size={32} />
                  <h3 className="heading-3">Informations Pratiques</h3>
                </div>
                
                <div className="info-list">
                  <div className="info-item">
                    <h4 className="body-medium">Première consultation</h4>
                    <p className="body-small">Durée: 90 minutes | Tarif: 120€</p>
                  </div>
                  <div className="info-item">
                    <h4 className="body-medium">Consultations de suivi</h4>
                    <p className="body-small">Durée: 60 minutes | Tarif: 85€</p>
                  </div>
                  <div className="info-item">
                    <h4 className="body-medium">Téléconsultations</h4>
                    <p className="body-small">Disponibles sur demande</p>
                  </div>
                  <div className="info-item">
                    <h4 className="body-medium">Annulation</h4>
                    <p className="body-small">48h avant le rendez-vous</p>
                  </div>
                </div>

                <div className="emergency-contact">
                  <h4 className="heading-3">Urgences</h4>
                  <p className="body-small">
                    Pour les urgences médicales, contactez immédiatement votre médecin traitant 
                    ou les services d'urgence (15 ou 112).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}


      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-wrapper">
            <div className="map-placeholder">
              <div className="map-content">
                <MapPin size={48} className="map-icon" />
                <h3 className="heading-3">Centre (LFD)-Services</h3>
                <p className="body-medium">{mockData.contact.address}</p>
                <div className="map-actions">
                  <button className="btn-secondary">Voir sur Google Maps</button>
                  <button className="btn-secondary">Calculer l'itinéraire</button>
                </div>
              </div>
            </div>
            
            <div className="access-info">
              <h3 className="heading-2">Accès & Transport</h3>
              <div className="transport-options">
                <div className="transport-item">
                  <h4 className="heading-3">🚇 Métro</h4>
                  <p className="body-medium">
                    Ligne 6 - Station Place d'Italie<br/>
                    5 minutes à pied du centre
                  </p>
                </div>
                <div className="transport-item">
                  <h4 className="heading-3">🚌 Bus</h4>
                  <p className="body-medium">
                    Lignes 27, 47, 83<br/>
                    Arrêt Tolbiac-Baudricourt
                  </p>
                </div>
                <div className="transport-item">
                  <h4 className="heading-3">🚗 Voiture</h4>
                  <p className="body-medium">
                    Parking payant disponible<br/>
                    Rue de la Santé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
          padding-top: 120px;
        }

        .page-hero {
          padding: var(--spacing-giant) 0;
          background: var(--bg-page);
          text-align: center;
        }

        .page-hero h1 {
          margin-bottom: var(--spacing-medium);
        }

        .contact-section {
          padding: var(--spacing-giant) 0;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-giant);
        }

        .contact-form-wrapper {
          background: var(--bg-card);
          border-radius: 24px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          margin-bottom: var(--spacing-large);
        }

        .form-header h2 {
          margin-bottom: var(--spacing-medium);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-medium);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-medium);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
          color: var(--text-primary);
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 14px 16px;
          border: 2px solid var(--border-medium);
          border-radius: 12px;
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          background: var(--bg-page);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(144, 178, 0, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-submit {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          justify-content: center;
          margin-top: var(--spacing-medium);
        }

        .form-submit:disabled {
          background: var(--brand-primary);
          opacity: 0.8;
        }

        .form-disclaimer {
          color: var(--text-light);
          text-align: center;
          margin-top: var(--spacing-small);
        }

        .contact-info-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-large);
        }

        .contact-info-card {
          background: var(--bg-card);
          border-radius: 24px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .contact-info-card h3 {
          margin-bottom: var(--spacing-large);
          text-align: center;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-large);
        }

        .contact-item {
          display: flex;
          gap: var(--spacing-medium);
          align-items: flex-start;
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-icon svg {
          color: var(--brand-primary);
        }

        .contact-content h4 {
          margin-bottom: var(--spacing-xs);
          color: var(--brand-primary);
        }

        .appointment-info {
          background: var(--bg-subtle);
          border-radius: 24px;
          padding: var(--spacing-large);
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-large);
        }

        .info-header svg {
          color: var(--brand-primary);
        }

        .info-list {
          margin-bottom: var(--spacing-large);
        }

        .info-item {
          margin-bottom: var(--spacing-medium);
          padding-bottom: var(--spacing-medium);
          border-bottom: 1px solid var(--border-light);
        }

        .info-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .info-item h4 {
          margin-bottom: var(--spacing-xs);
          color: var(--brand-dark);
        }

        .emergency-contact {
          padding: var(--spacing-medium);
          background: var(--bg-card);
          border-radius: 16px;
          border: 1px solid var(--border-light);
        }

        .emergency-contact h4 {
          margin-bottom: var(--spacing-small);
          color: #dc2626;
        }

        .map-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-section);
        }

        .map-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-large);
        }

        .map-placeholder {
          background: var(--bg-card);
          border-radius: 24px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .map-content {
          text-align: center;
        }

        .map-icon {
          color: var(--brand-primary);
          margin-bottom: var(--spacing-medium);
        }

        .map-content h3 {
          margin-bottom: var(--spacing-small);
        }

        .map-content p {
          margin-bottom: var(--spacing-large);
        }

        .map-actions {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-small);
        }

        .access-info {
          background: var(--bg-card);
          border-radius: 24px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .access-info h3 {
          margin-bottom: var(--spacing-large);
        }

        .transport-options {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-large);
        }

        .transport-item h4 {
          margin-bottom: var(--spacing-small);
          color: var(--brand-primary);
        }

        @media (max-width: 781px) {
          .contact-page {
            padding-top: 80px;
          }
          
          .contact-content {
            grid-template-columns: 1fr;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .map-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;