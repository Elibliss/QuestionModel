import { useState, useMemo } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { 
  Search, MessageCircle, CheckCircle, Clock, User, LogOut, Menu, X, 
  ChevronRight, ChevronDown, Send, Shield, Heart, MoreHorizontal, LayoutDashboard,
  Layers, Filter, Github, Twitter, Linkedin, Globe, Mail, Lock, ArrowLeft
} from 'lucide-react';

// --- Helper Functions ---
function formatDateTime(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// --- Components ---

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-logo">
            <MessageCircle size={20} color="var(--primary)" />
            <span>ExpertAsk</span>
          </div>
          <p>Connecting curiosity with expertise. Get verified answers from industry leaders.</p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <a href="#">Browse Topics</a>
          <a href="#">How it Works</a>
          <a href="#">Expert Directory</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Github size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ExpertAsk Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

function NavBar({ user, onLogout, onLoginClick }) {
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <div className="logo-icon">
          <MessageCircle size={24} color="white" />
        </div>
        <span className="logo-text">ExpertAsk</span>
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
          <button className="btn primary" onClick={onLoginClick}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

function LoginModal({ onClose, onClientLogin, onAdminLogin }) {
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());
        
        onClientLogin('google', userInfo.name);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    },
    onError: error => console.log('Login Failed:', error)
  });

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{adminMode ? 'Admin Portal' : 'Welcome Back'}</h2>
          <button onClick={onClose} className="close-btn"><X size={24}/></button>
        </div>

        {!adminMode ? (
          <div className="login-options">
            <button className="login-btn guest" onClick={() => onClientLogin('anonymous', 'Guest User')}>
              <User size={20} />
              <span>Continue as Guest</span>
            </button>
            <button className="login-btn google" onClick={() => login()}>
              <Globe size={20} />
              <span>Sign in with Google</span>
            </button>
            <button className="login-btn email" onClick={() => {
                 const email = prompt("Enter email:");
                 if(email) onClientLogin('email', email);
              }}>
              <Mail size={20} />
              <span>Sign in with Email</span>
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

function QuestionCard({ question, programName, onClick }) {
  return (
    <div className="card question-card" onClick={onClick}>
      <div className="q-header">
        <div className="q-user-info">
          <img 
            src={`https://ui-avatars.com/api/?name=${question.authorName}&background=random&color=fff`} 
            alt={question.authorName}
            className="avatar"
          />
          <div>
            <div className="q-author">{question.authorName}</div>
            <div className="q-meta-line">
              <span className="q-topic">{programName}</span>
              <span className="dot">•</span>
              <span className="q-time">{formatDateTime(question.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={`status-badge ${question.answer ? 'answered' : 'pending'}`}>
          {question.answer ? <CheckCircle size={14} /> : <Clock size={14} />}
          <span>{question.answer ? 'Answered' : 'Pending'}</span>
        </div>
      </div>
      
      <h3 className="q-title">{question.title}</h3>
      
      {question.answer && (
        <div className="q-preview-box">
          <div className="q-preview-header">
            <Shield size={14} className="admin-icon" />
            <span>Official Answer</span>
          </div>
          <p className="q-preview-text">{question.answer}</p>
        </div>
      )}
      
      <div className="q-footer">
        <div className="q-action">
           <MessageCircle size={16} />
           <span>Read full thread</span>
        </div>
      </div>
    </div>
  );
}

function QuestionDetail({ question, programName, onBack }) {
  if (!question) return null;

  return (
    <div className="detail-view">
      <button className="btn text-only" onClick={onBack}>
        <ArrowLeft size={16} style={{marginRight:'5px'}}/> Back to Feed
      </button>
      
      <div className="card detail-card">
        <div className="detail-header-row">
          <div className="user-profile large">
            <img 
              src={`https://ui-avatars.com/api/?name=${question.authorName}&background=random`} 
              alt="Author" 
              className="avatar medium"
            />
            <div>
              <h1 className="detail-title">{question.title}</h1>
              <div className="detail-meta-row">
                <span>{question.authorName}</span>
                <span className="dot">•</span>
                <span>{formatDateTime(question.createdAt)}</span>
                <span className="dot">•</span>
                <span className="topic-pill">{programName}</span>
              </div>
            </div>
          </div>
          <div className={`status-badge large ${question.answer ? 'answered' : 'pending'}`}>
             {question.answer ? 'Answered' : 'Awaiting Response'}
          </div>
        </div>

        <div className="question-body">
          <p>{question.text}</p>
        </div>

        {question.answer && (
          <div className="official-answer-box">
            <div className="answer-header">
              <div className="admin-profile">
                <div className="verified-badge">
                  <Shield size={16} color="white"/>
                </div>
                <div className="admin-info">
                  <strong>Official Response</strong>
                  <span>Verified Admin • {formatDateTime(question.answeredAt)}</span>
                </div>
              </div>
            </div>
            <div className="answer-content">
              {question.answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AskQuestionPage({ programs, onCancel, onSubmit }) {
  const [programId, setProgramId] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (!programId || !title) return alert("Please fill in required fields");
    onSubmit({ programId, title, text: details });
  };

  return (
    <div className="ask-page-container">
      <div className="card form-card">
        <div className="form-header">
          <h2>Ask a Question</h2>
          <p>Get verified answers from our expert team.</p>
        </div>
        
        <div className="field">
          <label>Select Topic</label>
          <div className="select-wrapper">
            <select value={programId} onChange={(e) => setProgramId(e.target.value)}>
              <option value="">Choose a category...</option>
              {programs.map(p => (
                <option key={p.id} value={p.id} disabled={!p.isOpen}>
                  {p.name} {p.isOpen ? '' : '(Closed)'}
                </option>
              ))}
            </select>
            <ChevronDown className="select-icon" size={16}/>
          </div>
        </div>

        <div className="field">
          <label>Question Title</label>
          <input 
            type="text" 
            placeholder="e.g. What are the requirements for..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Details (Optional)</label>
          <textarea 
            rows="5"
            placeholder="Provide any relevant context or background..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>

        <div className="button-row right-align">
          <button className="btn text-only" onClick={onCancel}>Cancel</button>
          <button className="btn primary" onClick={handleSubmit}>
            <Send size={16} style={{marginRight:'6px'}}/>
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ programs, questions, onCreateProgram, onAnswerQuestion, onToggleProgramStatus }) {
  const [activeTab, setActiveTab] = useState('questions'); 
  const [answerDraft, setAnswerDraft] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [newProgramName, setNewProgramName] = useState('');

  // Stats
  const totalQ = questions.length;
  const unansweredQ = questions.filter(q => !q.answer).length;
  const pendingQuestions = questions.filter(q => !q.answer);

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <h1><LayoutDashboard size={28} className="icon-mr"/> Admin Dashboard</h1>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><MessageCircle size={24} /></div>
          <div>
            <div className="stat-value">{totalQ}</div>
            <div className="stat-label">Total Questions</div>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon"><Clock size={24} /></div>
          <div>
            <div className="stat-value">{unansweredQ}</div>
            <div className="stat-label">Pending Answers</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Layers size={24} /></div>
          <div>
            <div className="stat-value">{programs.length}</div>
            <div className="stat-label">Active Topics</div>
          </div>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`} onClick={() => setActiveTab('questions')}>
          <MessageCircle size={18} /> Question Management
        </button>
        <button className={`tab-btn ${activeTab === 'topics' ? 'active' : ''}`} onClick={() => setActiveTab('topics')}>
          <Layers size={18} /> Topic Management
        </button>
      </div>

      {activeTab === 'questions' && (
        <div className="admin-split-view">
          <div className="sidebar-list">
            <div className="sidebar-header">
              <h3>Pending ({pendingQuestions.length})</h3>
            </div>
            <div className="list-scroll">
              {pendingQuestions.length === 0 && (
                 <div className="empty-mini">
                   <CheckCircle size={32} />
                   <p>All caught up!</p>
                 </div>
              )}
              {pendingQuestions.map(q => (
                <div 
                  key={q.id} 
                  className={`list-item-card ${selectedQuestionId === q.id ? 'active' : ''}`}
                  onClick={() => setSelectedQuestionId(q.id)}
                >
                   <div className="item-meta">
                     <span className="item-topic">{programs.find(p=>p.id == q.programId)?.name}</span>
                     <span className="item-author">{q.authorName}</span>
                   </div>
                   <div className="item-title">{q.title}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="main-editor">
            {selectedQuestionId ? (
              <div className="editor-container">
                <div className="editor-header">
                   <h3>Write Answer</h3>
                </div>
                <div className="q-context">
                   <div className="q-context-label">Question:</div>
                   <p className="q-context-text">{questions.find(q => q.id === selectedQuestionId)?.text}</p>
                </div>
                <div className="field">
                  <label>Your Answer</label>
                  <textarea 
                    rows="8"
                    value={answerDraft}
                    onChange={(e) => setAnswerDraft(e.target.value)}
                    placeholder="Write an authoritative answer here..."
                    className="rich-editor"
                  ></textarea>
                </div>
                <div className="editor-actions">
                  <button className="btn primary" onClick={() => {
                    onAnswerQuestion(selectedQuestionId, answerDraft);
                    setAnswerDraft('');
                    setSelectedQuestionId(null);
                  }}>
                    <Send size={16} /> Publish Answer
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state-large">
                <LayoutDashboard size={48} />
                <h3>Select a question</h3>
                <p>Choose a pending question from the left to write an answer.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="card topic-manager">
           <div className="topic-header">
             <h3>Manage Topics</h3>
             <p>Create and organize discussion fields.</p>
           </div>
           <div className="topic-list">
             {programs.map(p => (
               <div key={p.id} className="topic-item">
                 <div className="topic-info">
                   <div className="topic-name-row">
                     <strong>{p.name}</strong>
                     <span className={`status-pill ${p.isOpen ? 'open' : 'closed'}`}>
                       {p.isOpen ? 'Active' : 'Closed'}
                     </span>
                   </div>
                   <span className="topic-id">ID: {p.id}</span>
                 </div>
                 <div className="topic-actions">
                    <button 
                      className={`btn small ${p.isOpen ? 'outline-danger' : 'outline-success'}`}
                      onClick={() => onToggleProgramStatus(p.id)}
                    >
                      {p.isOpen ? 'End Session' : 'Start Session'}
                    </button>
                    <button className="btn icon-only"><MoreHorizontal size={16}/></button>
                 </div>
               </div>
             ))}
           </div>
           <div className="add-topic-form">
             <h4>Add New Topic</h4>
             <div className="input-group">
               <input 
                 placeholder="Topic Name (e.g. Health)" 
                 value={newProgramName}
                 onChange={(e) => setNewProgramName(e.target.value)}
               />
               <button className="btn primary" onClick={() => {
                 if(newProgramName) {
                   onCreateProgram({ name: newProgramName });
                   setNewProgramName('');
                 }
               }}>
                 <CheckCircle size={16} /> Add Topic
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
} 

function HomePage({ programs, questions, onQuestionClick, onAskClick, filter }) {
  const [currentFilter, setCurrentFilter] = useState('latest');

  const filteredQuestions = useMemo(() => {
    let q = [...questions];
    if (currentFilter === 'answered') q = q.filter(x => x.answer);
    if (currentFilter === 'unanswered') q = q.filter(x => !x.answer);
    return q.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [questions, currentFilter]);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Get Expert Answers to Your Questions</h1>
          <p>A community platform where industry leaders provide authoritative responses to your most pressing inquiries.</p>
          <div className="hero-actions">
            <button className="btn primary large" onClick={onAskClick}>
              Ask a Question <ChevronRight size={20} />
            </button>
            <div className="hero-stats">
              <div className="h-stat">
                <strong>{questions.filter(q=>q.answer).length}</strong>
                <span>Answered</span>
              </div>
              <div className="h-stat">
                <strong>{questions.length}</strong>
                <span>Questions</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image">
           <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team" loading="lazy" />
        </div>
      </div>

      <div className="feed-header">
        <h2>Recent Discussions</h2>
        <div className="filter-pills">
          <button className={`pill ${currentFilter === 'latest' ? 'active' : ''}`} onClick={() => setCurrentFilter('latest')}>
            All
          </button>
          <button className={`pill ${currentFilter === 'answered' ? 'active' : ''}`} onClick={() => setCurrentFilter('answered')}>
            <CheckCircle size={14} /> Answered
          </button>
          <button className={`pill ${currentFilter === 'unanswered' ? 'active' : ''}`} onClick={() => setCurrentFilter('unanswered')}>
            <Clock size={14} /> Pending
          </button>
        </div>
      </div>

      <div className="question-list">
        {filteredQuestions.map(q => (
          <QuestionCard 
            key={q.id} 
            question={q} 
            programName={programs.find(p => p.id === q.programId)?.name}
            onClick={() => onQuestionClick(q)}
          />
        ))}
        {filteredQuestions.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><Search size={48} /></div>
            <h3>No questions found</h3>
            <p>Try adjusting your filters or be the first to ask a new question!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main App ---

function App() {
  const [user, setUser] = useState(null); 
  const [view, setView] = useState('home'); // home, ask, detail, admin
  const [targetView, setTargetView] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Data State
  const [programs, setPrograms] = useState([
    { id: 1, name: "UI/UX Design", isOpen: true },
    { id: 2, name: "Web Development", isOpen: true },
    { id: 3, name: "Career Advice", isOpen: true }
  ]);
  
  const [questions, setQuestions] = useState([
    {
      id: 1, programId: 1, title: "Best tools for wireframing?", text: "I am looking for free alternatives to Figma.",
      authorName: "Alice", createdAt: "2023-10-10T10:00:00Z", answer: "Figma has a free tier, but Penpot is a great open-source alternative.", answeredAt: "2023-10-10T12:00:00Z"
    },
    {
      id: 2, programId: 2, title: "React vs Vue for beginners?", text: "Which one has a easier learning curve?",
      authorName: "Bob", createdAt: "2023-10-11T09:00:00Z", answer: null, answeredAt: null
    }
  ]);

  // Actions
  const handleClientLogin = (method, name) => {
    setUser({ role: 'client', method, name });
    setShowLogin(false);
  };

  const handleAdminLogin = (password) => {
    if (password === 'admin123') {
      setUser({ role: 'admin', name: 'Administrator' });
      setShowLogin(false);
      setView('admin');
    } else {
      alert('Incorrect Password');
    }
  };

  const handleAskSubmit = (data) => {
    if (!user) {
      alert("Please login to submit");
      setShowLogin(true);
      return;
    }
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
    setView('home');
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <NavBar 
          user={user} 
          onLogout={() => setShowLogoutConfirm(true)} 
          onLoginClick={() => setShowLogin(true)} 
        />

        <main>
          {user?.role === 'admin' ? (
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
          ) : (
            <>
              {view === 'home' && (
                <HomePage 
                  programs={programs} 
                  questions={questions}
                  onQuestionClick={(q) => { setSelectedQuestion(q); setView('detail'); }}
                  onAskClick={() => {
                    if(!user) setShowLogin(true);
                    else setView('ask');
                  }}
                  filter={null}
                />
              )}
              {view === 'ask' && (
                <AskQuestionPage 
                  programs={programs}
                  onCancel={() => setView('home')}
                  onSubmit={handleAskSubmit}
                />
              )}
              {view === 'detail' && (
                <QuestionDetail 
                  question={selectedQuestion}
                  programName={programs.find(p => p.id === selectedQuestion?.programId)?.name}
                  onBack={() => setView('home')}
                />
              )}
            </>
          )}
        </main>
      </div>

      <Footer />

      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onClientLogin={handleClientLogin}
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
                    <button className="btn primary" style={{background: 'var(--danger)', color: 'white'}} onClick={() => {
                        setUser(null);
                        setView('home');
                        setShowLogoutConfirm(false);
                    }}>Logout</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
