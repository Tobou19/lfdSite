import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  Users,
  Award,
  TrendingUp,
  Calendar,
  User,
} from "lucide-react";
import { mockData } from "../data/mockData";
import axios from "axios";
import SplitText from "@/components/split/split";
import DomeGallery from "@/components/domeGallery/DomeGallery";

const Home = () => {
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://lfdsite.onrender.com/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Erreur fetch services:", err));
  }, []);

  const [testimonials, setTestimonials] = useState([]);

  const API_URL = "https://lfdsite.onrender.com/testimonials"; // adapte à ton backend

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

  const handleAnimationComplete = () => {
    console.log("Animation terminée !");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      {/* 
      <SplitText
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/> */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <SplitText
              text={mockData.hero.title} // ton titre principal
              tag="h1"
              className="display-large animated fadeIn"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars" // "chars" pour caractères, "words" pour mots
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={() =>
                console.log("Animation titre terminée !")
              }
            />
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
              <div
                key={index}
                className={`stat-card ${
                  animatedStats ? "zoomIn ready" : "zoomIn"
                }`}
              >
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
              Des approches naturelles et scientifiquement prouvées pour traiter
              vos maladies chroniques
            </p>
          </div>

          <div className="network-grid">
            {services.slice(0, 4).map((service) => (
              <div key={service.id} className="network-card service-card">
                <div className="service-header">
                  <Heart size={32} className="service-icon" />
                  <div className="service-meta">
                    <span className="service-duration body-small">
                      {service.duration}
                    </span>
                    <span className="service-price heading-3">
                      {service.price}
                    </span>
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
              <p className="body-large">{mockData.about.mission}</p>
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
                  <div className="body-medium">
                    Amélioration des biomarqueurs
                  </div>
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
            <p className="body-large">
              Des résultats concrets qui changent des vies
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.slice(0, 4).map((t) => (
                <div key={t.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="beneficiary-avatar">
                      <User size={28} />
                    </div>
                    <div className="beneficiary-info">
                      <h4 className="heading-3">{t.full_name}</h4>
                      <span className="body-small">
                        {t.age} ans • {t.condition_name}
                      </span>
                    </div>
                  </div>

                  <blockquote className="testimonial-quote">
                    "{t.testimonial_text}"
                  </blockquote>

                  <div className="testimonial-results">
                    <div className="result-item">
                      <TrendingUp size={20} />
                      <span>
                        Résultat : <strong>{t.result_value}</strong>
                      </span>
                    </div>
                    <div className="result-item">
                      <Calendar size={16} />
                      <span>Suivi sur {t.follow_up_duration}</span>
                    </div>
                  </div>

                  {t.verified && (
                    <div className="testimonial-badge">Témoignage vérifié</div>
                  )}
                </div>
              ))
            ) : (
              <p>Aucun témoignage disponible pour le moment.</p>
            )}
          </div>

          <div className="section-cta">
            <Link to="/témoignages" className="btn-primary">
              Lire tous les témoignages
            </Link>
          </div>
        </div>

        <style jsx>{`
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: var(--spacing-large);
          }

          .testimonial-card {
            background: var(--bg-card);
            border-left: 4px solid var(--brand-primary);
            border-radius: 24px;
            padding: var(--spacing-large);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .testimonial-card:hover {
            transform: translateY(-4px);
          }

          .testimonial-header {
            display: flex;
            gap: var(--spacing-medium);
            align-items: center;
            margin-bottom: var(--spacing-medium);
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

          .testimonial-quote {
            font-style: italic;
            color: var(--text-primary);
            margin-bottom: var(--spacing-medium);
            line-height: 1.6;
          }

          .testimonial-results {
            display: flex;
            gap: var(--spacing-large);
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-medium);
          }

          .result-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
          }

          .testimonial-badge {
            background: var(--brand-primary);
            color: #fff;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            width: fit-content;
          }

          @media (max-width: 781px) {
            .testimonials-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>

      {/* Dome Gallery Section */}
      <section className="dome-gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Souvenez-vous avec nous</h2>
            <p className="body-large">Visitez notre mémoire pour en apprendre plus sur notre approche</p>
            <ol type="1">
            <span className="body-medium underline text-blue-200"><li>Tournez le globe pour découvrir notre approche</li></span>
            <span className="body-medium underline text-blue-200"><li>Cliquez sur une image pour la voir en grand</li></span>
            </ol>
          </div>
          <div className="dome-gallery-wrapper">
            <DomeGallery
              images={[
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
                "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
              ]}
              grayscale={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="heading-1">Prêt à transformer votre santé ?</h2>
            <p className="body-large">
              Rejoignez les centaines de bénéficiaires qui ont retrouvé leur
              vitalité grâce à notre approche naturelle.
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

        .services-preview,
        .about-preview,
        .testimonials-preview {
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

        .dome-gallery-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-page);
          min-height: 100vh;
        }

        .dome-gallery-wrapper {
          width: 100%;
          height: 80vh;
          min-height: 600px;
          max-height: 900px;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
          background:rgb(254, 253, 255);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 781px) {
          .dome-gallery-wrapper {
            height: 70vh;
            min-height: 500px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
