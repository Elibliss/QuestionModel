import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { X, User, Lock, Shield } from 'lucide-react';

export function LoginModal({ onClose, onClientLogin, onAdminLogin }) {
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      // decoded contains: name, email, picture, sub (googleId), etc.
      onClientLogin('google', {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        googleId: decoded.sub
      });
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{adminMode ? 'Admin Portal' : 'Welcome Back'}</h2>
          <button onClick={onClose} className="close-btn"><X size={24}/></button>
        </div>

        {!adminMode ? (
          <div className="login-options">
            <div style={{ marginBottom: '16px', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
              />
            </div>

            <button className="login-btn guest" onClick={() => onClientLogin('anonymous', { name: 'Guest User' })}>
              <User size={20} />
              <span>Continue as Guest</span>
            </button>
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <button className="btn text-only" onClick={() => setAdminMode(true)}>
              <Shield size={14} style={{marginRight:'4px'}}/> Admin Access
            </button>
          </div>
        ) : (
          <div className="admin-login-form">
            <div className="field">
              <label>Admin Password <span style={{fontWeight:'normal', fontSize:'0.85em', color:'var(--text-muted)'}}>(Demo: admin123)</span></label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon"/>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button className="btn primary full-width" onClick={() => onAdminLogin(password)} disabled={!password}>
              Access Dashboard
            </button>
            <button className="btn text-only" onClick={() => setAdminMode(false)}>
              Back to User Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
