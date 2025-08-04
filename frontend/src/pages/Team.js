import React from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { mockData } from "../data/mockData";

const Team = () => {
  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="display-medium">Notre Équipe d'Experts</h1>
          <p className="body-large">
            Une équipe multidisciplinaire unie par la même passion : votre santé naturelle
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-section">
        <div className="container">
          <div className="team-grid">
            {mockData.team.map((member) => (
              <div key={member.id} className="team-card-detailed">
                <div className="team-card-header">
                  <div className="team-avatar-large">
                    <div className="avatar-placeholder-large">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="availability-indicator">
                      <span className="status-dot available"></span>
                      <span className="status-text">Disponible</span>
                    </div>
                  </div>
                  
                  <div className="team-header-info">
                    <h3 className="heading-2">{member.name}</h3>
                    <div className="team-role-badge">{member.role}</div>
                    <div className="team-speciality">
                      <Award size={16} />
                      <span>{member.speciality}</span>
                    </div>
                    <div className="team-experience">
                      <Calendar size={16} />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
                
                <div className="team-card-body">
                  <p className="body-medium team-bio">{member.description}</p>
                  
                  <div className="team-expertise">
                    <h4 className="heading-3">Domaines d'expertise</h4>
                    <div className="expertise-tags">
                      <span className="expertise-tag">Nutrition thérapeutique</span>
                      <span className="expertise-tag">Alimentation vivante</span>
                      <span className="expertise-tag">Maladies chroniques</span>
                    </div>
                  </div>
                  
                  <div className="team-qualifications">
                    <h4 className="heading-3">Formations & Certifications</h4>
                    <div className="qualification-item">
                      <GraduationCap size={16} />
                      <span>Doctorat en Médecine Nutritionnelle</span>
                    </div>
                    <div className="qualification-item">
                      <GraduationCap size={16} />
                      <span>Certification en Alimentation Vivante</span>
                    </div>
                    <div className="qualification-item">
                      <GraduationCap size={16} />
                      <span>Formation en Micronutrition</span>
                    </div>
                  </div>
                  
                  <div className="team-contact">
                    <button className="btn-primary team-cta">
                      Prendre rendez-vous
                    </button>
                    <div className="consultation-info">
                      <MapPin size={14} />
                      <span className="body-small">Consultations sur site et en ligne</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="team-stats">
        <div className="container">
          <div className="stats-banner">
            <div className="stat-item">
              <div className="stat-value">20+</div>
              <div className="stat-description">Années d'expérience cumulée</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-description">Bénéficiaires accompagnés avec succès</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">15</div>
              <div className="stat-description">Formations continues par an</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-description">Taux de recommandation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="team-values">
        <div className="container">
          <div className="values-content">
            <div className="values-text">
              <h2 className="heading-1">Notre Philosophie de Soins</h2>
              <p className="body-large">
                Chaque membre de notre équipe partage les mêmes valeurs fondamentales qui guident notre pratique quotidienne.
              </p>
              
              <div className="team-principles">
                <div className="principle-item">
                  <h4 className="heading-3">Écoute Active</h4>
                  <p className="body-medium">
                    Nous prenons le temps nécessaire pour comprendre vos besoins et préoccupations uniques.
                  </p>
                </div>
                
                <div className="principle-item">
                  <h4 className="heading-3">Approche Collaborative</h4>
                  <p className="body-medium">
                    Vous êtes partenaire de votre guérison. Nous vous accompagnons dans vos choix éclairés.
                  </p>
                </div>
                
                <div className="principle-item">
                  <h4 className="heading-3">Formation Continue</h4>
                  <p className="body-medium">
                    Notre équipe se forme constamment aux dernières avancées en nutrition thérapeutique.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="team-commitment">
              <div className="commitment-card">
                <h3 className="heading-2">Notre Engagement</h3>
                <ul className="commitment-list">
                  <li>Accompagnement personnalisé et bienveillant</li>
                  <li>Protocoles basés sur les dernières recherches</li>
                  <li>Suivi régulier et ajustements si nécessaire</li>
                  <li>Transparence totale sur nos méthodes</li>
                  <li>Respect de votre rythme et de vos contraintes</li>
                </ul>
                <div className="commitment-signature">
                  <div className="signature-text">
                    "Votre santé est notre priorité absolue"
                  </div>
                  <div className="signature-author">- L'équipe (LFD)-Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .team-page {
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

        .team-section {
          padding: var(--spacing-giant) 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: var(--spacing-large);
        }

        .team-card-detailed {
          background: var(--bg-card);
          border-radius: 32px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 69, 52, 0.25);
          transition: transform 0.3s ease;
        }

        .team-card-detailed:hover {
          transform: translateY(-4px);
        }

        .team-card-header {
          display: flex;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-large);
          align-items: flex-start;
        }

        .team-avatar-large {
          flex-shrink: 0;
          text-align: center;
        }

        .avatar-placeholder-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: var(--brand-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: var(--spacing-small);
        }

        .availability-indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          justify-content: center;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.available {
          background: #22c55e;
        }

        .status-text {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .team-header-info h3 {
          margin-bottom: var(--spacing-xs);
        }

        .team-role-badge {
          display: inline-block;
          background: var(--brand-primary);
          color: white;
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-medium);
        }

        .team-speciality,
        .team-experience {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .team-speciality svg,
        .team-experience svg {
          color: var(--brand-primary);
        }

        .team-bio {
          margin-bottom: var(--spacing-large);
          line-height: 1.6;
        }

        .team-expertise,
        .team-qualifications {
          margin-bottom: var(--spacing-large);
        }

        .team-expertise h4,
        .team-qualifications h4 {
          margin-bottom: var(--spacing-medium);
          color: var(--brand-primary);
        }

        .expertise-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }

        .expertise-tag {
          background: var(--bg-subtle);
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 16px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
        }

        .qualification-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-small);
          margin-bottom: var(--spacing-small);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .qualification-item svg {
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        .team-contact {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-small);
        }

        .consultation-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-light);
        }

        .consultation-info svg {
          color: var(--brand-primary);
        }

        .team-stats {
          padding: var(--spacing-giant) 0;
          background: var(--bg-section);
        }

        .stats-banner {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-large);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
          margin-bottom: var(--spacing-small);
        }

        .stat-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .team-values {
          padding: var(--spacing-giant) 0;
        }

        .values-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: start;
        }

        .values-text h2 {
          margin-bottom: var(--spacing-medium);
        }

        .values-text .body-large {
          margin-bottom: var(--spacing-large);
        }

        .team-principles {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-large);
        }

        .principle-item h4 {
          margin-bottom: var(--spacing-small);
          color: var(--brand-primary);
        }

        .commitment-card {
          background: var(--bg-card);
          padding: var(--spacing-large);
          border-radius: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .commitment-card h3 {
          margin-bottom: var(--spacing-medium);
          text-align: center;
        }

        .commitment-list {
          list-style: none;
          margin-bottom: var(--spacing-large);
        }

        .commitment-list li {
          padding: var(--spacing-small) 0;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-secondary);
          position: relative;
          padding-left: var(--spacing-medium);
        }

        .commitment-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--brand-primary);
          font-weight: bold;
        }

        .commitment-list li:last-child {
          border-bottom: none;
        }

        .commitment-signature {
          text-align: center;
          padding-top: var(--spacing-medium);
          border-top: 1px solid var(--border-light);
        }

        .signature-text {
          font-style: italic;
          color: var(--brand-primary);
          font-size: 1.1rem;
          margin-bottom: var(--spacing-xs);
        }

        .signature-author {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        @media (max-width: 781px) {
          .team-page {
            padding-top: 80px;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .team-card-header {
            flex-direction: column;
            text-align: center;
          }
          
          .values-content {
            grid-template-columns: 1fr;
          }
          
          .stats-banner {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .stats-banner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Team;