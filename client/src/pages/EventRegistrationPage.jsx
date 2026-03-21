import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Phone, BookOpen, GraduationCap, Calendar, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';

export function EventRegistrationPage({ events, onRegister }) {
  const { eventId } = useParams();
  const event = events.find(e => e.id === eventId);
  
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    school: '',
    isUndergraduate: 'yes',
    gender: 'male'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!event) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Event Not Found</h2>
        <p>The registration link might be incorrect or the event has ended.</p>
        <Link to="/" className="btn primary">Go to Home</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(eventId, formData);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="page" style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '60px 40px' }}>
          <div style={{ background: 'var(--success-bg)', color: 'var(--success)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
            <CheckCircle size={48} />
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '16px' }}>Registration Successful!</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            Thank you for registering for <strong>{event.title}</strong>. We look forward to seeing you!
          </p>
          <Link to="/" className="btn primary large">Back to Website</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: '1000px', margin: '60px auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'start' }}>
        
        {/* Event Details */}
        <div className="event-info-card">
          <Link to="/" className="btn text-only" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '30px', padding: 0 }}>
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <span style={{ color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Event Registration</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--primary)', margin: '15px 0 30px', lineHeight: '1.1' }}>{event.title}</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
                <Calendar size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Date & Time</div>
                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ background: 'var(--accent-light)', padding: '12px', borderRadius: '12px', color: 'var(--accent)' }}>
                <MapPin size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Location</div>
                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{event.location}</div>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            {event.description}
          </p>
        </div>

        {/* Registration Form */}
        <div className="card" style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', color: 'var(--primary)' }}>Register Now</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="field">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
              </div>
            </div>

            <div className="field">
              <label>Gender</label>
              <div className="input-with-icon">
                <User size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
                <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <Phone size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
                <input name="number" value={formData.number} onChange={handleChange} placeholder="Enter your phone" required />
              </div>
            </div>

            <div className="field">
              <label>School / Institution</label>
              <div className="input-with-icon">
                <BookOpen size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
                <input name="school" value={formData.school} onChange={handleChange} placeholder="Your school name" required />
              </div>
            </div>

            <div className="field">
              <label>Educational Status</label>
              <div className="input-with-icon">
                <GraduationCap size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
                <select name="isUndergraduate" value={formData.isUndergraduate} onChange={handleChange} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}>
                  <option value="yes">Undergraduate</option>
                  <option value="no">Graduate / Professional</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn primary large" style={{ marginTop: '10px' }}>Complete Registration</button>
          </form>
        </div>

      </div>
    </div>
  );
}
