import React, { useEffect, useState } from "react";
import { Star, TrendingUp, Calendar, User } from "lucide-react";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const API_URL = "http://localhost:5000/testimonials"; // adapte à ton backend

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(API_URL);
        setTestimonials(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="display-medium">Témoignages de Nos Bénéficiaires</h1>
          <p className="body-large">
            Découvrez comment nos bénéficiaires ont transformé leur santé grâce à notre approche naturelle
          </p>
        </div>
      </section>

      {/* Success Stats */}
      <section className="success-overview">
        <div className="container">
          <div className="success-banner">
            <div className="success-stat">
              <div className="success-number">92%</div>
              <div className="success-label">Taux de satisfaction</div>
            </div>
            <div className="success-stat">
              <div className="success-number">85%</div>
              <div className="success-label">Amélioration des biomarqueurs</div>
            </div>
            <div className="success-stat">
              <div className="success-number">78%</div>
              <div className="success-label">Réduction des médicaments</div>
            </div>
            <div className="success-stat">
              <div className="success-number">4.8/5</div>
              <div className="success-label">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card-detailed">
                  <div className="testimonial-header">
                    <div className="beneficiary-avatar">
                      <User size={24} />
                    </div>
                    <div className="beneficiary-details">
                      <h3 className="heading-3">{testimonial.full_name}</h3>
                      <div className="beneficiary-meta">
                        <span className="beneficiary-age">{testimonial.age} ans</span>
                        <span className="beneficiary-condition">{testimonial.condition_name}</span>
                      </div>
                    </div>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="star filled" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="testimonial-quote">
                    "{testimonial.testimonial_text}"
                  </blockquote>

                  <div className="testimonial-results">
                    <div className="result-metric">
                      <TrendingUp size={20} className="result-icon" />
                      <div className="result-content">
                        <div className="result-label">Résultat obtenu</div>
                        <div className="result-value">{testimonial.result_value}</div>
                      </div>
                    </div>
                    <div className="result-duration">
                      <Calendar size={16} />
                      <span>Suivi sur {testimonial.follow_up_duration}</span>
                    </div>
                  </div>

                  <div className="testimonial-tags">
                    {testimonial.verified && <span className="testimonial-tag">Témoignage vérifié</span>}
                    <span className="testimonial-tag">Résultats authentiques</span>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun témoignage disponible pour le moment.</p>
            )}
          </div>
        </div>
      </section>


      {/* Conditions Success Stories */}
      <section className="conditions-success">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Succès par Pathologie</h2>
            <p className="body-large">
              Nos résultats spécifiques selon les différentes maladies chroniques
            </p>
          </div>
          
          <div className="conditions-results">
            <div className="condition-result-card">
              <div className="condition-header">
                <h3 className="heading-3">Diabète Type 2</h3>
                <div className="beneficiaries-count">127 bénéficiaires traités</div>
              </div>
              <div className="condition-stats">
                <div className="condition-stat">
                  <div className="stat-percentage">78%</div>
                  <div className="stat-description">Réduction HbA1c ≥ 1%</div>
                </div>
                <div className="condition-stat">
                  <div className="stat-percentage">65%</div>
                  <div className="stat-description">Réduction médicaments</div>
                </div>
                <div className="condition-stat">
                  <div className="stat-percentage">-2.1%</div>
                  <div className="stat-description">HbA1c moyenne</div>
                </div>
              </div>
              <div className="condition-testimonial">
                "Mon HbA1c est passée de 9.2% à 6.8% en 4 mois"
                <div className="testimonial-author">- Marie, 58 ans</div>
              </div>
            </div>
            
            <div className="condition-result-card">
              <div className="condition-header">
                <h3 className="heading-3">Hypertension</h3>
                <div className="beneficiaries-count">89 bénéficiaires traités</div>
              </div>
              <div className="condition-stats">
                <div className="condition-stat">
                  <div className="stat-percentage">82%</div>
                  <div className="stat-description">Tension normalisée</div>
                </div>
                <div className="condition-stat">
                  <div className="stat-percentage">71%</div>
                  <div className="stat-description">Arrêt médicaments</div>
                </div>
                <div className="condition-stat">
                  <div className="stat-percentage">-18mmHg</div>
                  <div className="stat-description">Systolique moyenne</div>
                </div>
              </div>
              <div className="condition-testimonial">
                "Plus besoin de médicaments après 5 mois de suivi"
                <div className="testimonial-author">- Jean, 52 ans</div>
              </div>
            </div>
            
            <div className="condition-result-card">
              <div className="condition-header">
                <h3 className="heading-3">Troubles Digestifs</h3>
                <div className="beneficiaries-count">156 bénéficiaires traités</div>
              </div>
              <div className="condition-stats">
                <div className="condition-stat">
                  <div className="stat-percentage">91%</div>
                  <div className="stat-description">Amélioration symptômes</div>
                </div>
                <div className="condition-stat">
                  <div className="stat-percentage">73%</div>
                  <div className="stat-description">Rémission complète</div>
                </div>
                <div className="condition-stat">
                  <div className="stat-percentage">6 sem.</div>
                  <div className="stat-description">Délai moyen amélioration</div>
                </div>
              </div>
              <div className="condition-testimonial">
                "Fini les douleurs quotidiennes après 15 ans de souffrance"
                <div className="testimonial-author">- Sophie, 41 ans</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Placeholder */}
      <section className="video-testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Témoignages Vidéo</h2>
            <p className="body-large">
              Écoutez directement nos bénéficiaires partager leur expérience
            </p>
          </div>
          
          <div className="video-grid">
            <div className="video-placeholder">
              <div className="video-thumbnail">
                <div className="play-button">▶</div>
              </div>
              <div className="video-info">
                <h4 className="heading-3">Christine - Diabète Type 2</h4>
                <p className="body-small">Comment j'ai divisé mon HbA1c par deux</p>
                <span className="video-duration">3:42</span>
              </div>
            </div>
            
            <div className="video-placeholder">
              <div className="video-thumbnail">
                <div className="play-button">▶</div>
              </div>
              <div className="video-info">
                <h4 className="heading-3">Michel - Hypertension</h4>
                <p className="body-small">Retour à une tension normale sans médicaments</p>
                <span className="video-duration">4:15</span>
              </div>
            </div>
            
            <div className="video-placeholder">
              <div className="video-thumbnail">
                <div className="play-button">▶</div>
              </div>
              <div className="video-info">
                <h4 className="heading-3">Anne - Troubles Digestifs</h4>
                <p className="body-small">Retrouver le confort digestif naturellement</p>
                <span className="video-duration">2:58</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .testimonials-page {
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

        .success-overview {
          padding: var(--spacing-large) 0;
          background: var(--bg-subtle);
        }

        .success-banner {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-large);
        }

        .success-stat {
          text-align: center;
        }

        .success-number {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
          margin-bottom: var(--spacing-small);
        }

        .success-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .testimonials-section {
          padding: var(--spacing-giant) 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: var(--spacing-large);
        }

        .testimonial-card-detailed {
          background: var(--bg-card);
          border-radius: 24px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 69, 52, 0.25);
          border-left: 4px solid var(--brand-primary);
          transition: transform 0.3s ease;
        }

        .testimonial-card-detailed:hover {
          transform: translateY(-4px);
        }

        .testimonial-header {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-large);
        }

        .beneficiary-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--brand-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .beneficiary-details {
          flex: 1;
        }

        .beneficiary-details h3 {
          margin-bottom: var(--spacing-xs);
        }

        .beneficiary-meta {
          display: flex;
          gap: var(--spacing-medium);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .beneficiary-age {
          font-weight: 500;
        }

        .beneficiary-condition {
          color: var(--brand-primary);
          font-weight: 600;
        }

        .testimonial-rating {
          display: flex;
          gap: 2px;
        }

        .star.filled {
          color: #fbbf24;
        }

        .testimonial-quote {
          font-size: clamp(1.1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          font-style: italic;
          margin-bottom: var(--spacing-large);
          color: var(--text-primary);
        }

        .testimonial-results {
          background: var(--bg-subtle);
          border-radius: 16px;
          padding: var(--spacing-medium);
          margin-bottom: var(--spacing-medium);
        }

        .result-metric {
          display: flex;
          align-items: center;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-small);
        }

        .result-icon {
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        .result-label {
          font-size: 0.9rem;
          color: var(--text-light);
          margin-bottom: var(--spacing-xs);
        }

        .result-value {
          font-weight: 600;
          color: var(--brand-primary);
          font-size: 1.1rem;
        }

        .result-duration {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .testimonial-tags {
          display: flex;
          gap: var(--spacing-small);
        }

        .testimonial-tag {
          background: var(--brand-primary);
          color: white;
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .conditions-success {
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

        .conditions-results {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-large);
        }

        .condition-result-card {
          background: var(--bg-card);
          border-radius: 24px;
          padding: var(--spacing-large);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .condition-header {
          text-align: center;
          margin-bottom: var(--spacing-large);
          border-bottom: 2px solid var(--border-light);
          padding-bottom: var(--spacing-medium);
        }

        .condition-header h3 {
          margin-bottom: var(--spacing-xs);
          color: var(--brand-primary);
        }

        .beneficiaries-count {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .condition-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-large);
        }

        .condition-stat {
          text-align: center;
        }

        .stat-percentage {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
          margin-bottom: var(--spacing-xs);
        }

        .stat-description {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .condition-testimonial {
          background: var(--bg-subtle);
          padding: var(--spacing-medium);
          border-radius: 16px;
          font-style: italic;
          text-align: center;
          color: var(--text-primary);
        }

        .testimonial-author {
          margin-top: var(--spacing-xs);
          font-size: 0.9rem;
          color: var(--text-light);
          font-style: normal;
        }

        .video-testimonials {
          padding: var(--spacing-giant) 0;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-large);
        }

        .video-placeholder {
          background: var(--bg-card);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .video-placeholder:hover {
          transform: translateY(-4px);
        }

        .video-thumbnail {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .play-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--brand-dark);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .play-button:hover {
          transform: scale(1.1);
        }

        .video-info {
          padding: var(--spacing-medium);
        }

        .video-info h4 {
          margin-bottom: var(--spacing-xs);
        }

        .video-info p {
          margin-bottom: var(--spacing-xs);
        }

        .video-duration {
          color: var(--text-light);
          font-size: 0.8rem;
        }

        @media (max-width: 781px) {
          .testimonials-page {
            padding-top: 80px;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .conditions-results {
            grid-template-columns: 1fr;
          }
          
          .condition-stats {
            grid-template-columns: 1fr;
            gap: var(--spacing-small);
          }
          
          .success-banner {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .success-banner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;