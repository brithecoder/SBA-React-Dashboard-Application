import React from 'react';
import { useTheme } from '../../utils/Theme/ThemeUtils';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="app-navbar">
      <h1 className="navbar-logo">Task Dashboard</h1>
      
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-button"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {/* Display an icon or text based on the current theme */}
        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}