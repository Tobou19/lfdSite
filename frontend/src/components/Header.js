import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/a-propos" },
    { name: "Services", path: "/services" },
    { name: "Équipe", path: "/equipe" },
    { name: "Témoignages", path: "/témoignages" },
    { name: "Contact", path: "/contact" },
    { name: "Ressources", path: "/ressources" },
  ];

  return (
    <header className="network-header">
      <div className="nav-wrapper">
        <Link to="/" className="flex gap-2 justify-center items-center">
          <img src={logo} className="size-10" alt="Logo" />
          <div className="flex gap-1 justify-center items-center">
            <span className="text-white font-bold">(</span>{" "}
            <span className="network-logo">L</span>{" "}
            <span className="text-white font-bold">.FD)-Services</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="network-nav desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`network-nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}

      <style jsx>{`
        .network-header {
          background: var(--bg-page);
          position: absolute;
          top: 32px;
          width: 100%;
          z-index: 99999;
          padding: 0 12px;
        }

        .nav-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          background: var(--brand-dark);
          border-radius: 25px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0, 69, 52, 0.25);
        }

        .network-logo {
          font-size: 18px;
          font-weight: 600;
          color: white;
          text-decoration: none;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .network-nav-link {
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .network-nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .network-nav-link.active {
          background: rgba(255, 255, 255, 0.2);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--brand-dark);
          margin: 0 12px;
          border-radius: 25px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 69, 52, 0.25);
        }

        .mobile-nav-link {
          display: block;
          color: white;
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 781px) {
          .network-header {
            top: 0;
            position: fixed;
          }

          .nav-wrapper {
            border-radius: 0;
            padding: 16px;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            gap: 16px;
          }

          .network-nav-link {
            font-size: 14px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
