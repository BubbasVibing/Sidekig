import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import './HomePage.css';

// Define types for our notification data
interface Notification {
  type: string;
  icon: string;
  name: string;
  title: string;
  message: string;
}

interface InfiniteNotification extends Notification {
  id: string;
  delay: number;
}

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Handle touch events for testimonial carousel
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      } else {
        // Swipe right, go to previous
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
    
    setTouchStartX(null);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.navbar-menu') && 
          !(event.target as Element).closest('.navbar-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      text: "As a single mom with two kids, I needed a flexible way to earn extra income. Sidekig helped me turn my social media skills into a $1,800/month business that I can manage around my children's schedules.",
      author: "Sarah Johnson",
      role: "Social Media Manager",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      text: "Being a college student with mounting debt, I was desperate for a way to make money without sacrificing my studies. Sidekig helped me launch my tutoring side hustle and now I'm making $25/hour helping high school students!",
      author: "Jason Chen",
      role: "College Student & Tutor",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      text: "At 50, I was looking for ways to supplement my retirement savings. Sidekig guided me to monetize my woodworking hobby, and now I'm selling custom furniture pieces online and making an extra $2,200 monthly.",
      author: "Robert Miller",
      role: "Woodworking Enthusiast",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const notificationData: Notification[] = [
    {
      type: 'shopify',
      icon: 'S',
      name: 'ShopNow',
      title: 'New Order #1124',
      message: 'You received a new order for $89.99'
    },
    {
      type: 'etsy',
      icon: 'E',
      name: 'Etsy',
      title: 'New Sale!',
      message: 'Your item "Custom Design" sold for $45.00'
    },
    {
      type: 'upwork',
      icon: 'U',
      name: 'FreelanceHub',
      title: 'Payment Received',
      message: 'Client ABC paid $499.99 for Web Development'
    },
    {
      type: 'fiverr',
      icon: 'F',
      name: 'Fiverr',
      title: 'Order Completed',
      message: 'You earned $120.00 from your gig "Professional Website Development"'
    },
    {
      type: 'chase',
      icon: 'B',
      name: 'BankSecure',
      title: 'Deposit Received',
      message: 'A deposit of $325.50 has been received'
    },
    {
      type: 'paypal',
      icon: 'P',
      name: 'PayPal',
      title: 'Money Received',
      message: 'You received $175.00 from Digital Products'
    },
    {
      type: 'stripe',
      icon: 'S',
      name: 'Stripe',
      title: 'New Subscription',
      message: 'New subscriber! +$29.99/month'
    },
    {
      type: 'amazon',
      icon: 'A',
      name: 'Amazon',
      title: 'Affiliate Commission',
      message: 'You earned $42.75 in commissions'
    },
    {
      type: 'patreon',
      icon: 'P',
      name: 'Patreon',
      title: 'New Patron!',
      message: 'You have a new supporter pledging $15/month'
    },
    {
      type: 'youtube',
      icon: 'Y',
      name: 'YouTube',
      title: 'Monetization Update',
      message: 'Your channel earned $127.50 this month from ad revenue'
    },
    {
      type: 'instagram',
      icon: 'I',
      name: 'Instagram',
      title: 'Sponsored Post',
      message: 'Brand XYZ wants to pay $350 for a sponsored post'
    },
    {
      type: 'tiktok',
      icon: 'T',
      name: 'TikTok',
      title: 'Creator Fund',
      message: 'You earned $78.25 from the Creator Fund this week'
    },
    {
      type: 'substack',
      icon: 'S',
      name: 'Substack',
      title: 'New Subscribers',
      message: '5 new paid subscribers joined your newsletter (+$50/month)'
    },
    {
      type: 'teachable',
      icon: 'T',
      name: 'Teachable',
      title: 'Course Sales',
      message: 'Your online course sold 3 copies today ($297 revenue)'
    }
  ];

  // Create a continuous stream by repeating the notifications multiple times
  const generateInfiniteNotifications = (): InfiniteNotification[] => {
    // Create 5 sets of notifications to ensure there's always something visible
    const result: InfiniteNotification[] = [];
    for (let i = 0; i < 5; i++) {
      notificationData.forEach((notification, index) => {
        result.push({
          ...notification,
          id: `${notification.type}-${i}-${index}`,
          delay: (i * notificationData.length + index) * 3 // 3 second delay between each
        });
      });
    }
    return result;
  };

  const infiniteNotifications = generateInfiniteNotifications();

  const getIconColor = (type: string) => {
    switch(type) {
      case 'shopify': return '#96bf48';
      case 'etsy': return '#f56400';
      case 'upwork': return '#6fda44';
      case 'fiverr': return '#1dbf73';
      case 'chase': return '#117aca';
      case 'paypal': return '#003087';
      case 'stripe': return '#6772e5';
      case 'amazon': return '#ff9900';
      case 'patreon': return '#F96854';
      case 'youtube': return '#FF0000';
      case 'instagram': return '#C13584';
      case 'tiktok': return '#69C9D0';
      case 'substack': return '#FF6719';
      case 'teachable': return '#29A0B1';
      default: return '#333333';
    }
  };

  // Function to determine notification height based on screen width
  const getNotificationHeight = (): string => {
    if (window.innerWidth <= 375) {
      return '110px';
    } else if (window.innerWidth <= 480) {
      return '120px';
    } else if (window.innerWidth <= 576) {
      return '130px';
    } else {
      return '160px';
    }
  };

  // State to track notification height
  const [notificationHeight, setNotificationHeight] = useState(getNotificationHeight());

  // Update notification height on window resize
  useEffect(() => {
    const handleResize = () => {
      setNotificationHeight(getNotificationHeight());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Modern Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-text">Sidekig</span>
          </div>
          
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-items">
              <li className="navbar-item"><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
              <li className="navbar-item"><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</a></li>
              <li className="navbar-item"><a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
              <li className="navbar-item"><a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a></li>
            </ul>
            <div className="navbar-buttons">
              <a href="/coming-soon" className="navbar-button login">Log In</a>
              <a href="/coming-soon" className="navbar-button signup">Sign Up</a>
            </div>
          </div>
          
          <div className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
            <div className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <div className="hero-section" id="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Turn Your Skills Into Income</h1>
            <p className="hero-tagline">Your AI sidekick that helps you launch, manage, and grow your side hustle with ease</p>
            <div className="hero-cta">
              <button className="primary-button">Start Earning Today</button>
              <button className="secondary-button">See How It Works</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-container">
              <div className="hero-illustration">
                <div className="hand"></div>
                <div className="iphone">
                  <div className="iphone-notch"></div>
                  <div className="iphone-screen">
                    <div className="iphone-status-bar">
                      <div className="status-time">9:41</div>
                      <div className="status-icons">
                        <span className="signal-icon">📶</span>
                        <span className="wifi-icon">📡</span>
                        <span className="battery-icon">🔋</span>
                      </div>
                    </div>
                    
                    <div className="notification-stream">
                      {infiniteNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`stream-notification stream-${notification.type}`}
                          style={{ 
                            animationDelay: `${notification.delay}s`,
                            animationIterationCount: 'infinite',
                            zIndex: 20 - (notification.delay % 20),
                            height: notificationHeight
                          }}
                        >
                          <div className="notification-app">
                            <div 
                              className="app-icon" 
                              style={{ 
                                backgroundColor: getIconColor(notification.type),
                                width: window.innerWidth <= 375 ? '22px' : '28px',
                                height: window.innerWidth <= 375 ? '22px' : '28px',
                                minWidth: window.innerWidth <= 375 ? '22px' : '28px'
                              }}
                            >
                              {notification.icon}
                            </div>
                            <div className="app-name">{notification.name}</div>
                          </div>
                          <div className="notification-content">
                            <div className="notification-header">
                              <span className="notification-title">{notification.title}</span>
                              <span className="notification-time">now</span>
                            </div>
                            <div className="notification-body">
                              <p><strong>{notification.message}</strong></p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="features-section" id="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V12C4 15.31 7.58 19.5 12 21C16.42 19.5 20 15.31 20 12V6L12 2Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11L16 7L14.5 5.5L12 8L9.5 5.5L8 7L12 11Z" fill="#3498db"/>
              </svg>
            </div>
            <h3>Launch Your Side Hustle</h3>
            <p>Turn your skills into a profitable business with AI-powered guidance and tools.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Client Management</h3>
            <p>Easily manage clients, bookings, and payments all in one place.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20V4" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 20V14" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Income Tracking</h3>
            <p>Monitor your earnings, expenses, and growth with detailed analytics.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>AI Assistance</h3>
            <p>Get personalized recommendations and insights to grow your business faster.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Performance Analytics</h3>
            <p>Track your growth with beautiful visualizations and actionable insights.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 7H7V17H9V7Z" fill="#3498db"/>
                <path d="M17 7H15V17H17V7Z" fill="#3498db"/>
                <path d="M13 7H11V17H13V7Z" fill="#3498db"/>
              </svg>
            </div>
            <h3>Automated Workflows</h3>
            <p>Save time with smart automations for invoicing, follow-ups, and more.</p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section with Carousel */}
      <div className="testimonials-section" id="testimonials">
        <h2>What Our Users Say</h2>
        <p className="testimonial-subtitle">Real stories from real people who have transformed their skills into thriving side hustles</p>
        <div 
          className="testimonial-carousel" 
          ref={testimonialRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="testimonial-container" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatar} alt={testimonial.author} />
                  </div>
                  <div className="testimonial-stars">
                    {/* 5 star rating */}
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  </div>
                  <div className="testimonial-content">
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <div className="testimonial-author-info">
                      <p className="testimonial-author">{testimonial.author}</p>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carousel-controls">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`carousel-dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="carousel-arrow carousel-arrow-left" 
            onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="carousel-arrow carousel-arrow-right" 
            onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="pricing-section" id="pricing">
        <div className="pricing-title-container">
          <h2>Choose Your Plan</h2>
          <p className="pricing-subtitle">Start growing your side hustle today with our flexible pricing options</p>
        </div>
        
        <div className="pricing-container">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Starter</h3>
              <div className="pricing-price">
                <span className="price">$4.99</span>
                <span className="period">/month</span>
              </div>
              <p className="pricing-description">Perfect for beginners testing the waters</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>5 Business Ideas per Month</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Basic AI Coaching (3 sessions/month)</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Simple Income Tracking</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Email Support</span>
                </li>
                <li className="disabled">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Advanced Analytics</span>
                </li>
                <li className="disabled">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Client Management Tools</span>
                </li>
                <li className="disabled">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Marketing Templates</span>
                </li>
              </ul>
            </div>
            <button className="pricing-button">Get Started</button>
          </div>
          
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Pro</h3>
              <div className="pricing-price">
                <span className="price">$14.99</span>
                <span className="period">/month</span>
              </div>
              <p className="pricing-description">Everything you need to scale your side hustle</p>
              <div className="pricing-save">Save 50% compared to buying features separately</div>
            </div>
            <div className="pricing-features">
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span><strong>Unlimited</strong> Business Ideas</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span><strong>Unlimited</strong> AI Coaching Sessions</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Advanced Income & Expense Tracking</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Priority Support (24/7)</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Advanced Analytics & Reporting</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Full Client Management Suite</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>50+ Marketing & Invoice Templates</span>
                </li>
              </ul>
            </div>
            <button className="pricing-button popular-button">Get Started</button>
          </div>
        </div>
        
        <div className="pricing-guarantee">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>30-day money-back guarantee. No questions asked.</p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="faq-section" id="faq">
        <h2>Frequently Asked Questions</h2>
        <p className="faq-subtitle">Have questions? We've got answers to help you succeed.</p>
        
        <div className="faq-container">
          <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(0)}>
              <h4>How does Sidekig help me start a side hustle?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Sidekig provides AI-powered business ideas tailored to your skills, step-by-step guidance to launch, and tools to manage clients and track income—all in one platform. We make it easy to start earning extra income with minimal time investment.</p>
            </div>
          </div>
          
          <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(1)}>
              <h4>Do I need business experience to use Sidekig?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Not at all! Sidekig is designed for beginners and experienced entrepreneurs alike. Our AI coach guides you through every step of starting and growing your side business, from finding your first client to scaling your income.</p>
            </div>
          </div>
          
          <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(2)}>
              <h4>What's included in the Pro plan?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>The Pro plan includes unlimited business ideas and AI coaching sessions, advanced income tracking, priority 24/7 support, comprehensive analytics, client management tools, and 50+ marketing templates. It's everything you need to grow your side hustle into a significant income stream.</p>
            </div>
          </div>
          
          <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(3)}>
              <h4>Can I cancel my subscription anytime?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Yes, you can cancel your subscription at any time from your account settings. We also offer a 30-day money-back guarantee if you're not satisfied with our service. No questions asked.</p>
            </div>
          </div>
        </div>
        
        <div className="faq-cta">
          <p>Still have questions?</p>
          <a href="mailto:support@sidekig.com" className="faq-contact-button">Email Our Support Team</a>
        </div>
      </div>
      
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Sidekig. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="#faq">FAQ</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 