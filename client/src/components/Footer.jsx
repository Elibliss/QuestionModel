import { MessageCircle, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer({ companyName }) {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-logo">
            <MessageCircle size={20} color="var(--primary)" />
            <span>{companyName || 'ExpertAsk'}</span>
          </div>
          <p>Connecting curiosity with expertise. Get verified answers from industry leaders.</p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <a href="#">Browse Topics</a>
          <a href="#">How it Works</a>
          <a href="#">Expert Directory</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Github size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {companyName || 'ExpertAsk Inc.'} All rights reserved.</p>
        {companyName && <span style={{opacity: 0.6, fontSize: '0.8rem', marginLeft: '1rem'}}>Powered by ExpertAsk</span>}
      </div>
    </footer>
  );
}
