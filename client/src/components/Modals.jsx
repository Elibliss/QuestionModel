import React, { useState } from 'react';
import { X, User, Phone, BookOpen, GraduationCap } from 'lucide-react';

export function UserRegistrationModal({ onClose, onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    school: '',
    isUndergraduate: 'yes',
    gender: 'male'
  });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.number || !formData.school) {
      setError('Please fill in all required fields');
      return;
    }
    onRegister(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h2>Registration for Questions</h2>
          <button onClick={onClose} className="close-btn"><X size={24}/></button>
        </div>
        
        <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
          Please provide your details to start asking questions.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="field">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Gender</label>
            <div className="input-with-icon">
              <User size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Phone Number</label>
            <div className="input-with-icon">
              <Phone size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
              <input 
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="field">
            <label>School</label>
            <div className="input-with-icon">
              <BookOpen size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
              <input 
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Enter your school name"
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Are you an Undergraduate?</label>
            <div className="input-with-icon">
              <GraduationCap size={18} style={{ opacity: 0.5, marginRight: '10px' }} />
              <select 
                name="isUndergraduate"
                value={formData.isUndergraduate}
                onChange={handleChange}
                style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
              >
                <option value="yes">Yes, I am an undergraduate</option>
                <option value="no">No, I am not an undergraduate</option>
              </select>
            </div>
          </div>

          {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem', margin: 0 }}>{error}</p>}

          <button type="submit" className="btn primary full-width" style={{ marginTop: '10px' }}>
            Register and Continue
          </button>
        </form>
      </div>
    </div>
  );
}

// Keeping Admin Login for internal use if needed, but the request says "no login for the website"
// We'll keep it simple and just use the registration modal for users.
export function AdminLoginModal({ onClose, onAdminLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onAdminLogin(password);
    if (!ok) setError('Incorrect admin password');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h2>Admin Access</h2>
          <button onClick={onClose} className="close-btn"><X size={24}/></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="field">
            <label>Admin Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem', margin: 0 }}>{error}</p>}
          <button type="submit" className="btn primary full-width">Access Dashboard</button>
        </form>
      </div>
    </div>
  );
}
