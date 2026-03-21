import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, MessageCircle, Clock, Layers, Send, CheckCircle, 
  Users, School, User, LogOut, Link as LinkIcon, Plus, Trash2, Calendar, 
  ArrowRight, Search, ChevronRight, MapPin, X
} from 'lucide-react';

export function AdminDashboard({ 
  programs, questions, events, registrations, onLogout, 
  onCreateEvent, onDeleteEvent, onCreateProgram, onAnswerQuestion, onToggleProgramStatus 
}) {
  const [activeTab, setActiveTab] = useState('events'); 
  const [answerDraft, setAnswerDraft] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [newProgramName, setNewProgramName] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  // Stats for the overview
  const totalQuestions = questions.length;
  const unansweredQuestions = questions.filter(q => !q.answer).length;
  const totalRegistrations = registrations.length;
  const totalEvents = events.length;

  // Filter registrations for selected event
  const currentEventRegistrations = useMemo(() => {
    return registrations.filter(r => r.eventId === selectedEventId);
  }, [registrations, selectedEventId]);

  // Group current event users by school and gender
  const usersBySchool = useMemo(() => {
    const schools = {};
    currentEventRegistrations.forEach(user => {
      const schoolName = user.school || 'Other / Not Specified';
      if (!schools[schoolName]) {
        schools[schoolName] = { male: [], female: [] };
      }
      const gender = user.gender === 'female' ? 'female' : 'male';
      schools[schoolName][gender].push(user);
    });
    return schools;
  }, [currentEventRegistrations]);

  const copyRegLink = (id) => {
    const link = `${window.location.origin}/register-event/${id}`;
    navigator.clipboard.writeText(link);
    alert('Registration link copied to clipboard!');
  };

  return (
    <div className="admin-wrapper" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'var(--font-family)' }}>
      
      {/* Sidebar Redesign */}
      <aside className="admin-sidebar" style={{ 
        width: '280px', 
        background: 'var(--primary)', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxShadow: '4px 0 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{ padding: '40px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ background: 'var(--accent)', padding: '8px', borderRadius: '12px' }}>
              <LayoutDashboard size={24} color="var(--primary)" />
            </div>
            <span style={{ fontWeight: '900', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>EMG PANEL</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: '0.6', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Administrative Hub</p>
        </div>

        <nav style={{ padding: '30px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <SidebarItem active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon={<Calendar size={20} />} label="Events" />
          <SidebarItem active={activeTab === 'registrations'} onClick={() => setActiveTab('registrations')} icon={<Users size={20} />} label="Registrations" />
          <SidebarItem active={activeTab === 'questions'} onClick={() => setActiveTab('questions')} icon={<MessageCircle size={20} />} label="Questions" badge={unansweredQuestions} />
          <SidebarItem active={activeTab === 'topics'} onClick={() => setActiveTab('topics')} icon={<Layers size={20} />} label="Topics" />
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#fca5a5', padding: '14px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: '0.2s' }}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', margin: 0, letterSpacing: '-1px' }}>
              {activeTab === 'events' ? 'Event Management' : activeTab === 'registrations' ? 'Attendee Data' : activeTab === 'questions' ? 'Questions Feed' : 'Topic Control'}
            </h1>
            <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Welcome back, Administrator.</p>
          </div>
          
          {activeTab === 'events' && (
            <button className="btn primary large" onClick={() => setShowCreateEvent(true)} style={{ display: 'flex', gap: '10px', alignItems: 'center', borderRadius: '16px', padding: '16px 24px', background: 'var(--primary)' }}>
              <Plus size={20} /> Create New Event
            </button>
          )}
        </header>

        {/* Dynamic Content Based on Tab */}
        <div className="tab-content">
          
          {activeTab === 'events' && (
            <div className="events-view">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                {events.map(event => (
                  <div key={event.id} className="card" style={{ padding: '30px', position: 'relative', transition: 'transform 0.2s', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                      <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '12px', borderRadius: '14px' }}>
                        <Calendar size={28} />
                      </div>
                      <button className="btn icon-btn" onClick={() => onDeleteEvent(event.id)} style={{ color: 'var(--danger)', background: 'var(--danger-bg)' }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--primary)' }}>{event.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{event.description}</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Clock size={16} color="var(--accent)" /> {new Date(event.date).toLocaleDateString()}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><MapPin size={16} color="var(--accent)" /> {event.location}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn primary" onClick={() => copyRegLink(event.id)} style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                        <LinkIcon size={18} /> Get Form Link
                      </button>
                      <button className="btn secondary" onClick={() => { setSelectedEventId(event.id); setActiveTab('registrations'); }} style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                        View Info
                      </button>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', background: 'white', borderRadius: '24px', border: '2px dashed #cbd5e1' }}>
                    <Calendar size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                    <h3 style={{ color: 'var(--text-secondary)' }}>No events created yet.</h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'registrations' && (
            <div className="registrations-view">
              {/* Event Selector for Registrations */}
              <div style={{ marginBottom: '40px', display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                {events.map(ev => (
                  <button 
                    key={ev.id} 
                    onClick={() => setSelectedEventId(ev.id)}
                    style={{ 
                      padding: '12px 24px', 
                      borderRadius: '12px', 
                      border: 'none', 
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      fontWeight: '700',
                      transition: '0.2s',
                      background: selectedEventId === ev.id ? 'var(--primary)' : 'white',
                      color: selectedEventId === ev.id ? 'white' : 'var(--text-secondary)',
                      boxShadow: selectedEventId === ev.id ? '0 10px 15px -3px rgba(0, 51, 102, 0.2)' : 'var(--shadow-sm)'
                    }}
                  >
                    {ev.title}
                  </button>
                ))}
              </div>

              {selectedEventId ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    <StatCard icon={<Users size={24} />} value={currentEventRegistrations.length} label="Total Attendees" color="var(--primary)" />
                    <StatCard icon={<School size={24} />} value={Object.keys(usersBySchool).length} label="Participating Schools" color="var(--accent)" />
                  </div>

                  {Object.entries(usersBySchool).map(([school, genders]) => (
                    <div key={school} className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                      <div style={{ padding: '24px 30px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <School size={22} color="var(--primary)" />
                          <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '800' }}>{school}</h3>
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 14px', borderRadius: '20px' }}>
                          {genders.male.length + genders.female.length} Total
                        </span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: '#e2e8f0' }}>
                        <div style={{ background: 'white', padding: '30px' }}>
                          <h4 style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontWeight: '800' }}>
                            <div style={{ background: '#dbeafe', padding: '6px', borderRadius: '8px' }}><User size={16} /></div> 
                            MALE <span style={{ opacity: 0.5, fontWeight: '500' }}>({genders.male.length})</span>
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {genders.male.map(u => <UserRow key={u.id} user={u} />)}
                            {genders.male.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No registrations</p>}
                          </div>
                        </div>
                        
                        <div style={{ background: 'white', padding: '30px' }}>
                          <h4 style={{ color: '#db2777', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontWeight: '800' }}>
                            <div style={{ background: '#fce7f3', padding: '6px', borderRadius: '8px' }}><User size={16} /></div> 
                            FEMALE <span style={{ opacity: 0.5, fontWeight: '500' }}>({genders.female.length})</span>
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {genders.female.map(u => <UserRow key={u.id} user={u} />)}
                            {genders.female.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No registrations</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '100px', background: 'white', borderRadius: '24px' }}>
                  <h3>Select an event to see registration data.</h3>
                </div>
              )}
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="questions-view" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '40px' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
                <div style={{ padding: '24px 30px', borderBottom: '1px solid #e2e8f0', background: 'white', position: 'sticky', top: 0 }}>
                  <h3 style={{ margin: 0, color: 'var(--primary)' }}>Pending Feed</h3>
                </div>
                <div style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
                  {questions.filter(q => !q.answer).map(q => (
                    <div 
                      key={q.id} 
                      onClick={() => setSelectedQuestionId(q.id)}
                      style={{ 
                        padding: '24px 30px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                        background: selectedQuestionId === q.id ? 'var(--primary-light)' : 'transparent',
                        transition: '0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: '800', textTransform: 'uppercase' }}>{programs.find(p => p.id == q.programId)?.name}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{new Date(q.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.05rem', marginBottom: '4px' }}>{q.title}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', opacity: 0.8 }}>By {q.authorName}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="main-editor">
                {selectedQuestionId ? (
                  <div className="card" style={{ padding: '40px' }}>
                    <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--primary)', fontWeight: '800' }}>
                        <MessageCircle size={18} /> INQUIRY
                      </div>
                      <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text-main)', margin: 0 }}>{questions.find(q => q.id === selectedQuestionId)?.text}</p>
                    </div>
                    <textarea 
                      rows="10"
                      value={answerDraft}
                      onChange={(e) => setAnswerDraft(e.target.value)}
                      placeholder="Type your official response here..."
                      className="input"
                      style={{ width: '100%', marginBottom: '24px', padding: '20px', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem' }}
                    ></textarea>
                    <button className="btn primary large" onClick={() => {
                      onAnswerQuestion(selectedQuestionId, answerDraft);
                      setAnswerDraft('');
                      setSelectedQuestionId(null);
                    }} style={{ width: '100%', borderRadius: '16px', height: '60px', fontSize: '1.1rem' }}>
                      Publish Response
                    </button>
                  </div>
                ) : (
                  <div className="card" style={{ padding: '100px', textAlign: 'center', color: 'var(--text-muted)', border: '2px dashed #cbd5e1', background: 'transparent' }}>
                    <MessageCircle size={64} style={{ marginBottom: '20px', opacity: 0.1 }} />
                    <h3 style={{ fontSize: '1.5rem' }}>Select an inquiry to respond</h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'topics' && (
            <div className="card" style={{ padding: '40px', maxWidth: '800px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                {programs.map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 30px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                    <div>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{p.name}</strong>
                      <div style={{ display: 'inline-block', marginLeft: '15px', fontSize: '0.75rem', padding: '5px 12px', borderRadius: '20px', background: p.isOpen ? 'var(--success-bg)' : 'var(--danger-bg)', color: p.isOpen ? 'var(--success)' : 'var(--danger)', fontWeight: '800' }}>
                        {p.isOpen ? 'ACTIVE' : 'INACTIVE'}
                      </div>
                    </div>
                    <button className={`btn ${p.isOpen ? 'secondary' : 'primary'}`} onClick={() => onToggleProgramStatus(p.id)} style={{ padding: '10px 20px', borderRadius: '10px' }}>
                      {p.isOpen ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--primary)' }}>Add Discussion Topic</h4>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input className="input" style={{ flex: 1, height: '54px', borderRadius: '12px' }} placeholder="Topic Name (e.g. Marriage Counsel)" value={newProgramName} onChange={(e) => setNewProgramName(e.target.value)} />
                  <button className="btn primary" onClick={() => { if(newProgramName) { onCreateProgram({ name: newProgramName }); setNewProgramName(''); } }} style={{ padding: '0 30px', borderRadius: '12px' }}>Add Topic</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <CreateEventModal 
          onClose={() => setShowCreateEvent(false)} 
          onSubmit={(ev) => { onCreateEvent(ev); setShowCreateEvent(false); }} 
        />
      )}
    </div>
  );
}

function SidebarItem({ active, onClick, icon, label, badge }) {
  return (
    <button onClick={onClick} style={{ 
      display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderRadius: '14px', border: 'none', cursor: 'pointer', transition: '0.2s', width: '100%', textAlign: 'left',
      background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
      color: active ? 'white' : 'rgba(255,255,255,0.6)',
      fontWeight: active ? '700' : '500'
    }}>
      <span style={{ opacity: active ? 1 : 0.6 }}>{icon}</span>
      <span style={{ fontSize: '1.05rem', flex: 1 }}>{label}</span>
      {badge > 0 && (
        <span style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>{badge}</span>
      )}
    </button>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="card" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ background: `${color}15`, color: color, padding: '14px', borderRadius: '16px' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1' }}>{value}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px', fontWeight: '600' }}>{label}</div>
      </div>
    </div>
  );
}

function UserRow({ user }) {
  return (
    <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', transition: '0.2s' }}>
      <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px' }}>{user.name}</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><LinkIcon size={12} /> {user.number}</span>
        <span style={{ background: 'white', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: '700' }}>{user.isUndergraduate === 'yes' ? 'STUDENT' : 'PROFESSIONAL'}</span>
      </div>
    </div>
  );
}

function CreateEventModal({ onClose, onSubmit }) {
  const [ev, setEv] = useState({ title: '', date: '', description: '', location: '' });
  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2>New Registration Form</h2>
          <button onClick={onClose} className="close-btn"><X size={24} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
          <div className="field">
            <label>Event Title</label>
            <input className="input" placeholder="e.g. Rosh Hashanah 2026" value={ev.title} onChange={e => setEv({...ev, title: e.target.value})} />
          </div>
          <div className="field">
            <label>Event Date</label>
            <input type="date" className="input" value={ev.date} onChange={e => setEv({...ev, date: e.target.value})} />
          </div>
          <div className="field">
            <label>Location</label>
            <input className="input" placeholder="e.g. Enugu, Nigeria" value={ev.location} onChange={e => setEv({...ev, location: e.target.value})} />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea className="input" rows="4" placeholder="Short event brief..." value={ev.description} onChange={e => setEv({...ev, description: e.target.value})}></textarea>
          </div>
          <button className="btn primary large" onClick={() => onSubmit(ev)} disabled={!ev.title || !ev.date}>Generate Form</button>
        </div>
      </div>
    </div>
  );
}
