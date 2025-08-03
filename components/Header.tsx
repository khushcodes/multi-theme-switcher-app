import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../types';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as Theme);
  };
  
  const themeStyles = {
    [Theme.MINIMALIST]: 'bg-white/80 backdrop-blur-sm text-gray-800 border-b border-gray-200',
    [Theme.DARK]: 'bg-gray-800/80 backdrop-blur-sm text-white border-b border-gray-700',
    [Theme.COLORFUL]: 'bg-white/70 backdrop-blur-sm text-gray-700 border-b border-pink-200',
  };
  
  const selectStyles = {
    [Theme.MINIMALIST]: 'bg-gray-100 border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500',
    [Theme.DARK]: 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500',
    [Theme.COLORFUL]: 'bg-pink-50 border-pink-300 text-pink-900 focus:ring-pink-500 focus:border-pink-500 font-inter font-bold',
  };

  const navLinkBaseStyle = 'transition-colors duration-200 whitespace-nowrap';
  const navLinkStyles: Record<string, string> = {
    [Theme.MINIMALIST]: 'text-gray-500 hover:text-gray-900',
    [Theme.COLORFUL]: 'font-inter font-bold text-purple-600 hover:text-pink-600',
  };

  const activeLinkStyles: Record<string, string> = {
      [Theme.MINIMALIST]: 'text-blue-600 font-semibold',
      [Theme.COLORFUL]: 'text-pink-600 underline underline-offset-4',
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${themeStyles[theme]}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex flex-shrink-0 items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0 1 14.25 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h4.5M12 3v13.5" />
            </svg>
          <span className={`text-xl font-bold ${theme === Theme.COLORFUL ? 'font-pacifico text-2xl text-pink-600' : ''}`}>
            HipsterThemes
          </span>
        </Link>
        
        {theme !== Theme.DARK && (
            <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
                <NavLink to="/" className={({isActive}) => `${navLinkBaseStyle} ${navLinkStyles[theme]} ${isActive ? activeLinkStyles[theme] : ''}`} end>Home</NavLink>
                <NavLink to="/about" className={({isActive}) => `${navLinkBaseStyle} ${navLinkStyles[theme]} ${isActive ? activeLinkStyles[theme] : ''}`}>About</NavLink>
                <NavLink to="/contact" className={({isActive}) => `${navLinkBaseStyle} ${navLinkStyles[theme]} ${isActive ? activeLinkStyles[theme] : ''}`}>Contact</NavLink>
            </nav>
        )}

        <div className="flex items-center gap-4">
          <label htmlFor="theme-switcher" className="sr-only">Choose a theme</label>
          <select
            id="theme-switcher"
            value={theme}
            onChange={handleThemeChange}
            className={`block w-full rounded-md border py-1.5 pl-3 pr-8 text-sm transition-all duration-300 ${selectStyles[theme]}`}
          >
            <option value={Theme.MINIMALIST}>Minimalist</option>
            <option value={Theme.DARK}>Dark</option>
            <option value={Theme.COLORFUL}>Colorful</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;