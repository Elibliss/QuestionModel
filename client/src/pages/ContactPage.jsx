import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '24px' }}>Get In Touch</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          We'd love to hear from you. Whether you have a question about our branches, 
          events, or simply want to say hello, we're here to help.
        </p>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div className="card" style={{ padding: 'clamp(20px, 5vw, 40px)', background: 'var(--primary)', color: 'white' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '32px', color: 'var(--accent)' }}>Contact Info</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>
                  <Mail size={24} color="var(--accent)" />
                </div>
                <div>
                  <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Email Us</p>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>info@eastmandate.org</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>
                  <Phone size={24} color="var(--accent)" />
                </div>
                <div>
                  <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Call Us</p>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>+234 800 123 4567</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>
                  <MapPin size={24} color="var(--accent)" />
                </div>
                <div>
                  <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Our Head Office</p>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>Plot 23 Liberty Estate Phase 1, Enugu</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '0 20px' }}>
            <h3 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Join Our Newsletter</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Stay updated with our latest events and spiritual insights.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input" 
                style={{ flex: '1 1 200px', margin: 0 }}
              />
              <button className="btn primary" style={{ flex: '1 1 auto' }}>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 'clamp(30px, 8vw, 60px)' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '40px', color: 'var(--primary)' }}>Send a Message</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name" 
                  className="input" 
                  required
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com" 
                  className="input" 
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?" 
                className="input" 
                required
              />
            </div>
            
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..." 
                className="input" 
                rows="6"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn primary large" style={{ alignSelf: 'flex-start', display: 'flex', gap: '10px', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
