import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="heading-3">(LFD)-Services</h3>
            <p className="body-medium">
              Centre de santé spécialisé dans le traitement des maladies chroniques 
              par l'alimentation vivante et les boissons naturelles.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>+237 6 74 79 20 03</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+237 6 71 83 60 02</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+241 65 31 01 71</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>lfdservicescommunications@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Douala vers Lundi après Fin goudron Bangué</span>
              </div>
              <div className="contact-item">
                <Clock size={16} />
                <span>Lun-Ven: 9h-18h, Sam: 5h-20h</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="heading-3">Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/a-propos">À propos</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/equipe">Équipe</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-links">
            <h4 className="heading-3">Services</h4>
            <ul>
              <li><Link to="/services">Consultation nutritionnelle</Link></li>
              <li><Link to="/services">Jus thérapeutiques</Link></li>
              <li><Link to="/services">Alimentation vivante</Link></li>
              <li><Link to="/services">Suivi personnalisé</Link></li>
            </ul>
          </div>

          {/* Additional Links */}
          <div className="footer-links">
            <h4 className="heading-3">Ressources</h4>
            <ul>
              <li><Link to="/témoignages">Témoignages</Link></li>
              <li><Link to="/ressources">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#privacy">Confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="body-small">
            © 2025 (LFD)-Services. Tous droits réservés.
          </p>
          <p className="body-small">
            Développé avec ❤️ pour votre santé naturelle
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-section);
          padding: var(--spacing-giant) 0 var(--spacing-large);
          margin-top: var(--spacing-giant);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-large);
        }

        .footer-brand h3 {
          margin-bottom: var(--spacing-medium);
          color: var(--brand-primary);
        }

        .footer-brand p {
          margin-bottom: var(--spacing-medium);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-small);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-secondary);
        }

        .contact-item svg {
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        .footer-links h4 {
          margin-bottom: var(--spacing-medium);
          color: var(--text-primary);
        }

        .footer-links ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-small);
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--brand-primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-light);
          padding-top: var(--spacing-medium);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 781px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: var(--spacing-small);
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;