import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo east-Photoroom.png"
import { MessageCircle, User, LogOut, Menu, X } from 'lucide-react';

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
      
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>Events</Link>
        <Link to="/branches" className="nav-link" onClick={() => setIsMenuOpen(false)}>Branches</Link>
        <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        <Link to="/ask" className="nav-link" onClick={() => setIsMenuOpen(false)}>Ask Question</Link>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <div className="user-pill">
              <User size={16} />
              <span>{user.name}</span>
            </div>
            <button className="btn icon-btn" onClick={onLogout} title="Logout" style={{color:'var(--danger)', background:'var(--danger-bg)'}}>
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <div style={{ width: '40px' }}></div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-toggle { display: block !important; }
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
          .nav-actions { display: ${isMenuOpen ? 'none' : 'flex'}; }
        }
      `}</style>
    </nav>
  );
}

export default NavBar;
