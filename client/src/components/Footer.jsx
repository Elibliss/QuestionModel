import React from 'react';
import { Twitter, Linkedin, Mail, Facebook, Youtube } from 'lucide-react';
import Logo from "../assets/logo east-Photoroom.png"

function Footer() {
  return (
    <footer className="app-footer" style={{ background: 'var(--primary)', color: 'white', padding: '60px 0 20px', marginBottom: '0' }}>
      <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1600px', margin: '0 auto', padding: '0 24px' }}>
        <div className="footer-col">
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px' }}>
              <img src={Logo} alt="East Mandate" style={{ width: '32px', height: '32px' }} />
            </div>
            <span style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--accent)' }}>East Mandate</span>
          </div>
          <p style={{ opacity: '0.8' }}>A Global mandate for transformation and spiritual growth. Connecting the world through the word of God.</p>
        </div>
        <div className="footer-col">
          <h4 style={{ color: 'var(--accent)', marginBottom: '20px' }}>Quick Links</h4>
          <a href="/" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '10px', opacity: '0.8' }}>Home</a>
          <a href="/events" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '10px', opacity: '0.8' }}>Events</a>
          <a href="/branches" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '10px', opacity: '0.8' }}>Branches</a>
          <a href="/contact" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '10px', opacity: '0.8' }}>Contact</a>
        </div>
        <div className="footer-col">
          <h4 style={{ color: 'var(--accent)', marginBottom: '20px' }}>Branches</h4>
          <p style={{ opacity: '0.8', marginBottom: '10px' }}>Headquarters: Lagos, Nigeria</p>
          <p style={{ opacity: '0.8', marginBottom: '10px' }}>London, UK</p>
          <p style={{ opacity: '0.8', marginBottom: '10px' }}>Houston, Texas, USA</p>
        </div>
        <div className="footer-col">
          <h4 style={{ color: 'var(--accent)', marginBottom: '20px' }}>Connect</h4>
          <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
            <a href="https://web.facebook.com/EastMandateglobal" style={{ color: 'white' }}><Facebook size={24} /></a>
            <a href="https://www.youtube.com/@EASTMANDATEGLOBAL" style={{ color: 'white' }}><Youtube size={24} /></a>
            <a href="#" style={{ color: 'white' }}><Mail size={24} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', textAlign: 'center', opacity: '0.6' }}>
        <p>&copy; {new Date().getFullYear()} East Mandate Global. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
