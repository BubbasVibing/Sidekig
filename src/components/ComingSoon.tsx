import React from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon: React.FC = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <h1>Coming Soon</h1>
        <p className="subtitle">We're working hard to bring you an amazing experience!</p>
        
        <div className="countdown-container">
          <div className="launch-info">
            <p>Our platform is launching soon. Be the first to know when we go live!</p>
          </div>
        </div>
        
        <div className="email-signup">
          <h2>Get Notified</h2>
          <p>Subscribe to receive updates and be the first to access our platform.</p>
          
          <form className="signup-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              required 
            />
            <button type="submit" className="notify-button">Notify Me</button>
          </form>
        </div>
        
        <div className="back-home">
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon; 