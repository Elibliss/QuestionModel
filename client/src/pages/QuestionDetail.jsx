import React from 'react';
import { ArrowLeft, CheckCircle, Clock, Shield } from 'lucide-react';

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
    <div className="detail-view page" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <button className="btn text-only" onClick={onBack} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px', color: 'var(--text-secondary)', fontWeight: '600' }}>
        <ArrowLeft size={16} /> Back to Feed
      </button>
      
      <div className="card detail-card" style={{ padding: '40px', background: 'white', borderRadius: 'var(--radius-xl)' }}>
        <div className="detail-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div className="user-profile large" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <img 
              src={`https://ui-avatars.com/api/?name=${question.authorName}&background=random`} 
              alt="Author" 
              className="avatar medium"
              style={{ width: '64px', height: '64px', borderRadius: '50%' }}
            />
            <div>
              <h1 className="detail-title" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '8px' }}>{question.title}</h1>
              <div className="detail-meta-row" style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{question.authorName}</span>
                <span className="dot">•</span>
                <span>{formatDateTime(question.createdAt)}</span>
                <span className="dot">•</span>
                <span className="topic-pill" style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '20px', fontWeight: '700' }}>{programName}</span>
              </div>
            </div>
          </div>
          <div className={`status-badge large ${question.answer ? 'answered' : 'pending'}`} style={{ 
            display: 'flex', gap: '8px', alignItems: 'center', padding: '8px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '700',
            background: question.answer ? 'var(--success-bg)' : 'var(--warning-bg)',
            color: question.answer ? 'var(--success)' : 'var(--warning)'
          }}>
             {question.answer ? 'Answered' : 'Awaiting Response'}
          </div>
        </div>

        <div className="question-body" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '48px', whiteSpace: 'pre-wrap' }}>
          {question.text}
        </div>

        {question.answer && (
          <div className="official-answer-box">
            <div className="answer-header">
              <div className="admin-profile">
                <div className="verified-badge">
                  <Shield size={20} color="white"/>
                </div>
                <div className="admin-info">
                  <strong>Official Response</strong>
                  <span>Verified Admin • {formatDateTime(question.answeredAt)}</span>
                </div>
              </div>
            </div>
            <div className="answer-content" style={{ whiteSpace: 'pre-wrap' }}>
              {question.answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
