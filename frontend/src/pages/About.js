import React from "react";
import { Users, Target, Heart, BookOpen } from "lucide-react";
import { mockData } from "../data/mockData";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="display-medium">À Propos de (LFD)-Services</h1>
          <p className="body-large">
            Découvrez notre approche révolutionnaire du traitement des maladies chroniques
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-item">
              <Target size={48} className="mission-icon" />
              <h3 className="heading-2">Notre Mission</h3>
              <p className="body-large">{mockData.about.mission}</p>
            </div>
            <div className="mission-item">
              <Heart size={48} className="mission-icon" />
              <h3 className="heading-2">Notre Vision</h3>
              <p className="body-large">{mockData.about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Nos Valeurs Fondamentales</h2>
            <p className="body-large">
              Les principes qui guident notre pratique quotidienne
            </p>
          </div>
          
          <div className="network-grid">
            {mockData.about.values.map((value, index) => (
              <div key={index} className="network-card value-card">
                <div className="value-number">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="network-card-title">{value.title}</h3>
                <p className="network-card-content">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="history-section">
        <div className="container">
          <div className="history-content">
            <div className="history-text">
              <h2 className="heading-1">Notre Histoire</h2>
              <p className="body-large">{mockData.about.history}</p>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2009</div>
                  <div className="timeline-content">
                    <h4 className="heading-3">Fondation du centre</h4>
                    <p className="body-medium">
                      Ouverture du premier centre (LFD)-Services à Douala avec une équipe de 3 praticiens.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2012</div>
                  <div className="timeline-content">
                    <h4 className="heading-3">Premier protocole innovant</h4>
                    <p className="body-medium">
                      Développement du protocole de jus thérapeutiques pour le diabète type 2.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2018</div>
                  <div className="timeline-content">
                    <h4 className="heading-3">Reconnaissance scientifique</h4>
                    <p className="body-medium">
                      Publication de nos premiers résultats dans une revue médicale internationale.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-content">
                    <h4 className="heading-3">Expansion des services</h4>
                    <p className="body-medium">
                      Ouverture de nouveaux départements et formation d'autres praticiens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="history-stats">
              <div className="stat-card-large">
                <BookOpen size={48} className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-big">25+</div>
                  <div className="body-medium">Publications scientifiques</div>
                </div>
              </div>
              <div className="stat-card-large">
                <Users size={48} className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-big">12</div>
                  <div className="body-medium">Praticiens experts</div>
                </div>
              </div>
              <div className="achievements">
                <h4 className="heading-3">Certifications & Reconnaissances</h4>
                <ul className="achievements-list">
                  <li>Certification ISO 9001:2015</li>
                  <li>Agrément formation continue médicale</li>
                  <li>Membre de l'IEDM (Institut Européen de Diététique et Micronutrition)</li>
                  <li>Partenaire de l'INSERM pour la recherche</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="team-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Notre Équipe d'Experts</h2>
            <p className="body-large">
              Une équipe multidisciplinaire dédiée à votre santé
            </p>
          </div>
          
          <div className="team-grid">
            {mockData.team.slice(0, 3).map((member) => (
              <div key={member.id} className="network-card team-card">
                <div className="team-avatar">
                  <div className="avatar-placeholder">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="heading-3">{member.name}</h3>
                  <div className="team-role body-medium">{member.role}</div>
                  <div className="team-speciality body-small">{member.speciality}</div>
                  <div className="team-experience body-small">{member.experience}</div>
                  <p className="body-small team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
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

        .mission-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-subtle);
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-giant);
        }

        .mission-item {
          text-align: center;
        }

        .mission-icon {
          color: var(--brand-primary);
          margin-bottom: var(--spacing-medium);
        }

        .mission-item h3 {
          margin-bottom: var(--spacing-medium);
        }

        .values-section {
          padding: var(--spacing-giant) 0;
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

        .value-card {
          position: relative;
          padding-top: calc(var(--spacing-large) + 24px);
        }

        .value-number {
          position: absolute;
          top: var(--spacing-medium);
          right: var(--spacing-medium);
          font-size: 2rem;
          font-weight: 700;
          color: var(--brand-primary);
          opacity: 0.3;
        }

        .history-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-section);
        }

        .history-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-giant);
          align-items: start;
        }

        .history-text h2 {
          margin-bottom: var(--spacing-medium);
        }

        .history-text .body-large {
          margin-bottom: var(--spacing-large);
        }

        .timeline {
          position: relative;
          padding-left: var(--spacing-large);
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--brand-primary);
        }

        .timeline-item {
          position: relative;
          margin-bottom: var(--spacing-large);
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -18px;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--brand-primary);
        }

        .timeline-year {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--brand-dark);
          margin-bottom: var(--spacing-xs);
        }

        .timeline-content h4 {
          margin-bottom: var(--spacing-xs);
        }

        .history-stats {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-large);
        }

        .stat-card-large {
          display: flex;
          align-items: center;
          gap: var(--spacing-medium);
          padding: var(--spacing-large);
          background: var(--bg-card);
          border-radius: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        .stat-big {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--brand-dark);
          line-height: 1;
        }

        .achievements {
          padding: var(--spacing-large);
          background: var(--bg-card);
          border-radius: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .achievements h4 {
          margin-bottom: var(--spacing-medium);
          color: var(--brand-primary);
        }

        .achievements-list {
          list-style: none;
          padding: 0;
        }

        .achievements-list li {
          padding: var(--spacing-xs) 0;
          border-bottom: 1px solid var(--border-light);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .achievements-list li:last-child {
          border-bottom: none;
        }

        .team-preview {
          padding: var(--spacing-giant) 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-large);
        }

        .team-card {
          text-align: center;
        }

        .team-avatar {
          margin-bottom: var(--spacing-medium);
        }

        .avatar-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--brand-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 auto;
        }

        .team-info h3 {
          margin-bottom: var(--spacing-xs);
        }

        .team-role {
          color: var(--brand-dark);
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
        }

        .team-speciality {
          color: var(--brand-primary);
          margin-bottom: var(--spacing-xs);
        }

        .team-experience {
          color: var(--text-light);
          margin-bottom: var(--spacing-medium);
        }

        .team-description {
          color: var(--text-secondary);
        }

        @media (max-width: 781px) {
          .about-page {
            padding-top: 80px;
          }
          
          .mission-grid {
            grid-template-columns: 1fr;
          }
          
          .history-content {
            grid-template-columns: 1fr;
          }
          
          .timeline {
            padding-left: var(--spacing-medium);
          }
          
          .timeline-item::before {
            left: -12px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;