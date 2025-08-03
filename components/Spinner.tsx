
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../types';

const Spinner: React.FC = () => {
    const { theme } = useTheme();

    const colorClasses = {
        [Theme.MINIMALIST]: 'border-t-gray-900',
        [Theme.DARK]: 'border-t-white',
        [Theme.COLORFUL]: 'border-t-pink-600',
    };

    return (
        <div className="flex justify-center items-center p-10">
            <div className={`w-12 h-12 border-4 border-gray-300/50 rounded-full animate-spin ${colorClasses[theme]}`}></div>
        </div>
    );
};

export default Spinner;
