import { MessageCircle, User, LogOut } from 'lucide-react';

export function NavBar({ user, company, onLogout, onLoginClick, onHomeClick }) {
  return (
    <nav className="nav-bar">
      <div className="nav-logo" onClick={onHomeClick} style={{cursor: 'pointer'}}>
        <div className="logo-icon">
          {company?.logo ? (
             <img src={company.logo} alt="logo" style={{width: 24, height: 24, borderRadius: 4}} />
          ) : (
             <MessageCircle size={24} color="white" />
          )}
        </div>
        <span className="logo-text">{company ? company.name : 'ExpertAsk'}</span>
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <div className="user-pill">
              {user.picture ? (
                 <img src={user.picture} alt={user.name} className="avatar-small" style={{width: 24, height: 24, borderRadius: '50%'}} />
              ) : (
                 <User size={16} />
              )}
              <span>{user.name}</span>
            </div>
            <button className="btn icon-btn" onClick={onLogout} title="Logout">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <button className="btn primary" onClick={onLoginClick}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
