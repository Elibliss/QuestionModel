import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo east-Photoroom.png"
import { MessageCircle, User, Menu, X } from 'lucide-react';

function NavBar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-icon" style={{ background: 'var(--primary)', padding: '8px', borderRadius: '12px' }}>
            <img src={Logo} alt="East Mandate" style={{ width: '40px', height: '40px' }} />
          </div>
          <span className="logo-text" style={{ fontWeight: '800', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: 'var(--primary)' }}>
            East Mandate
          </span>
        </Link>
      </div>
      
      <div className="nav-actions" style={{ marginLeft: 'auto' }}>
        {user && (
          <div className="user-pill" style={{ padding: '4px 12px', marginRight: '12px', fontSize: '0.8rem' }}>
            <User size={14} />
            <span>{user.name}</span>
          </div>
        )}
      </div>

      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>Events</Link>
        <Link to="/messages" className="nav-link" onClick={() => setIsMenuOpen(false)}>Messages</Link>
        <Link to="/branches" className="nav-link" onClick={() => setIsMenuOpen(false)}>Branches</Link>
        <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        <Link to="/ask" className="nav-link" onClick={() => setIsMenuOpen(false)}>Ask Question</Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-toggle { 
            display: block !important; 
            order: 3;
          }
          .nav-logo { order: 1; }
          .nav-actions { 
            display: flex !important; 
            order: 2;
            margin-left: auto !important;
            margin-right: 12px;
          }
          .nav-links {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: var(--shadow-md);
            border-bottom: 1px solid var(--border);
            z-index: 100;
          }
          .logo-text { font-size: 1.1rem !important; }
        }
      `}</style>
    </nav>
  );
}

export default NavBar;
