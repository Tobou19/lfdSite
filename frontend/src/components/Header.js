import React, { useState, useEffect } from "react";
import { Menu, X, Apple, Leaf, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/a-propos" },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Équipe", path: "/equipe" },
    { name: "Témoignages", path: "/témoignages" },
    { name: "Contact", path: "/contact" },
    { name: "Ressources", path: "/ressources" },
  ];

  const servicesList = [
    "Consultation nutritionnelle",
    "Jus thérapeutiques",
    "Alimentation vivante",
    "Suivi personnalisé"
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      padding: isScrolled ? '8px 16px' : '24px 16px',
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgb(58, 0, 69)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none'
    }}>
      {/* Ligne de fruits décorative en haut */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #ef4444, #f97316, #fbbf24, #22c55e, #a855f7, #ec4899)',
        opacity: isScrolled ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }} />

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        background: 'linear-gradient(135deg,rgb(58, 0, 69) 0%,rgb(99, 0, 102) 100%)',
        borderRadius: isScrolled ? '16px' : '25px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0, 69, 52, 0.4)' 
          : '0 4px 16px rgba(0, 69, 52, 0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Effet de brillance animé */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'shine 3s infinite'
        }} />

        {/* Logo avec fruits animés */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            setActiveItem("/");
          }}
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            textDecoration: 'none',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Image du logo */}
          <div style={{
            width: '40px',
            height: '40px',
            background: 'transparent',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src={logo} 
              alt="Logo LFD"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Fruits décoratifs */}
          {/* <div style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            display: 'flex',
            gap: '2px'
          }}>
            <Apple size={16} style={{
              color: '#ef4444',
              filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))',
              animation: 'float 3s ease-in-out infinite'
            }} />
            <Leaf size={14} style={{
              color: '#22c55e',
              animation: 'float 3s ease-in-out infinite 0.5s'
            }} />
          </div> */}

          <div style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center'
          }}>
            <span style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              (
            </span>
            <span style={{
              color: 'white',
              fontWeight: '700',
              fontSize: '20px',
              fontFamily: 'Feel',
              textShadow: '0 2px 8px rgba(255,255,255,0.3)'
            }}>
              L
            </span>
            <span style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
            FD)-Services
            </span>
          </div>
        </a>

        {/* Navigation Desktop */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="desktop-nav">
          {navigation.map((item) => (
            <div key={item.path} style={{position: 'relative'}}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.path);
                  // Simuler la navigation - dans votre vrai projet, utilisez votre router
                  navigate(item.path);
                  console.log('Navigation vers:', item.path);
                }}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  padding: '10px 16px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: activeItem === item.path 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== item.path) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== item.path) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {activeItem === item.path && (
                  <span style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #fbbf24, #f97316)',
                    borderRadius: '2px',
                    animation: 'slideIn 0.3s ease'
                  }} />
                )}
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown size={14} style={{
                    transition: 'transform 0.3s ease'
                  }} />
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        {/* <button
          onClick={() => {
            setActiveItem('/contact');
            console.log('Navigation vers: /contact');
          }}
          className="desktop-cta"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '25px',
            fontWeight: '600',
            fontSize: '15px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
          }}
        >
          <span style={{position: 'relative', zIndex: 1}}>Prendre RDV</span>
          <span style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shine 2s infinite'
          }} />
        </button> */}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '16px',
          right: '16px',
          marginTop: '8px',
          background: 'linear-gradient(135deg, #004534 0%, #006644 100%)',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0, 69, 52, 0.4)',
          animation: 'slideDown 0.3s ease'
        }} className="mobile-nav">
          {navigation.map((item, index) => (
            <div key={item.path}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.path);
                  setIsMenuOpen(false);
                  navigate(item.path);
                  console.log('Navigation vers:', item.path);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: activeItem === item.path 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'transparent',
                  marginBottom: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== item.path) {
                    e.currentTarget.style.background = 'transparent';
                  } else {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {index === 0 && <Apple size={18} style={{color: '#ef4444'}} />}
                  {index === 1 && <Leaf size={18} style={{color: '#22c55e'}} />}
                  {index === 2 && <Apple size={18} style={{color: '#f97316'}} />}
                  {item.name}
                </span>
                {item.hasDropdown && <ChevronDown size={16} />}
              </a>
              {item.hasDropdown && activeItem === item.path && (
                <div style={{
                  paddingLeft: '48px',
                  marginTop: '8px',
                  marginBottom: '12px',
                  animation: 'slideDown 0.3s ease'
                }}>
                  {servicesList.map((service) => (
                    <a
                      key={service}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Service sélectionné:', service);
                      }}
                      style={{
                        display: 'block',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        padding: '8px 0',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      • {service}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* CTA Button Mobile */}
          <button
            onClick={() => {
              setActiveItem('/contact');
              setIsMenuOpen(false);
              console.log('Navigation vers: /contact');
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
              color: 'white',
              padding: '14px 24px',
              borderRadius: '16px',
              fontWeight: '600',
              fontSize: '16px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              marginTop: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
            }}
          >
            Prendre RDV
          </button>
        </div>
      )}

      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }

        @media (min-width: 1025px) {
          .mobile-nav {
            display: none !important;
          }
        }

        .mobile-nav a:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          transform: translateX(4px);
        }
      `}</style>
    </header>
  );
};

export default Header;