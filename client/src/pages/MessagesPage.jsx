import React from 'react';
import { Play, Calendar, Clock, Share2, ExternalLink } from 'lucide-react';

export function MessagesPage() {
  // Mock data for messages - User can easily swap links here
  const messages = [
    {
      id: 1,
      title: "The Will and the Wheels of God",
      description: "A profound teaching on divine timing and spiritual alignment with God's movement.",
      videoUrl: "https://www.youtube.com/embed/dli121rnKrU", 
      date: "March 15, 2026",
      duration: "45:20"
    },
    {
      id: 2,
      title: "Living in the Eden Experience",
      description: "Discovering God's original plan for humanity: intimacy, dominion, and abundance.",
      videoUrl: "https://www.youtube.com/embed/9Wdg56yrbfE", 
      date: "March 8, 2026",
      duration: "52:15"
    },
    {
      id: 3,
      title: "The Mystery of the New Moon",
      description: "Understanding the prophetic significance of new beginnings and spiritual seasons.",
      videoUrl: "https://www.youtube.com/embed/9oytRLw5Ibo", 
      date: "March 1, 2026",
      duration: "38:40"
    },
    {
      id: 4,
      title: "Apostolic Mandate for This Generation",
      description: "An empowering message on our responsibility as believers in the current age.",
      videoUrl: "https://www.youtube.com/embed/romXg8E2nTE", 
      date: "February 22, 2026",
      duration: "1:05:10"
    }
  ];

  return (
    <div className="messages-page" style={{ padding: '40px 0', minHeight: '80vh' }}>
      <div className="page">
        {/* Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--primary)', fontWeight: '800', marginBottom: '20px' }}>
            Spiritual <span style={{ color: 'var(--accent)' }}>Messages</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
            Access our library of life-changing teachings, word festivals, and prophetic gatherings. 
            Grow in grace and knowledge through the power of the word.
          </p>
        </header>

        {/* Messages Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '40px',
          paddingBottom: '60px'
        }}>
          {messages.map((message) => (
            <div key={message.id} className="card message-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '100%',
              border: '1px solid var(--border)'
            }}>
              {/* Video Container */}
              <div className="video-wrapper" style={{ 
                position: 'relative', 
                width: '100%', 
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                background: '#000'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src={message.videoUrl}
                  title={message.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Content Container */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} /> {message.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={14} /> {message.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '12px', lineHeight: '1.3' }}>
                  {message.title}
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>
                  {message.description}
                </p>

                <div style={{ display: 'flex', gap: '15px', marginTop: 'auto' }}>
                  <button className="btn primary" style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px',
                    padding: '10px'
                  }}>
                    <Play size={18} /> Watch Now
                  </button>
                  <button className="btn secondary" style={{ 
                    padding: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderColor: 'var(--border)'
                  }}>
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div style={{ 
          textAlign: 'center', 
          background: 'var(--surface)', 
          padding: '40px', 
          borderRadius: 'var(--radius-lg)',
          marginTop: '40px'
        }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Want to stay updated?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Subscribe to our YouTube channel for live streams and immediate access to all new messages.
          </p>
          <a 
            href="https://www.youtube.com/@EastMandateGlobal" 
            target="_blank" 
            rel="noreferrer" 
            className="btn primary" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            Subscribe on YouTube <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
