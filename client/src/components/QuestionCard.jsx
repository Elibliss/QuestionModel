import React from 'react';
import { MessageCircle, CheckCircle, Clock, Shield } from 'lucide-react';

function formatDateTime(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

export function QuestionCard({ question, programName, onClick }) {
  return (
    <div className="card question-card" onClick={onClick} style={{ padding: 'clamp(16px, 4vw, 24px)', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
      <div className="q-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div className="q-user-info" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img 
            src={`https://ui-avatars.com/api/?name=${question.authorName}&background=random&color=fff`} 
            alt={question.authorName}
            className="avatar"
            style={{ width: 'clamp(32px, 10vw, 40px)', height: 'clamp(32px, 10vw, 40px)', borderRadius: '50%' }}
          />
          <div>
            <div className="q-author" style={{ fontWeight: '700', fontSize: 'clamp(0.9rem, 3vw, 1rem)', color: 'var(--text-main)' }}>{question.authorName}</div>
            <div className="q-meta-line" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="q-topic" style={{ color: 'var(--accent)', fontWeight: '600' }}>{programName}</span>
              <span className="dot">•</span>
              <span className="q-time">{formatDateTime(question.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={`status-badge ${question.answer ? 'answered' : 'pending'}`} style={{ 
          display: 'flex', gap: '6px', alignItems: 'center', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600',
          background: question.answer ? 'var(--success-bg)' : 'var(--warning-bg)',
          color: question.answer ? 'var(--success)' : 'var(--warning)',
          height: 'fit-content'
        }}>
          {question.answer ? <CheckCircle size={14} /> : <Clock size={14} />}
          <span>{question.answer ? 'Answered' : 'Pending'}</span>
        </div>
      </div>
      
      <h3 className="q-title" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.25rem)', marginBottom: '12px', color: 'var(--primary)', lineHeight: '1.4' }}>{question.title}</h3>
      
      {question.answer && (
        <div className="q-preview-box" style={{ background: 'var(--primary-light)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
          <div className="q-preview-header" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>
            <Shield size={14} className="admin-icon" />
            <span>Official Answer</span>
          </div>
          <p className="q-preview-text" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{question.answer}</p>
        </div>
      )}
      
      <div className="q-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div className="q-action" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
           <MessageCircle size={16} />
           <span>Read full thread</span>
        </div>
      </div>
    </div>
  );
}
