import React from 'react';
import { MapPin, Phone, User, Mail, Globe, Clock } from 'lucide-react';

const branches = [
  {
    id: 1,
    name: "Global Headquarters",
    location: "Lagos, Nigeria",
    address: "123 Mandate Way, Victoria Island, Lagos",
    pastor: "Pastor John Doe",
    contact: "+234 800 123 4567",
    email: "hq@eastmandate.org",
    fellowship: "Sundays @ 9:00 AM & Wednesdays @ 6:00 PM",
    image: "https://images.unsplash.com/photo-1544427928-c49dd24428c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "London City Church",
    location: "London, UK",
    address: "45 Canary Wharf, London E14 5NY",
    pastor: "Pastor Sarah Smith",
    contact: "+44 20 7946 0000",
    email: "london@eastmandate.org",
    fellowship: "Sundays @ 10:00 AM & Thursdays @ 7:00 PM",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Houston Transformation Center",
    location: "Houston, Texas, USA",
    address: "789 Memorial Dr, Houston, TX 77024",
    pastor: "Pastor Michael Brown",
    contact: "+1 713 555 0123",
    email: "houston@eastmandate.org",
    fellowship: "Sundays @ 10:30 AM & Tuesdays @ 6:30 PM",
    image: "https://images.unsplash.com/photo-1531050171669-0158284554e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Accra Fire House",
    location: "Accra, Ghana",
    address: "32 Independence Ave, Accra",
    pastor: "Pastor Emmanuel Mensah",
    contact: "+233 24 000 0000",
    email: "accra@eastmandate.org",
    fellowship: "Sundays @ 8:30 AM & Fridays @ 6:00 PM",
    image: "https://images.unsplash.com/photo-1523213139764-42c6f675f78b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function BranchesPage() {
  return (
    <div className="page">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '16px' }}>Our Global Branches</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          Connect with a fellowship center near you. Each branch is a beacon of hope and spiritual growth in its community.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {branches.map(branch => (
          <div key={branch.id} className="card" style={{ padding: 'clamp(20px, 5vw, 40px)', display: 'flex', flexDirection: 'column', gap: '24px', transition: 'box-shadow 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '12px', borderRadius: '12px' }}>
                <Globe size={24} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase' }}>{branch.location}</span>
            </div>
            
            <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', color: 'var(--primary)', marginBottom: '8px' }}>{branch.name}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={20} color="var(--accent)" style={{ marginTop: '4px' }} />
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{branch.address}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <User size={20} color="var(--accent)" />
                <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: '600' }}>{branch.pastor}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={20} color="var(--accent)" />
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{branch.contact}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={20} color="var(--accent)" />
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{branch.email}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'var(--primary-light)', padding: '16px', borderRadius: '12px' }}>
                <Clock size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                <div>
                  <p style={{ margin: 0, fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>Fellowship Times</p>
                  <p style={{ margin: 0, color: 'var(--primary)', opacity: 0.8, fontSize: '0.9rem' }}>{branch.fellowship}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
