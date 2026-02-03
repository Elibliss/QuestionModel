import { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';

export function AskQuestionPage({ programs, onCancel, onSubmit }) {
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
                <option key={p._id || p.id} value={p._id || p.id} disabled={!p.isOpen}>
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
