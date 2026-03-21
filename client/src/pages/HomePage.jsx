import React from 'react';
import { ChevronRight, Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import mandate from "../assets/mandate.jpg"
import papa from "../assets/papa.jpg"
import Logo from "../assets/logo east-Photoroom.png"
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section hero-main" style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(0, 51, 102, 0.8) 0%, rgba(0, 31, 63, 0.8) 100%), url(${papa})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '100px 0',
        borderRadius: 'var(--radius-xl)',
        marginBottom: '80px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="hero-decoration" style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'var(--accent)', opacity: '0.1', clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
        
        <div className="page" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <span className="hero-badge" style={{ 
              background: 'rgba(212, 175, 55, 0.2)', 
              color: 'var(--accent)', 
              padding: '8px 16px', 
              borderRadius: '20px', 
              fontSize: '0.9rem', 
              fontWeight: '600',
              marginBottom: '24px',
              display: 'inline-block'
            }}>
              EAST MANDATE GLOBAL
            </span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: 'white' }}>
              Transforming Lives, <span style={{ color: 'var(--accent)' }}>One Soul</span> At A Time
            </h1>
            <p className="hero-subtitle" style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', opacity: '0.9', marginBottom: '40px', lineHeight: '1.7' }}>
              Welcome to East Mandate Global. We are a community dedicated to spiritual growth, 
              empowerment, and the global spread of the gospel. Join us in our mission to change the world.
            </p>
            <div className="hero-btns" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/branches" className="btn primary large" style={{ background: 'var(--accent)', color: 'var(--primary)', border: 'none' }}>
                Find a Branch <ChevronRight size={20} />
              </Link>
              <Link to="/events" className="btn secondary large" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="page" style={{ marginBottom: '100px' }}>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <div className="card feature-card" style={{ padding: '40px', textAlign: 'center', transition: 'transform 0.3s' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', margin: '0 auto 24px', justifyContent: 'center' }}>
              <Users size={30} />
            </div>
            <h3 style={{ marginBottom: '16px' }}>Global Community</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Connect with thousands of believers across our different branches worldwide.</p>
          </div>
          <div className="card feature-card" style={{ padding: '40px', textAlign: 'center', transition: 'transform 0.3s' }}>
            <div style={{ background: 'var(--accent-light)', color: 'var(--accent)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', margin: '0 auto 24px', justifyContent: 'center' }}>
              <Calendar size={30} />
            </div>
            <h3 style={{ marginBottom: '16px' }}>Life-Changing Events</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Participate in our transformative conferences, seminars, and fellowship meetings.</p>
          </div>
          <div className="card feature-card" style={{ padding: '40px', textAlign: 'center', transition: 'transform 0.3s' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', margin: '0 auto 24px', justifyContent: 'center' }}>
              <MapPin size={30} />
            </div>
            <h3 style={{ marginBottom: '16px' }}>Accessible Branches</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Our fellowship centers are located conveniently to serve your spiritual needs.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" style={{ background: 'var(--surface)', padding: 'clamp(40px, 10vw, 100px) 0', marginBottom: '100px', borderRadius: 'var(--radius-xl)' }}>
        <div className="page about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'center' }}>
          <div className="about-img">
            <img 
              src={mandate} 
              alt="Worship" 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
            />
          </div>
          <div className="about-content">
            <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '24px', color: 'var(--primary)' }}>Our Mission</h2>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '12px' }}>Restoration and Transformation</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.8' }}>
                The ministry focuses on restoring people to God’s original plan, described as an "Eden experience" or "Living in Eden," which emphasizes a life of dominion, intimacy, peace, and abundance.
              </p>
              
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '12px' }}>Prophetic/Apostolic Teaching</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.8' }}>
                Spreading the gospel through prophetic ministry, word festivals, and prayer gatherings (e.g., "The Will and the Wheels of God").
              </p>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '12px' }}>Ministry of Grace</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.8' }}>
                Hosting live services for blessings, restoration, and encouragement.
              </p>
            </div>

            <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '24px', color: 'var(--primary)' }}>Our Vision</h2>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '12px' }}>Global Impact</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.8' }}>
                Spreading the ministry’s message globally, as seen in "East Mandate Global Word Festival" and "This Generation International Ministries".
              </p>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '12px' }}>Spiritual Awakening</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.8' }}>
                Preparing believers for kingdom work and aligning hearts with God's purpose through consistent prayer and fellowship (e.g., New Moon Gatherings).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page" style={{ marginBottom: '100px' }}>
        <div className="cta-box" style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0, 51, 102, 0.9) 0%, rgba(0, 31, 63, 0.8) 100%), url(${Logo})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: 'clamp(40px, 8vw, 80px)', 
          borderRadius: 'var(--radius-xl)', 
          textAlign: 'center',
          color: 'white',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '24px', color: 'white' }}>Ready to Join Us?</h2>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', maxWidth: '600px', margin: '0 auto 40px', opacity: '0.9' }}>
            Whether you have a question or want to visit one of our branches, we are here for you.
          </p>
          <div className="cta-btns" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/contact" className="btn primary large" style={{ background: 'var(--accent)', color: 'var(--primary)', border: 'none' }}>
              Contact Us
            </Link>
            <Link to="/ask" className="btn secondary large" style={{ border: '2px solid white', color: 'white' }}>
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
