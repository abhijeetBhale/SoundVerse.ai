'use client';

import React, { useState } from 'react';
import { PlusCircle, Home, Search, Library, Menu, X } from 'lucide-react';
import { getUIImage } from '@/assets/images';

interface SidebarProps {
  activeNavItem: 'create' | 'home' | 'search' | 'library' | 'dna';
  onNavItemClick: (item: 'create' | 'home' | 'search' | 'library' | 'dna') => void;
  onLogoClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeNavItem, onNavItemClick, onLogoClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'create' as const, icon: PlusCircle, label: 'Create' },
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'library' as const, icon: Library, label: 'Library' },
  ];

  const handleNavClick = (item: 'create' | 'home' | 'search' | 'library' | 'dna') => {
    onNavItemClick(item);
    setIsMobileMenuOpen(false); // Close menu after selection
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on small screens */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-8 sm:w-10 bg-dark-bg z-40 flex-col items-center py-2 sm:py-3">
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
              console.log('Logo failed to load');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Navigation Items */}
        <div className="flex flex-col items-center" style={{ width: '100%', maxWidth: '20px', height: 'auto', minHeight: '120px' }}>
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
              onError={(e) => {
                console.log('Profile image failed to load');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Top Navbar - Visible only on small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-dark-bg z-40 flex items-center justify-between px-4">
        {/* Logo */}
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={onLogoClick}
          aria-label="Go to Meet DNA page"
        >
          <img
            src={getUIImage('logoSoundverseAi')}
            alt="SoundVerse AI"
            className="w-6 h-6 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800/50 transition-all"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-dark-bg z-40 border-t border-gray-800 animate-slide-down">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeNavItem === item.id
                      ? 'bg-[#1C1E1F] text-white'
                      : 'hover:bg-[#1C1E1F] text-text-secondary hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
            
            {/* DNA Tab */}
            <button
              onClick={() => handleNavClick('dna')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeNavItem === 'dna'
                  ? 'bg-[#1C1E1F] text-white'
                  : 'hover:bg-[#1C1E1F] text-text-secondary hover:text-white'
              }`}
            >
              <span className="text-sm font-bold">DNA</span>
              <span className="text-sm font-medium">DNA Panel</span>
            </button>

            {/* Profile */}
            <div className="pt-4 border-t border-gray-800">
              <button className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#1C1E1F] transition-all duration-200 w-full">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800">
                  <img
                    src={getUIImage('profileImage')}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-text-secondary">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;