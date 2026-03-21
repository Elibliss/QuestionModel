import React, { useState, useMemo } from 'react';
import { Search, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { QuestionCard } from '../components/QuestionCard';

export function QuestionModelPage({ programs, questions, onQuestionClick, onAskClick }) {
  const [currentFilter, setCurrentFilter] = useState('latest');

  const filteredQuestions = useMemo(() => {
    let q = [...questions];
    if (currentFilter === 'answered') q = q.filter(x => x.answer);
    if (currentFilter === 'unanswered') q = q.filter(x => !x.answer);
    return q.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [questions, currentFilter]);

  return (
    <div className="page">
      <div className="hero-section hero-pro" style={{ marginBottom: '40px' }}>
        <div className="hero-content">
          <h1 style={{ color: 'var(--primary)' }}>Question Model Platform</h1>
          <p>Get authoritative answers to your spiritual and community-related questions from our expert team.</p>
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
      </div>

      <div className="feed-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ color: 'var(--primary)' }}>Recent Discussions</h2>
        <div className="filter-pills" style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px', maxWidth: '100%' }}>
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

      <div className="question-list" style={{ display: 'grid', gap: '20px' }}>
        {filteredQuestions.map(q => (
          <QuestionCard 
            key={q.id} 
            question={q} 
            programName={programs.find(p => p.id === q.programId)?.name}
            onClick={() => onQuestionClick(q)}
          />
        ))}
        {filteredQuestions.length === 0 && (
          <div className="empty-state" style={{ textAlign: 'center', padding: '60px' }}>
            <div className="empty-icon" style={{ marginBottom: '20px', color: 'var(--text-muted)' }}><Search size={48} /></div>
            <h3>No questions found</h3>
            <p>Try adjusting your filters or be the first to ask a new question!</p>
          </div>
        )}
      </div>
    </div>
  );
}
