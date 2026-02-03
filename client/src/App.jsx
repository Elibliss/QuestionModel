import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { HomePage } from './pages/HomePage';
import { QuestionDetail } from './pages/QuestionDetail';
import { AskQuestionPage } from './pages/AskQuestionPage';
import { AdminDashboard } from './pages/AdminDashboard';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  
  // Navigation State
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activePage, setActivePage] = useState('home'); // 'home', 'detail', 'ask', 'admin'
  
  // Data State
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Multi-tenancy State
  const [company, setCompany] = useState(null);

  // 1. Handle URL Routing & Company Context
  useEffect(() => {
    const handleLocationChange = async () => {
      const path = window.location.pathname;
      setCurrentPath(path);

      // Parse Company Slug: /c/some-company
      const companyMatch = path.match(/^\/c\/([^/]+)/);
      const companySlug = companyMatch ? companyMatch[1] : null;

      let currentCompany = null;
      
      // Fetch Company if slug exists
      if (companySlug) {
        try {
          // Check if we already have the company loaded to avoid re-fetching
          if (company?.slug !== companySlug) {
            const res = await axios.get(`${API_URL}/companies/${companySlug}`);
            currentCompany = res.data;
            setCompany(currentCompany);
            
            // Apply Company Theme
            if (currentCompany) {
              document.documentElement.style.setProperty('--primary-color', currentCompany.primaryColor || '#2563eb');
              document.documentElement.style.setProperty('--secondary-color', currentCompany.secondaryColor || '#1e40af');
            }
          } else {
            currentCompany = company;
          }
        } catch (error) {
          console.error("Company not found", error);
          // Optional: Redirect to main platform or show error
        }
      } else {
        setCompany(null);
        document.documentElement.style.removeProperty('--primary-color');
        document.documentElement.style.removeProperty('--secondary-color');
      }

      // Determine active page based on URL
      // Simple logic: 
      // /c/slug/ask -> ask
      // /c/slug/q/id -> detail
      // /c/slug -> home
      // /admin -> admin
      
      if (path.includes('/ask')) setActivePage('ask');
      else if (path.includes('/admin')) setActivePage('admin');
      else if (path.includes('/q/')) {
        // We'll handle fetching the specific question in the data fetcher or separate effect
        // For now, let's just set the view to detail
        setActivePage('detail');
      } else {
        setActivePage('home');
      }
      
      // Trigger Data Fetch with correct context
      fetchData(currentCompany?.id);
    };

    handleLocationChange();

    // Listen for browser back/forward
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [window.location.pathname]); // Dependency on pathname might not trigger on pushState, so we rely on manual updates or popstate

  // Helper to fetch data
  const fetchData = async (companyId) => {
    setLoading(true);
    try {
      const params = companyId ? { companyId } : {};
      const [progRes, questRes] = await Promise.all([
        axios.get(`${API_URL}/programs`, { params }),
        axios.get(`${API_URL}/questions`, { params })
      ]);
      setPrograms(progRes.data);
      setQuestions(questRes.data);
      
      // If we are in detail view, try to find the question from URL if selectedQuestion is null
      const path = window.location.pathname;
      if (path.includes('/q/')) {
         // path format: /q/123 or /c/slug/q/123
         const parts = path.split('/');
         const qIndex = parts.indexOf('q');
         if (qIndex !== -1 && parts[qIndex + 1]) {
            const qId = parts[qIndex + 1];
            // Find in fetched questions
            const q = questRes.data.find(item => (item.id == qId || item._id == qId));
            if (q) setSelectedQuestion(q);
         }
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Custom Navigation Helper
  const navigate = (url) => {
    window.history.pushState({}, '', url);
    // Dispatch a popstate event so our useEffect picks it up, OR just manually trigger logic
    // Dispatching popstate doesn't work for pushState usually, so we force update
    const event = new PopStateEvent('popstate');
    window.dispatchEvent(event);
  };

  const handleLogin = async (type, data) => {
    const payload = { ...data, companyId: company?.id };
    if (type === 'google') {
       try {
         const res = await axios.post(`${API_URL}/auth/google`, payload);
         setUser({ ...res.data, role: res.data.role || 'user' });
       } catch (e) {
         console.error("Auth error", e);
         setUser({ ...payload, role: 'user' });
       }
    } else if (type === 'anonymous') {
       setUser({ name: 'Guest', role: 'guest' });
    } else if (type === 'email') {
       setUser({ name: data, role: 'user' });
    }
    setShowLogin(false);
  };

  const handleAdminLogin = (password) => {
    if (password === 'admin123') {
      setUser({ name: 'Administrator', role: 'admin' });
      setShowLogin(false);
      navigate(company ? `/c/${company.slug}/admin` : '/admin');
    } else {
      alert('Invalid password');
    }
  };

  const handleAskSubmit = async (data) => {
    const newQ = {
      programId: data.programId,
      title: data.title,
      text: data.text,
      authorName: user?.name || 'Anonymous',
      authorId: user?.googleId || 'anon',
      authorAvatar: user?.picture,
      companyId: company?.id
    };

    try {
      const res = await axios.post(`${API_URL}/questions`, newQ);
      setQuestions([res.data, ...questions]);
      navigate(company ? `/c/${company.slug}` : '/');
    } catch (error) {
      console.error("Error submitting question", error);
      alert("Failed to submit question.");
    }
  };

  const handleAnswerQuestion = async (id, answerText) => {
    try {
      const res = await axios.patch(`${API_URL}/questions/${id}/answer`, { answer: answerText });
      setQuestions(questions.map(q => (q._id || q.id) === id ? res.data : q));
    } catch (error) {
      console.error("Error answering question", error);
    }
  };

  const handleCreateProgram = async (data) => {
    try {
      const payload = { ...data, companyId: company?.id };
      const res = await axios.post(`${API_URL}/programs`, payload);
      setPrograms([...programs, res.data]);
    } catch (error) {
      console.error("Error creating program", error);
    }
  };

  const handleToggleProgram = async (id) => {
    const prog = programs.find(p => (p._id || p.id) === id);
    if (!prog) return;
    try {
       const res = await axios.patch(`${API_URL}/programs/${id}`, { isOpen: !prog.isOpen });
       setPrograms(programs.map(p => (p._id || p.id) === id ? res.data : p));
    } catch (error) {
       console.error("Error toggling program", error);
    }
  };

  // --- Render ---

  if (loading && programs.length === 0) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="app-container">
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onClientLogin={handleLogin}
          onAdminLogin={handleAdminLogin}
        />
      )}

      <NavBar 
        user={user} 
        company={company}
        onLogout={() => { 
            setUser(null); 
            navigate(company ? `/c/${company.slug}` : '/'); 
        }} 
        onLoginClick={() => setShowLogin(true)}
        onHomeClick={() => navigate(company ? `/c/${company.slug}` : '/')}
      />

      <main className="page">
        {activePage === 'home' && (
          <HomePage 
            programs={programs}
            questions={questions}
            onQuestionClick={(q) => { 
                setSelectedQuestion(q); 
                navigate(company ? `/c/${company.slug}/q/${q.id}` : `/q/${q.id}`);
            }}
            onAskClick={() => {
              if(!user) setShowLogin(true);
              else navigate(company ? `/c/${company.slug}/ask` : '/ask');
            }}
          />
        )}

        {activePage === 'detail' && (
          <QuestionDetail 
            question={selectedQuestion}
            programName={programs.find(p => (p._id || p.id) === selectedQuestion?.programId)?.name}
            onBack={() => navigate(company ? `/c/${company.slug}` : '/')}
          />
        )}

        {activePage === 'ask' && (
          <AskQuestionPage 
            programs={programs}
            onCancel={() => navigate(company ? `/c/${company.slug}` : '/')}
            onSubmit={handleAskSubmit}
          />
        )}

        {activePage === 'admin' && (
          <AdminDashboard 
             programs={programs}
             questions={questions}
             onCreateProgram={handleCreateProgram}
             onAnswerQuestion={handleAnswerQuestion}
             onToggleProgramStatus={handleToggleProgram}
          />
        )}
      </main>

      <Footer companyName={company?.name} />
    </div>
  );
}

export default App;
