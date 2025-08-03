import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../types';

const AboutPage: React.FC = () => {
    const { theme } = useTheme();

    const themeStyles = {
        [Theme.MINIMALIST]: {
            container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
            title: 'text-4xl font-bold text-gray-900 mb-4',
            text: 'text-lg text-gray-700 leading-relaxed space-y-4',
        },
        [Theme.DARK]: {
            container: 'w-full px-4 sm:px-6 lg:px-8 py-8',
            title: 'text-5xl font-bold text-white mb-6 font-lora',
            text: 'text-xl text-gray-300 leading-loose space-y-5',
        },
        [Theme.COLORFUL]: {
            container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center',
            title: 'text-6xl text-pink-800 mb-6',
            text: 'text-2xl text-purple-800 leading-relaxed space-y-6 font-inter',
        },
    };

    const styles = themeStyles[theme];

    return (
        <div className={`${styles.container} page-container`}>
            <h1 className={styles.title}>About HipsterThemes</h1>
            <div className={styles.text}>
                <p>
                    This application is a demonstration of a powerful theming engine built with React, TypeScript, and Tailwind CSS. 
                    Our goal is to show how a theme can be more than just a color palette.
                </p>
                <p>
                    Here, themes control layout, typography, spacing, and component structure, providing a truly distinct user experience for each selection. 
                    The theme state is managed globally with React's Context API and persists across sessions using `localStorage`.
                </p>
                <p>
                    We believe in clean, maintainable code and beautiful, responsive user interfaces. Explore the themes to see the principles in action!
                </p>
            </div>
        </div>
    );
};

export default AboutPage;