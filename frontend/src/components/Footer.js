import React from "react";
import { Phone, Mail, MapPin, Clock, Apple, Cherry, Grape, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer style={{
      background: '#f8f9fa',
      padding: 0,
      marginTop: '4rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Bordure supérieure avec fruits animés */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)',
        padding: '0.75rem 0',
        borderBottom: '3px solid #f97316',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          gap: '2rem',
          animation: 'scrollFruits 20s linear infinite',
          whiteSpace: 'nowrap'
        }}>
          {[...Array(12)].map((_, i) => {
            const fruits = [
              { Icon: Apple, color: '#ef4444' },
              { Icon: Cherry, color: '#f97316' },
              { Icon: Leaf, color: '#fbbf24' },
              { Icon: Grape, color: '#a855f7' },
              { Icon: Cherry, color: '#ec4899' },
              { Icon: Leaf, color: '#22c55e' }
            ];
            const fruit = fruits[i % fruits.length];
            return (
              <fruit.Icon 
                key={i}
                size={32}
                style={{
                  color: fruit.color,
                  flexShrink: 0,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  animation: `bounce 2s ease-in-out infinite ${(i % 3) * 0.3}s`
                }}
              />
            );
          })}
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem 2rem'
      }}>
        {/* Grille du footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Section marque */}
          <div>
            <h3 style={{
              marginBottom: '0.5rem',
              color: '#16a34a',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              (LFD)-Services
            </h3>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <Apple size={20} style={{color: '#ef4444'}} />
              <Leaf size={20} style={{color: '#22c55e'}} />
              <Cherry size={20} style={{color: '#f97316'}} />
            </div>
            <p style={{
              marginBottom: '1rem',
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Centre de santé spécialisé dans le traitement des maladies chroniques 
              par l'alimentation vivante et les boissons naturelles.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {[
                { Icon: Phone, text: '+237 6 74 79 20 03' },
                { Icon: Phone, text: '+237 6 71 83 60 02' },
                { Icon: Phone, text: '+241 65 31 01 71' },
                { Icon: Mail, text: 'lfdservicescommunications@gmail.com' },
                { Icon: MapPin, text: 'Douala vers Lundi après Fin goudron Bangué' },
                { Icon: Clock, text: 'Lun-Ven: 9h-18h, Sam: 5h-20h' }
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  <item.Icon size={16} style={{color: '#16a34a', flexShrink: 0}} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              marginBottom: '0.5rem',
              color: '#1f2937',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              Navigation
            </h4>
            <div style={{marginBottom: '1rem'}}>
              <Cherry size={16} style={{color: '#ec4899'}} />
            </div>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: 0
            }}>
              {['Accueil', 'À propos', 'Services', 'Équipe'].map(item => (
                <li key={item}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              marginBottom: '0.5rem',
              color: '#1f2937',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              Services
            </h4>
            <div style={{marginBottom: '1rem'}}>
              <Grape size={16} style={{color: '#a855f7'}} />
            </div>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: 0
            }}>
              {[
                'Consultation nutritionnelle',
                'Jus thérapeutiques',
                'Alimentation vivante',
                'Suivi personnalisé'
              ].map(item => (
                <li key={item}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 style={{
              marginBottom: '0.5rem',
              color: '#1f2937',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              Ressources
            </h4>
            <div style={{marginBottom: '1rem'}}>
              <Apple size={16} style={{color: '#ef4444'}} />
            </div>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: 0
            }}>
              {['Témoignages', 'Blog', 'Contact', 'Confidentialité'].map(item => (
                <li key={item}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Séparateur avec fruits */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem 0'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Leaf size={18} style={{color: '#22c55e'}} />
            <Apple size={18} style={{color: '#ef4444'}} />
            <Cherry size={18} style={{color: '#fbbf24'}} />
            <Cherry size={18} style={{color: '#ec4899'}} />
            <Grape size={18} style={{color: '#a855f7'}} />
            <Leaf size={18} style={{color: '#22c55e'}} />
          </div>
        </div>

        {/* Bas du footer */}
        <div style={{
          borderTop: '2px solid #e5e7eb',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0
          }}>
            © 2025 (LFD)-Services. Tous droits réservés.
          </p>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0
          }}>
            Développé avec ❤️ pour votre santé naturelle
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scrollFruits {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        footer a:hover {
          color: #16a34a !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;