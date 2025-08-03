
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('app-theme');
      return savedTheme ? (savedTheme as Theme) : Theme.MINIMALIST;
    } catch (error) {
      console.error('Failed to read theme from localStorage', error);
      return Theme.MINIMALIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('app-theme', theme);
      
      const body = document.body;
      body.classList.remove('theme-minimalist', 'theme-dark', 'theme-colorful');
      
      let fontClass = '';
      let bgClass = '';
      
      switch (theme) {
        case Theme.MINIMALIST:
          fontClass = 'font-inter';
          bgClass = 'bg-slate-50';
          body.classList.add('theme-minimalist');
          break;
        case Theme.DARK:
          fontClass = 'font-lora';
          bgClass = 'bg-gray-900';
          body.classList.add('theme-dark');
          break;
        case Theme.COLORFUL:
          fontClass = 'font-pacifico';
          bgClass = 'bg-gradient-to-br from-purple-100 via-pink-100 to-red-100';
          body.classList.add('theme-colorful');
          break;
      }

      // Remove old font classes and add new ones
      document.documentElement.classList.remove('font-inter', 'font-lora', 'font-pacifico');
      document.documentElement.classList.add(fontClass);
      
      // Apply background to body
      body.className = `${body.className.split(' ').filter(c => !c.startsWith('bg-')).join(' ')} ${bgClass}`;

    } catch (error) {
      console.error('Failed to save theme to localStorage', error);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
