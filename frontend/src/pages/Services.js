import React from "react";
import { ClipboardList, Droplets, Leaf, UserCheck, Clock, Euro, CheckCircle } from "lucide-react";
import { mockData } from "../data/mockData";

const Services = () => {
  const serviceIcons = {
    'clipboard-list': ClipboardList,
    'droplets': Droplets,
    'leaf': Leaf,
    'user-check': UserCheck
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="display-medium">Nos Services Thérapeutiques</h1>
          <p className="body-large">
            Une approche personnalisée pour traiter vos maladies chroniques naturellement
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {mockData.services.map((service) => {
              const IconComponent = serviceIcons[service.icon] || ClipboardList;
              return (
                <div key={service.id} className="service-card-detailed">
                  <div className="service-header">
                    <div className="service-icon-wrapper">
                      <IconComponent size={40} className="service-icon" />
                    </div>
                    <div className="service-meta">
                      <div className="service-price">
                        <Euro size={16} />
                        <span>{service.price}</span>
                      </div>
                      <div className="service-duration">
                        <Clock size={16} />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="heading-2">{service.title}</h3>
                  <p className="body-large service-description">{service.description}</p>
                  
                  <div className="service-details">
                    <h4 className="heading-3">Ce qui est inclus :</h4>
                    <ul className="service-inclusions">
                      <li>
                        <CheckCircle size={16} />
                        <span>Bilan complet personnalisé</span>
                      </li>
                      <li>
                        <CheckCircle size={16} />
                        <span>Plan d'action sur mesure</span>
                      </li>
                      <li>
                        <CheckCircle size={16} />
                        <span>Suivi et ajustements</span>
                      </li>
                      <li>
                        <CheckCircle size={16} />
                        <span>Documentation complète</span>
                      </li>
                    </ul>
                  </div>
                  
                  <button className="btn-primary service-cta">
                    Réserver ce service
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Notre Processus en 4 Étapes</h2>
            <p className="body-large">
              Une approche méthodique pour des résultats durables
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3 className="heading-3">Évaluation Complète</h3>
                <p className="body-medium">
                  Analyse approfondie de votre état de santé, historique médical et habitudes alimentaires actuelles.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3 className="heading-3">Plan Personnalisé</h3>
                <p className="body-medium">
                  Création d'un protocole sur mesure incluant alimentation, supplémentation et mode de vie.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3 className="heading-3">Mise en Œuvre</h3>
                <p className="body-medium">
                  Accompagnement étape par étape dans l'application de votre nouveau protocole de santé.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3 className="heading-3">Suivi & Ajustements</h3>
                <p className="body-medium">
                  Évaluation régulière des résultats et ajustements du protocole selon vos progrès.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Treated */}
      <section className="conditions-section">
        <div className="container">
          <div className="conditions-content">
            <div className="conditions-text">
              <h2 className="heading-1">Pathologies Traitées</h2>
              <p className="body-large">
                Notre approche naturelle a fait ses preuves sur de nombreuses maladies chroniques
              </p>
              
              <div className="conditions-grid">
                <div className="condition-category">
                  <h4 className="heading-3">Troubles Métaboliques</h4>
                  <ul className="condition-list">
                    <li>Diabète type 2</li>
                    <li>Syndrome métabolique</li>
                    <li>Résistance à l'insuline</li>
                    <li>Obésité</li>
                  </ul>
                </div>
                
                <div className="condition-category">
                  <h4 className="heading-3">Maladies Cardiovasculaires</h4>
                  <ul className="condition-list">
                    <li>Hypertension artérielle</li>
                    <li>Hypercholestérolémie</li>
                    <li>Troubles du rythme</li>
                    <li>Insuffisance cardiaque légère</li>
                  </ul>
                </div>
                
                <div className="condition-category">
                  <h4 className="heading-3">Troubles Digestifs</h4>
                  <ul className="condition-list">
                    <li>Syndrome de l'intestin irritable</li>
                    <li>Maladie de Crohn</li>
                    <li>Reflux gastro-œsophagien</li>
                    <li>Dysbiose intestinale</li>
                  </ul>
                </div>
                
                <div className="condition-category">
                  <h4 className="heading-3">Inflammations Chroniques</h4>
                  <ul className="condition-list">
                    <li>Arthrite rhumatoïde</li>
                    <li>Fibromyalgie</li>
                    <li>Fatigue chronique</li>
                    <li>Maladies auto-immunes</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="success-stats">
              <div className="stat-box">
                <div className="stat-number">85%</div>
                <div className="stat-label">Amélioration des biomarqueurs</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">92%</div>
                <div className="stat-label">Satisfaction bénéficiaires</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">78%</div>
                <div className="stat-label">Réduction médicaments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-page {
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

        .services-section {
          padding: var(--spacing-giant) 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-large);
        }

        .service-card-detailed {
          background: var(--bg-card);
          border-radius: 32px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 69, 52, 0.25);
          transition: transform 0.3s ease;
          border: 2px solid transparent;
        }

        .service-card-detailed:hover {
          transform: translateY(-6px);
          border-color: var(--brand-primary);
        }

        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-medium);
        }

        .service-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-icon {
          color: var(--brand-primary);
        }

        .service-meta {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .service-price,
        .service-duration {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.9rem;
        }

        .service-price {
          color: var(--brand-dark);
          font-weight: 600;
        }

        .service-duration {
          color: var(--text-secondary);
        }

        .service-card-detailed h3 {
          margin-bottom: var(--spacing-medium);
        }

        .service-description {
          margin-bottom: var(--spacing-large);
          color: var(--text-secondary);
        }

        .service-details h4 {
          margin-bottom: var(--spacing-medium);
          color: var(--brand-primary);
        }

        .service-inclusions {
          list-style: none;
          margin-bottom: var(--spacing-large);
        }

        .service-inclusions li {
          display: flex;
          align-items: center;
          gap: var(--spacing-small);
          margin-bottom: var(--spacing-small);
          color: var(--text-secondary);
        }

        .service-inclusions li svg {
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        .service-cta {
          width: 100%;
        }

        .process-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-section);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-giant);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-header h2 {
          margin-bottom: var(--spacing-medium);
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-large);
        }

        .process-step {
          display: flex;
          gap: var(--spacing-medium);
        }

        .step-number {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--brand-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.125rem;
          font-weight: 700;
        }

        .step-content h3 {
          margin-bottom: var(--spacing-small);
        }

        .conditions-section {
          padding: var(--spacing-giant) 0;
        }

        .conditions-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-giant);
          align-items: start;
        }

        .conditions-text h2 {
          margin-bottom: var(--spacing-medium);
        }

        .conditions-text .body-large {
          margin-bottom: var(--spacing-large);
        }

        .conditions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-large);
        }

        .condition-category h4 {
          margin-bottom: var(--spacing-medium);
          color: var(--brand-primary);
        }

        .condition-list {
          list-style: none;
        }

        .condition-list li {
          padding: var(--spacing-xs) 0;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-light);
        }

        .condition-list li:last-child {
          border-bottom: none;
        }

        .success-stats {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-medium);
        }

        .stat-box {
          background: var(--bg-card);
          padding: var(--spacing-large);
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .stat-number {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
          margin-bottom: var(--spacing-small);
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @media (max-width: 781px) {
          .services-page {
            padding-top: 80px;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .process-steps {
            grid-template-columns: 1fr;
          }
          
          .conditions-content {
            grid-template-columns: 1fr;
          }
          
          .conditions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;