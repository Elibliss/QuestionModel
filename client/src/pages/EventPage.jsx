import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Global Worship Experience",
    date: "March 15, 2026",
    time: "5:00 PM",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A night of intense worship and spiritual awakening with believers from all over the world."
  },
  {
    id: 2,
    title: "Leadership Summit 2026",
    date: "February 20, 2026",
    time: "10:00 AM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1475721027187-402ad2989a3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Empowering the next generation of leaders with divine wisdom and practical skills."
  },
  {
    id: 3,
    title: "Community Outreach Program",
    date: "January 10, 2026",
    time: "9:00 AM",
    location: "Houston, Texas",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Spreading love and hope through practical support and the word of God in our local communities."
  },
  {
    id: 4,
    title: "Youth Fire Conference",
    date: "December 15, 2025",
    time: "4:00 PM",
    location: "Accra, Ghana",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Igniting the passion for Christ in the hearts of young people across the continent."
  }
];

export function EventPage() {
  return (
    <div className="page">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '16px' }}>Past Events</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          Relive the moments of transformation and spiritual encounters from our previous gatherings worldwide.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {events.map(event => (
          <div key={event.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 'clamp(180px, 30vw, 240px)', overflow: 'hidden' }}>
              <img 
                src={event.image} 
                alt={event.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: 'clamp(20px, 5vw, 30px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={16} color="var(--accent)" /> {event.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} color="var(--accent)" /> {event.time}</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', marginBottom: '15px', color: 'var(--primary)' }}>{event.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', flex: 1 }}>{event.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: '600' }}>
                <MapPin size={18} color="var(--accent)" /> {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
