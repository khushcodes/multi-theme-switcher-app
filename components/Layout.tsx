
import React, { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../types';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  const baseContainerClasses = 'transition-all duration-500 ease-in-out';

  if (theme === Theme.DARK) {
    return (
      <div className={`${baseContainerClasses} text-gray-100 min-h-screen flex`}>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={baseContainerClasses}>
      <Header />
      <main className="pt-20"> {/* Padding top to avoid content being hidden by fixed header */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
