
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Sidebar: React.FC = () => {
    const { theme } = useTheme();

    const linkStyle = "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-md";
    const activeLinkStyle = "bg-gray-700 text-white";

    return (
        <aside className="w-64 bg-gray-800 border-r border-gray-700 flex-shrink-0 flex-col hidden md:flex">
            <div className="h-16 flex items-center justify-center border-b border-gray-700">
                <span className="text-white text-xl font-lora font-bold">Navigation</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink to="/" className={({isActive}) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`} end>
                    Home
                </NavLink>
                <NavLink to="/about" className={({isActive}) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>
                    About
                </NavLink>
                <NavLink to="/contact" className={({isActive}) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>
                    Contact
                </NavLink>
            </nav>
            <div className="px-4 py-4 border-t border-gray-700 text-xs text-gray-500">
                <p>&copy; 2024 Hipster Inc.</p>
                <p>All rights reserved.</p>
            </div>
        </aside>
    );
};

export default Sidebar;
