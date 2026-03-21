import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { X } from 'lucide-react';

// Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { UserRegistrationModal, AdminLoginModal } from './components/Modals';

// Pages
import { HomePage } from './pages/HomePage';
import { EventPage } from './pages/EventPage';
import { BranchesPage } from './pages/BranchesPage';
import { ContactPage } from './pages/ContactPage';
import { QuestionModelPage } from './pages/QuestionModelPage';
import { AskQuestionPage } from './pages/AskQuestionPage';
import { QuestionDetail } from './pages/QuestionDetail';
import { AdminDashboard } from './pages/AdminDashboard';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('emg_user');
    return saved ? JSON.parse(saved) : null;
  }); 
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Data State (Mock data for demo)
  const [programs, setPrograms] = useState([
    { id: 1, name: "Spiritual Growth", isOpen: true },
    { id: 2, name: "Restoration & Transformation", isOpen: true },
    { id: 3, name: "Prophetic Teachings", isOpen: true },
    { id: 4, name: "Grace & Empowerment", isOpen: true }
  ]);
  
  const [questions, setQuestions] = useState([
    {
      id: 1, programId: 1, title: "How to stay consistent in prayer?", text: "I find it difficult to maintain a daily prayer routine. Any tips?",
      authorName: "Alice", createdAt: "2026-03-10T10:00:00Z", answer: "Consistency comes from discipline and setting a specific time and place. Start small, even 5-10 minutes a day.", answeredAt: "2026-03-10T12:00:00Z"
    },
    {
      id: 2, programId: 3, title: "Understanding the Wheels of God?", text: "Can you explain more about the 'Will and Wheels of God' concept?",
      authorName: "Bob", createdAt: "2026-03-11T09:00:00Z", answer: null, answeredAt: null
    }
  ]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') setShowAdminLogin(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleRegister = (data) => {
    const newUser = { ...data, role: 'user' };
    setUser(newUser);
    localStorage.setItem('emg_user', JSON.stringify(newUser));
    setShowRegistration(false);
    navigate('/ask');
  };

  const handleAdminLogin = (password) => {
    if (password === 'admin123') {
      const adminUser = { name: 'Administrator', role: 'admin' };
      setUser(adminUser);
      setShowAdminLogin(false);
      navigate('/admin');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('emg_user');
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleAskSubmit = (data) => {
    const newQ = {
      id: Date.now(),
      programId: parseInt(data.programId),
      title: data.title,
      text: data.text,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      answer: null, answeredAt: null
    };
    setQuestions([newQ, ...questions]);
    navigate('/ask');
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <NavBar 
          user={user} 
          onLogout={() => setShowLogoutConfirm(true)} 
        />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ask" element={
              <QuestionModelPage 
                programs={programs} 
                questions={questions}
                onQuestionClick={(q) => { setSelectedQuestion(q); navigate(`/question/${q.id}`); }}
                onAskClick={() => {
                  if(!user) setShowRegistration(true);
                  else navigate('/ask-new');
                }}
              />
            } />
            <Route path="/ask-new" element={
              user ? (
                <AskQuestionPage 
                  programs={programs}
                  onCancel={() => navigate('/ask')}
                  onSubmit={handleAskSubmit}
                />
              ) : <Navigate to="/ask" />
            } />
            <Route path="/question/:id" element={
              <QuestionDetail 
                question={selectedQuestion}
                programName={programs.find(p => p.id === selectedQuestion?.programId)?.name}
                onBack={() => navigate('/ask')}
              />
            } />
            <Route path="/admin" element={
              user?.role === 'admin' ? (
                <AdminDashboard 
                  programs={programs}
                  questions={questions}
                  onCreateProgram={(p) => setPrograms([...programs, { ...p, id: Date.now(), isOpen: true }])}
                  onToggleProgramStatus={(id) => {
                    setPrograms(programs.map(p => p.id === id ? { ...p, isOpen: !p.isOpen } : p));
                  }}
                  onAnswerQuestion={(id, ans) => {
                    setQuestions(questions.map(q => q.id === id ? { ...q, answer: ans, answeredAt: new Date().toISOString() } : q));
                  }}
                />
              ) : <Navigate to="/" />
            } />
          </Routes>
        </main>
      </div>

      <Footer />

      {showRegistration && (
        <UserRegistrationModal 
          onClose={() => setShowRegistration(false)}
          onRegister={handleRegister}
        />
      )}

      {showAdminLogin && (
        <AdminLoginModal 
          onClose={() => setShowAdminLogin(false)}
          onAdminLogin={handleAdminLogin}
        />
      )}

      {showLogoutConfirm && (
        <div className="modal-overlay">
            <div className="modal-card" style={{maxWidth: '400px'}}>
                <div className="modal-header">
                    <h2>Confirm Logout</h2>
                    <button onClick={() => setShowLogoutConfirm(false)} className="close-btn"><X size={24}/></button>
                </div>
                <div style={{padding: '20px 0'}}>
                    <p>Are you sure you want to log out?</p>
                </div>
                <div className="button-row">
                    <button className="btn text-only" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                    <button className="btn primary" style={{background: 'var(--danger)', color: 'white'}} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
