import React, { useEffect, useState } from "react";
import { Users, Target, Heart, BookOpen } from "lucide-react";
import { mockData } from "../data/mockData";
import DomeGallery from "@/components/domeGallery/DomeGallery";

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://lfdsite.onrender.com/team")
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur récupération équipe :", err);
        setLoading(false);
      });
  }, []);

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
            <h2 className="heading-1">Nos Valeurs Fondamentales (Atouts)</h2>
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

      {/* Team Preview connecté */}
      <section className="team-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Notre Équipe d'Experts</h2>
            <p className="body-large">
              Une équipe multidisciplinaire dédiée à votre santé
            </p>
          </div>
          
          {loading ? (
            <p>Chargement de l’équipe...</p>
          ) : (
            <div className="team-grid">
              {team.map((member) => (
                <div key={member.id} className="network-card team-card">
                  <div className="team-avatar">
                    <div className="avatar-placeholder">
                      {member.fullName
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>
                  </div>
                  <div className="team-info">
                    <h3 className="heading-3">{member.fullName}</h3>
                    <div className="team-role body-medium">{member.profession}</div>
                    <div className="team-speciality body-small">{member.speciality}</div>
                    <div className="team-experience body-small">{member.experience}</div>
                    <p className="body-small team-description">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* <div style={{ width: '100vw', height: '100vh' }}>
      <DomeGallery />
    </div> */}

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


      {/* Protocole Authentifié – Version Ergonomique avec Thèmes */}
<section className="bg-gray-50 py-20">
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className=" heading-1 text-3xl md:text-4xl font-bold mb-4">
        Protocole Authentifié 
      </h2>
      <h2 className=" heading-1 text-3xl md:text-4xl font-bold mb-4">
        pour la Réversion des Pathologies
      </h2>
      <p className="body-large text-gray-700 max-w-2xl mx-auto">
        Ce protocole présente l’ensemble des étapes, règles et obligations nécessaires pour bénéficier des Services LFD dans le cadre de la réversion de maladies chroniques et d’autres affections.
      </p>
    </div>

    {/* Cartes des étapes avec badges de thème */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { text: "Chaque bénéficiaire doit présenter un test RLT authentique afin de valider médicalement l’état de la maladie.", theme: "Validation" },
        { text: "Le bénéficiaire doit fournir une preuve vidéo en direct, montrant l’état réel de la pathologie avant la transformation.", theme: "Preuve" },
        { text: "Le paiement intégral doit être effectué afin de poursuivre la procédure.", theme: "Finance" },
        { text: "Suivi strict du programme, respect exact des doses, adhérence complète aux instructions.", theme: "Conformité" },
        { text: "Tous les tests de contrôle demandés doivent être fournis à temps pour permettre la validation du progrès réel.", theme: "Suivi" },
        { text: "Le bénéficiaire doit éviter toute personne ou structure externe non reconnue.", theme: "Sécurité" },
        { text: "Les services sont rendus sans favoritisme.", theme: "Éthique" },
        { text: "Ces éléments servent à authentifier la véracité de la réversion.", theme: "Authentification" },
        { text: "Le départ vers l’étranger n’est pas autorisé tant que les indicateurs biologiques ne sont pas suffisants.", theme: "Restrictions" },
        { text: "Respect strict obligatoire pour garantir la synchronisation énergétique optimale (RSB-S1).", theme: "Dosage" },
        { text: "Aucun défaut d’observance n’est toléré.", theme: "Discipline" },
        { text: "Le bénéficiaire doit s’assurer que son engagement est ferme.", theme: "Engagement" },
        { text: "L’équipe OHM fournit un accompagnement complet : suivi, éducation, conseils nutritionnels, gestion des risques énergétiques.", theme: "Soutien" },
        { text: "Tous les produits et thérapies proposés sont strictement naturels.", theme: "Naturel" },
        { text: "Indispensable pour la réussite du processus.", theme: "Conformité" },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="ml-4 font-semibold text-gray-800 text-lg">
                Étape {index + 1}
              </h3>
            </div>
            {/* Badge thème */}
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {item.theme}
            </span>
          </div>
          <p className="text-gray-600">{item.text}</p>
        </div>
      ))}
    </div>

    {/* Disclaimer */}
    <p className="mt-16 text-gray-500 italic text-center max-w-2xl mx-auto">
      <strong>Disclaimer :</strong> Ce protocole ne doit être manipulé ou interprété que dans le cadre des services certifiés LFD/OHM. Toute reproduction non autorisée, mauvaise interprétation ou tentative d’altération engage la responsabilité du bénéficiaire.
    </p>

    {/* Signature */}
    <p className="mt-6 font-semibold text-center">
      <strong>Fidèlement vôtre,</strong>
      <br />
      (RTP)-Potentiel (OHM) Bénéficiaire
    </p>
  </div>
</section>

    </div>
  );
};

export default About;