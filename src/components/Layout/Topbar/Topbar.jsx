import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Topbar.css';

const Topbar = ({ onToggleMenu, isMenuOpen, isDarkMode, onToggleDarkMode }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const languageRef = useRef(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'New Milk Collection',
      message: 'Morning collection completed - 850L collected',
      time: '10 minutes ago',
      unread: true,
      icon: '🥛'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Quality Alert',
      message: 'Batch #1247 requires quality check',
      time: '25 minutes ago',
      unread: true,
      icon: '⚠️'
    },
    {
      id: 3,
      type: 'success',
      title: 'Payment Received',
      message: 'Metro Supermarkets payment processed',
      time: '1 hour ago',
      unread: false,
      icon: '💰'
    },
    {
      id: 4,
      type: 'info',
      title: 'New Farmer Registration',
      message: 'Rajesh Kumar has joined the network',
      time: '2 hours ago',
      unread: false,
      icon: '👨‍🌾'
    }
  ];

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguage(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
    }
  };

  // Get unread notification count
  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle language change
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguage(false);
    // Implement language change logic here
    console.log('Language changed to:', langCode);
  };

  // Handle profile actions
  const handleProfileAction = (action) => {
    setShowProfile(false);
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        // Implement logout logic
        console.log('Logging out...');
        break;
      default:
        break;
    }
  };

  return (
    <header className={`topbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="topbar-content">
        {/* Left Section */}
        <div className="topbar-left">
          <Link to="/" className="logo">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="logo-fallback" style={{display: 'none'}}>
              <div className="logo-icon">🏢</div>
            </div>
          </Link>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={onToggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Center Section - Search */}
        <div className="topbar-center">
          <form className="search-container" onSubmit={handleSearch}>
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="topbar-right">
          {/* Language Selector */}
          <div className="topbar-item language-selector" ref={languageRef}>
            <button
              className="topbar-btn"
              onClick={() => setShowLanguage(!showLanguage)}
              aria-label="Select language"
            >
              <span className="language-icon">
                🌐
              </span>
            </button>
            
            {showLanguage && (
              <div className="dropdown language-dropdown">
                <div className="dropdown-header">
                  <h4>Select Language</h4>
                </div>
                <div className="dropdown-content">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`dropdown-item ${selectedLanguage === lang.code ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <span className="lang-flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
                      {selectedLanguage === lang.code && <span className="check-mark">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <div className="topbar-item">
            <button
              className="topbar-btn dark-mode-toggle"
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode"
            >
              <span className="dark-mode-icon">
                {isDarkMode ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </span>
            </button>
          </div>

          {/* Notifications */}
          <div className="topbar-item notifications" ref={notificationRef}>
            <button
              className="topbar-btn notification-btn simple-notification"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="View notifications"
            >
              <span className="notification-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="dropdown notification-dropdown">
                <div className="dropdown-header">
                  <h4>Notifications</h4>
                  <span className="notification-count">{unreadCount} new</span>
                </div>
                <div className="dropdown-content">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.unread ? 'unread' : ''}`}
                    >
                      <div className="notification-icon-wrapper">
                        <span className="notification-type-icon">{notification.icon}</span>
                      </div>
                      <div className="notification-content">
                        <h5 className="notification-title">{notification.title}</h5>
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      {notification.unread && <div className="unread-dot"></div>}
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button className="view-all-btn">View All Notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="topbar-item profile" ref={profileRef}>
            <button
              className="topbar-btn profile-btn"
              onClick={() => setShowProfile(!showProfile)}
              aria-label="User profile"
            >
              <div className="profile-avatar">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
                  alt="Profile"
                  className="avatar-image"
                />
              </div>
              <div className="profile-info">
                <span className="profile-name">Shivakumar</span>
                <span className="profile-role">Dairy Manager</span>
              </div>
              <span className="profile-arrow">▼</span>
            </button>
            
            {showProfile && (
              <div className="dropdown profile-dropdown">
                <div className="dropdown-header profile-header">
                  <div className="profile-avatar-large">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format"
                      alt="Profile"
                      className="avatar-image-large"
                    />
                  </div>
                  <div className="profile-details">
                    <h4>Shivakumar</h4>
                    <p>shivakumar@milkreact.com</p>
                    <span className="profile-status">Dairy Manager</span>
                  </div>
                </div>
                <div className="dropdown-content">
                  <button
                    className="dropdown-item"
                    onClick={() => handleProfileAction('profile')}
                  >
                    <span className="item-icon">👤</span>
                    <span>My Profile</span>
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleProfileAction('settings')}
                  >
                    <span className="item-icon">⚙️</span>
                    <span>Settings</span>
                  </button>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item logout"
                    onClick={() => handleProfileAction('logout')}
                  >
                    <span className="item-icon">🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;