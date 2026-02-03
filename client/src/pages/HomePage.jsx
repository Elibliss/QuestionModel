import { useState, useMemo } from 'react';
import { ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { QuestionCard } from '../components/QuestionCard';

export function HomePage({ programs, questions, onQuestionClick, onAskClick }) {
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
        {filteredQuestions.length === 0 ? (
          <div className="empty-state">
             <p>No questions found.</p>
          </div>
        ) : (
          filteredQuestions.map(q => (
            <QuestionCard 
              key={q._id || q.id} 
              question={q} 
              programName={programs.find(p => (p._id || p.id) === q.programId)?.name}
              onClick={() => onQuestionClick(q)}
            />
          ))
        )}
      </div>
    </div>
  );
}
