import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Layout Components
import { Topbar, CircularMenu } from './components/Layout';

// Import Page Components
import { 
  Dashboard, 
  CattleManagement,
  MilkCollection,
  CRM, 
  MarketAnalysis, 
  Plants,
  DistributionLogistics,
  Reports 
} from './components/Pages';

// Import Settings Component
import Settings from './components/Pages/Settings';

// Import Context Providers
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  const [isCircularMenuOpen, setIsCircularMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Handle circular menu toggle
  const toggleCircularMenu = () => {
    setIsCircularMenuOpen(!isCircularMenuOpen);
  };

  const closeCircularMenu = () => {
    setIsCircularMenuOpen(false);
  };

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Close circular menu on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsCircularMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // The circular menu will close when:
  // 1. Clicking the toggle button in header
  // 2. Clicking the close button in center
  // 3. Clicking on navigation links
  // 4. Clicking outside the menu

  return (
    <SettingsProvider>
      <Router>
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
          <Topbar 
            onToggleMenu={toggleCircularMenu} 
            isMenuOpen={isCircularMenuOpen}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
          <CircularMenu 
            isOpen={isCircularMenuOpen} 
            onClose={closeCircularMenu}
          />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cattle-management" element={<CattleManagement />} />
              <Route path="/milk-collection" element={<MilkCollection />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/market-analysis" element={<MarketAnalysis />} />
              <Route path="/plants" element={<Plants />} />
              <Route path="/distribution-logistics" element={<DistributionLogistics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
