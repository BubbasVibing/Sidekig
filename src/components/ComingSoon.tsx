import React, { useState, useEffect } from 'react';
import './ComingSoon.css';

const ComingSoon: React.FC = () => {
  // Set the launch date to 14 days from now
  const calculateTimeLeft = () => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);
    
    const difference = +launchDate - +new Date();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Set initial time
    setTimeLeft(calculateTimeLeft());
    
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array since we want this to run once on mount

  // Format numbers to always have two digits
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    // In a real app, you would send this to your backend
    console.log('Email submitted:', email);
    setMessage('Thank you! We will notify you when we launch.');
    setIsSubmitted(true);
    setEmail('');

    // Reset the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <h1>Coming Soon</h1>
        <div className="coming-soon-logo">Sidekig</div>
        <p className="coming-soon-message">
          We're working hard to bring you an amazing experience.
          <br />
          This feature will be available soon!
        </p>
        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-number">14</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">08</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">23</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">42</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
        <div className="notify-container">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="notify-input"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitted}
          />
          <button 
            className="notify-button"
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Submitted' : 'Notify Me'}
          </button>
        </div>
        {message && <p className="notify-message">{message}</p>}
        <a href="/" className="back-button">Back to Home</a>
      </div>
    </div>
  );
};

export default ComingSoon; 