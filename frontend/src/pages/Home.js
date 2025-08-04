import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, Users, Award, TrendingUp } from "lucide-react";
import { mockData } from "../data/mockData";

const Home = () => {
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="display-large animated fadeIn">
              {mockData.hero.title}
            </h1>
            <p className="body-large animated fadeIn delay-200ms">
              {mockData.hero.subtitle}
            </p>
            <p className="body-medium animated fadeIn delay-500ms">
              {mockData.hero.description}
            </p>
            <div className="hero-actions animated fadeIn delay-500ms">
              <Link to="/contact" className="btn-cta">
                {mockData.hero.cta}
                <ChevronRight size={20} />
              </Link>
              <Link to="/services" className="btn-secondary">
                {mockData.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {mockData.stats.map((stat, index) => (
              <div key={index} className={`stat-card ${animatedStats ? 'zoomIn ready' : 'zoomIn'}`}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label body-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Nos Services Thérapeutiques</h2>
            <p className="body-large">
              Des approches naturelles et scientifiquement prouvées pour traiter vos maladies chroniques
            </p>
          </div>
          
          <div className="network-grid">
            {mockData.services.slice(0, 4).map((service) => (
              <div key={service.id} className="network-card service-card">
                <div className="service-header">
                  <Heart size={32} className="service-icon" />
                  <div className="service-meta">
                    <span className="service-duration body-small">{service.duration}</span>
                    <span className="service-price heading-3">{service.price}</span>
                  </div>
                </div>
                <h3 className="network-card-title">{service.title}</h3>
                <p className="network-card-content">{service.description}</p>
                <Link to="/services" className="service-link">
                  En savoir plus <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="section-cta">
            <Link to="/services" className="btn-primary">
              Découvrir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="heading-1">Notre Approche Révolutionnaire</h2>
              <p className="body-large">
                {mockData.about.mission}
              </p>
              <div className="values-preview">
                {mockData.about.values.slice(0, 2).map((value, index) => (
                  <div key={index} className="value-item">
                    <h4 className="heading-3">{value.title}</h4>
                    <p className="body-medium">{value.description}</p>
                  </div>
                ))}
              </div>
              <Link to="/a-propos" className="btn-secondary">
                Notre histoire complète
              </Link>
            </div>
            <div className="about-stats">
              <div className="stat-highlight">
                <Users size={48} className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-big">500+</div>
                  <div className="body-medium">Bénéficiaires transformés</div>
                </div>
              </div>
              <div className="stat-highlight">
                <Award size={48} className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-big">15 ans</div>
                  <div className="body-medium">D'expertise médicale</div>
                </div>
              </div>
              <div className="stat-highlight">
                <TrendingUp size={48} className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-big">85%</div>
                  <div className="body-medium">Amélioration des biomarqueurs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="testimonials-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Ce que disent nos bénéficiaires</h2>
            <p className="body-large">Des résultats concrets qui changent des vies</p>
          </div>
          
          <div className="testimonials-grid">
            {mockData.testimonials.slice(0, 2).map((testimonial) => (
              <div key={testimonial.id} className="network-card testimonial-card">
                <div className="testimonial-header">
                  <div className="beneficiary-info">
                    <h4 className="heading-3">{testimonial.name}</h4>
                    <span className="body-small">{testimonial.age} ans • {testimonial.condition}</span>
                  </div>
                  <div className="testimonial-result">
                    <div className="result-label body-small">Résultat</div>
                    <div className="result-value body-medium">{testimonial.result}</div>
                  </div>
                </div>
                <blockquote className="body-large">
                  "{testimonial.testimonial}"
                </blockquote>
                <div className="testimonial-duration body-small">
                  Suivi sur {testimonial.duration}
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-cta">
            <Link to="/témoignages" className="btn-primary">
              Lire tous les témoignages
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="heading-1">Prêt à transformer votre santé ?</h2>
            <p className="body-large">
              Rejoignez les centaines de bénéficiaires qui ont retrouvé leur vitalité grâce à notre approche naturelle.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-cta">
                Prendre rendez-vous maintenant
              </Link>
              <Link to="/equipe" className="btn-secondary">
                Rencontrer notre équipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          padding-top: 120px;
        }

        .hero-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-page);
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-content h1 {
          margin-bottom: var(--spacing-medium);
        }

        .hero-content p:first-of-type {
          margin-bottom: var(--spacing-medium);
          color: var(--brand-primary);
          font-weight: 500;
        }

        .hero-content p:last-of-type {
          margin-bottom: var(--spacing-large);
        }

        .hero-actions {
          display: flex;
          gap: var(--spacing-medium);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-cta {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .stats-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-subtle);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-large);
        }

        .stat-card {
          text-align: center;
          padding: var(--spacing-large);
        }

        .stat-number {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
          margin-bottom: var(--spacing-small);
        }

        .stat-label {
          color: var(--text-secondary);
        }

        .services-preview, .about-preview, .testimonials-preview {
          padding: var(--spacing-giant) 0;
        }

        .about-preview {
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

        .section-cta {
          text-align: center;
          margin-top: var(--spacing-large);
        }

        .service-card {
          position: relative;
        }

        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-medium);
        }

        .service-icon {
          color: var(--brand-primary);
        }

        .service-meta {
          text-align: right;
        }

        .service-duration {
          display: block;
          color: var(--text-light);
          margin-bottom: var(--spacing-xs);
        }

        .service-price {
          color: var(--brand-dark);
        }

        .service-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--brand-dark);
          text-decoration: none;
          font-weight: 500;
          margin-top: var(--spacing-medium);
          transition: color 0.2s ease;
        }

        .service-link:hover {
          color: var(--brand-primary);
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: center;
        }

        .about-text h2 {
          margin-bottom: var(--spacing-medium);
        }

        .about-text .body-large {
          margin-bottom: var(--spacing-large);
        }

        .values-preview {
          margin-bottom: var(--spacing-large);
        }

        .value-item {
          margin-bottom: var(--spacing-medium);
        }

        .value-item h4 {
          margin-bottom: var(--spacing-xs);
        }

        .about-stats {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-large);
        }

        .stat-highlight {
          display: flex;
          align-items: center;
          gap: var(--spacing-medium);
          padding: var(--spacing-medium);
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

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-large);
        }

        .testimonial-card {
          border-left: 4px solid var(--brand-primary);
        }

        .testimonial-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-medium);
        }

        .beneficiary-info h4 {
          margin-bottom: var(--spacing-xs);
        }

        .testimonial-result {
          text-align: right;
        }

        .result-label {
          color: var(--text-light);
          margin-bottom: var(--spacing-xs);
        }

        .result-value {
          color: var(--brand-primary);
          font-weight: 600;
        }

        .testimonial-card blockquote {
          font-style: italic;
          margin: var(--spacing-medium) 0;
          position: relative;
        }

        .testimonial-duration {
          color: var(--text-light);
          text-align: right;
        }

        .cta-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-subtle);
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          margin-bottom: var(--spacing-medium);
        }

        .cta-content p {
          margin-bottom: var(--spacing-large);
        }

        .cta-actions {
          display: flex;
          gap: var(--spacing-medium);
          justify-content: center;
          flex-wrap: wrap;
        }

        .zoomIn {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.6s ease;
        }

        .zoomIn.ready {
          opacity: 1;
          transform: scale(1);
        }

        @media (max-width: 781px) {
          .home-page {
            padding-top: 80px;
          }
          
          .about-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-large);
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-actions,
          .cta-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;