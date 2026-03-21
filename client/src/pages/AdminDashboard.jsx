import React, { useState } from 'react';
import { LayoutDashboard, MessageCircle, Clock, Layers, Send, CheckCircle, MoreHorizontal } from 'lucide-react';

export function AdminDashboard({ programs, questions, onCreateProgram, onAnswerQuestion, onToggleProgramStatus }) {
  const [activeTab, setActiveTab] = useState('questions'); 
  const [answerDraft, setAnswerDraft] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [newProgramName, setNewProgramName] = useState('');
  const [creatingTag, setCreatingTag] = useState(false);

  // Stats
  const totalQ = questions.length;
  const unansweredQ = questions.filter(q => !q.answer).length;
  const pendingQuestions = questions.filter(q => !q.answer);

  return (
    <div className="admin-layout page">
      <div className="admin-header" style={{ marginBottom: '40px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--primary)' }}>
          <LayoutDashboard size={32} /> Admin Dashboard
        </h1>
      </div>
      
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="stat-card card" style={{ padding: '24px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '12px', borderRadius: '12px' }}><MessageCircle size={24} /></div>
          <div>
            <div className="stat-value" style={{ fontSize: '1.5rem', fontWeight: '800' }}>{totalQ}</div>
            <div className="stat-label" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Questions</div>
          </div>
        </div>
        <div className="stat-card card warning" style={{ padding: '24px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)', padding: '12px', borderRadius: '12px' }}><Clock size={24} /></div>
          <div>
            <div className="stat-value" style={{ fontSize: '1.5rem', fontWeight: '800' }}>{unansweredQ}</div>
            <div className="stat-label" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pending Answers</div>
          </div>
        </div>
        <div className="stat-card card" style={{ padding: '24px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="stat-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '12px', borderRadius: '12px' }}><Layers size={24} /></div>
          <div>
            <div className="stat-value" style={{ fontSize: '1.5rem', fontWeight: '800' }}>{programs.length}</div>
            <div className="stat-label" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Topics</div>
          </div>
        </div>
      </div>

      <div className="admin-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`} onClick={() => setActiveTab('questions')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageCircle size={18} /> Question Management
        </button>
        <button className={`tab-btn ${activeTab === 'topics' ? 'active' : ''}`} onClick={() => setActiveTab('topics')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} /> Topic Management
        </button>
      </div>

      {activeTab === 'questions' && (
        <div className="admin-split-view" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
          <div className="sidebar-list card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="sidebar-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ margin: 0 }}>Pending ({pendingQuestions.length})</h3>
            </div>
            <div className="list-scroll" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {pendingQuestions.length === 0 && (
                 <div className="empty-mini" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                   <CheckCircle size={32} style={{ marginBottom: '10px' }} />
                   <p>All caught up!</p>
                 </div>
              )}
              {pendingQuestions.map(q => (
                <div 
                  key={q.id} 
                  className={`list-item-card ${selectedQuestionId === q.id ? 'active' : ''}`}
                  onClick={() => setSelectedQuestionId(q.id)}
                  style={{ 
                    padding: '20px', borderBottom: '1px solid var(--border)', cursor: 'pointer',
                    background: selectedQuestionId === q.id ? 'var(--primary-light)' : 'transparent'
                  }}
                >
                   <div className="item-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                     <span className="item-topic" style={{ color: 'var(--accent)', fontWeight: '700' }}>{programs.find(p=>p.id == q.programId)?.name}</span>
                     <span className="item-author" style={{ color: 'var(--text-secondary)' }}>{q.authorName}</span>
                   </div>
                   <div className="item-title" style={{ fontWeight: '600', color: 'var(--text-main)' }}>{q.title}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="main-editor">
            {selectedQuestionId ? (
              <div className="editor-container card" style={{ padding: '40px' }}>
                <div className="editor-header" style={{ marginBottom: '30px' }}>
                   <h3 style={{ margin: 0 }}>Write Answer</h3>
                </div>
                <div className="q-context" style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', marginBottom: '30px' }}>
                   <div className="q-context-label" style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--primary)' }}>Question:</div>
                   <p className="q-context-text" style={{ margin: 0, color: 'var(--text-secondary)' }}>{questions.find(q => q.id === selectedQuestionId)?.text}</p>
                </div>
                <div className="field">
                  <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700' }}>Your Answer</label>
                  <textarea 
                    rows="8"
                    value={answerDraft}
                    onChange={(e) => setAnswerDraft(e.target.value)}
                    placeholder="Write an authoritative answer here..."
                    className="rich-editor input"
                    style={{ width: '100%' }}
                  ></textarea>
                </div>
                <div className="editor-actions" style={{ marginTop: '30px' }}>
                  <button className="btn primary large" onClick={() => {
                    onAnswerQuestion(selectedQuestionId, answerDraft);
                    setAnswerDraft('');
                    setSelectedQuestionId(null);
                  }} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Send size={16} /> Publish Answer
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state-large card" style={{ padding: '100px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <LayoutDashboard size={64} style={{ marginBottom: '20px', opacity: 0.2 }} />
                <h3>Select a question</h3>
                <p>Choose a pending question from the left to write an answer.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="card topic-manager" style={{ padding: '40px' }}>
           <div className="topic-header" style={{ marginBottom: '40px' }}>
             <h3 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--primary)' }}>Manage Topics</h3>
             <p style={{ color: 'var(--text-secondary)' }}>Create and organize discussion fields.</p>
           </div>

           <div className="topic-list" style={{ display: 'grid', gap: '15px', marginBottom: '40px' }}>
             {programs.map(p => (
               <div key={p.id} className="topic-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px' }}>
                 <div className="topic-info">
                   <div className="topic-name-row" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                     <strong style={{ fontSize: '1.1rem' }}>{p.name}</strong>
                     <span className={`status-pill ${p.isOpen ? 'open' : 'closed'}`} style={{ 
                       fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', fontWeight: '700',
                       background: p.isOpen ? 'var(--success-bg)' : 'var(--danger-bg)',
                       color: p.isOpen ? 'var(--success)' : 'var(--danger)'
                     }}>
                       {p.isOpen ? 'Active' : 'Closed'}
                     </span>
                   </div>
                   <span className="topic-id" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {p.id}</span>
                 </div>
                 <div className="topic-actions" style={{ display: 'flex', gap: '10px' }}>
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

           <div className="add-topic-form" style={{ borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
             <h4 style={{ marginBottom: '20px' }}>Add New Topic</h4>
             <div className="input-group" style={{ display: 'flex', gap: '10px' }}>
               <input 
                 className="input"
                 style={{ flex: 1, margin: 0 }}
                 placeholder="Topic Name (e.g. Spiritual Growth)" 
                 value={newProgramName}
                 onChange={(e) => setNewProgramName(e.target.value)}
               />
               <button className="btn primary" onClick={() => {
                 if(newProgramName) {
                   onCreateProgram({ name: newProgramName });
                   setNewProgramName('');
                 }
               }}>
                 <CheckCircle size={16} style={{ marginRight: '8px' }} /> Add Topic
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
