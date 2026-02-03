import { CheckCircle, Clock, Shield, MessageCircle } from 'lucide-react';

function formatDateTime(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

export function QuestionCard({ question, programName, onClick }) {
  return (
    <div className="card question-card" onClick={onClick}>
      <div className="q-header">
        <div className="q-user-info">
          <img 
            src={question.authorAvatar || `https://ui-avatars.com/api/?name=${question.authorName}&background=random&color=fff`} 
            alt={question.authorName}
            className="avatar"
          />
          <div>
            <div className="q-author">{question.authorName}</div>
            <div className="q-meta-line">
              <span className="q-topic">{programName || 'General'}</span>
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
