'use client';

import React from 'react';
import { PlusCircle, Home, Search, Library } from 'lucide-react';
import { getUIImage } from '@/assets/images';

interface SidebarProps {
  activeNavItem: 'create' | 'home' | 'search' | 'library' | 'dna';
  onNavItemClick: (item: 'create' | 'home' | 'search' | 'library' | 'dna') => void;
  onLogoClick?: () => void; // New prop for logo click
}

const Sidebar: React.FC<SidebarProps> = ({ activeNavItem, onNavItemClick, onLogoClick }) => {
  const navItems = [
    { id: 'create' as const, icon: PlusCircle, label: 'Create' },
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'library' as const, icon: Library, label: 'Library' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-8 sm:w-10 bg-dark-bg z-40 flex flex-col items-center py-2 sm:py-3">
      {/* Logo */}
      <div 
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center mb-2 sm:mb-2 cursor-pointer hover:bg-gray-800/20 transition-all duration-200"
        onClick={onLogoClick}
        aria-label="Go to Meet DNA page"
        title="Meet DNA"
      >
        <img
          src={getUIImage('logoSoundverseAi')}
          alt="SoundVerse AI"
          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          onError={(e) => {
            // If logo fails to load, hide it and show fallback
            console.log('Logo failed to load');
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
      
      {/* Navigation Items Container with specified dimensions */}
      <div className="flex flex-col items-center" style={{ width: '100%', maxWidth: '20px', height: 'auto', minHeight: '120px' }}>
        {/* Navigation Items */}
        <div className="flex flex-col space-y-1 mb-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavItemClick(item.id)}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg transition-all duration-200 flex items-center justify-center group ${
                  activeNavItem === item.id
                    ? 'bg-[#1C1E1F] text-white'
                    : 'hover:bg-[#1C1E1F] text-text-secondary hover:text-white'
                }`}
                aria-label={item.label}
                title={item.label}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            );
          })}
        </div>

        {/* DNA Tab */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onNavItemClick('dna')}
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg transition-all duration-200 flex items-center justify-center group text-[8px] sm:text-[10px] font-bold ${
              activeNavItem === 'dna'
                ? 'bg-[#1C1E1F] text-white'
                : 'text-text-secondary hover:text-white hover:bg-[#1C1E1F]'
            }`}
            aria-label="DNA"
            title="DNA"
          >
            DNA
          </button>
        </div>
      </div>
      
      {/* Profile */}
      <div className="mt-auto">
        <button 
          className="rounded-full overflow-hidden hover:scale-105 transition-transform duration-200 flex items-center justify-center relative bg-gray-800"
          style={{ width: '27px', height: '27px' }}
          aria-label="Profile"
          title="Profile"
        >
          <img
            src={getUIImage('profileImage')}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
            onLoad={() => {
              // Image loaded successfully
              console.log('Profile image loaded successfully');
            }}
            onError={(e) => {
              // If image fails to load, hide it and show the User icon
              console.log('Profile image failed to load');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;