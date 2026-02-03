import { ArrowLeft, Shield } from 'lucide-react';

function formatDateTime(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

export function QuestionDetail({ question, programName, onBack }) {
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
              src={question.authorAvatar || `https://ui-avatars.com/api/?name=${question.authorName}&background=random`} 
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
                <span className="topic-pill">{programName || 'General'}</span>
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
