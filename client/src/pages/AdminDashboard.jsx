import { useState } from 'react';
import { LayoutDashboard, MessageCircle, Clock, Layers, CheckCircle, MoreHorizontal, Send } from 'lucide-react';

export function AdminDashboard({ programs, questions, onCreateProgram, onAnswerQuestion, onToggleProgramStatus }) {
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
                  key={q._id || q.id} 
                  className={`list-item-card ${selectedQuestionId === (q._id || q.id) ? 'active' : ''}`}
                  onClick={() => setSelectedQuestionId(q._id || q.id)}
                >
                   <div className="item-meta">
                     <span className="item-topic">{programs.find(p => (p._id || p.id) === q.programId)?.name}</span>
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
                   <p className="q-context-text">{questions.find(q => (q._id || q.id) === selectedQuestionId)?.text}</p>
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
               <div key={p._id || p.id} className="topic-item">
                 <div className="topic-info">
                   <div className="topic-name-row">
                     <strong>{p.name}</strong>
                     <span className={`status-pill ${p.isOpen ? 'open' : 'closed'}`}>
                       {p.isOpen ? 'Active' : 'Closed'}
                     </span>
                   </div>
                   <span className="topic-id">ID: {p._id || p.id}</span>
                 </div>
                 <div className="topic-actions">
                    <button 
                      className={`btn small ${p.isOpen ? 'outline-danger' : 'outline-success'}`}
                      onClick={() => onToggleProgramStatus(p._id || p.id)}
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
