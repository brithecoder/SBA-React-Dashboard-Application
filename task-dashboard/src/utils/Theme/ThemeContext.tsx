import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
// Import the Context object from the new file
import { ThemeContext } from './ThemeUtils';

// Exporting types is fine
export type Theme = 'light' | 'dark';

// 1. THIS IS THE ONLY COMPONENT EXPORT REMAINING
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};