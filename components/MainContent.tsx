'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, Play, Pause } from 'lucide-react';
import StyleCard from './StyleCard';
import { StyleCard as StyleCardType } from '@/types';
import { styleCards } from '@/data/styles';
import { getUIImage } from '@/assets/images';
import GlobalPlayer from '@/components/GlobalPlayer';

interface MainContentProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayTrack: (track: StyleCardType) => void;
  currentTrack: StyleCardType | null;
  isPlaying: boolean;
  isPlayerVisible: boolean; // New prop for player visibility
  isDnaOpen: boolean;
  onCollapseDnaPanel?: () => void; // New prop to handle DNA panel collapse
  onClosePlayer?: () => void; // New prop to handle player close
  onShowPlayer?: () => void; // New prop to show player
  onNext: () => void; // New prop for next track
  onPrevious: () => void; // New prop for previous track
  onToggleQueue: () => void; // New prop for queue toggle
  // Audio control props
  onTogglePlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  isOpen,
  onClose,
  onPlayTrack,
  currentTrack,
  isPlaying,
  isPlayerVisible,
  isDnaOpen,
  onCollapseDnaPanel,
  onClosePlayer,
  onShowPlayer,
  onNext,
  onPrevious,
  onToggleQueue,
  onTogglePlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  currentTime,
  duration,
  volume,
  isMuted,
  hasNext,
  hasPrevious,
}) => {
  const [activeTab, setActiveTab] = useState<'core' | 'signature'>('core');

  const filteredStyles = styleCards.filter(style => style.category === activeTab);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className={`fixed top-0 right-0 bottom-0 z-20 transition-all duration-300 ${
        isDnaOpen ? 'left-121.75 lg:left-121.75 md:left-80 sm:left-16' : 'left-12 sm:left-16'
      } ${isOpen ? 'animate-fade-in' : ''}`}
      style={{ backgroundColor: isDnaOpen ? '#0E0E0F' : '#000000' }}
    >
      <div className={`h-full flex flex-col ${isDnaOpen ? 'p-2 sm:p-4' : ''}`}>
        <div className={`h-full flex flex-col bg-dark-bg ${isDnaOpen ? 'rounded-[18px]' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 -mt-4">
          <div className="flex items-center">
            <button
              onClick={() => {
                if (isDnaOpen && onCollapseDnaPanel) {
                  onCollapseDnaPanel();
                } else {
                  onClose();
                }
              }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
              aria-label={isDnaOpen ? "Collapse DNA panel" : "Go back"}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden -mt-4">
          {/* Scrollable Content Area */}
          <div 
            className="flex-1 overflow-y-auto scrollbar-hide"
            style={{ 
              paddingBottom: currentTrack ? '24px' : '24px', // Remove extra padding since player is now inside
              height: 'calc(100vh - 120px)' // Ensure proper height calculation
            }}
          >
            <div className="p-6 md:p-8">
              <div className="w-full max-w-6xl mx-auto">
                {/* Top Section - Artist Info */}
                <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8 gap-4 lg:gap-8">
                  {/* Circular Artwork with Waveform */}
                  <div className="relative flex-shrink-0">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-247 lg:h-247 rounded-full">
                      <div 
                        className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundImage: `url(${getUIImage('audioWave')})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                      </div>
                    </div>
                  </div>

                  {/* Artist Info - Right Side */}
                  <div className="flex-1 min-w-0 text-center lg:text-left relative lg:-mt-20">
                    {/* Aurora background blur effects behind COLDPLAY text */}
                    
                    {/* Large outer aurora blur */}
                    <div 
                      className="absolute hidden lg:block"
                      style={{ 
                        width: '640px',
                        height: '110px',
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse at center, #1B1330 0%, rgba(27, 19, 48, 0.9) 30%, rgba(27, 19, 48, 0.6) 60%, transparent 100%)`,
                        filter: 'blur(40px)',
                        WebkitFilter: 'blur(40px)',
                        zIndex: 1,
                        animation: 'aurora-shift 6s ease-in-out infinite',
                        opacity: 1,
                        top: '45px',
                        left: isDnaOpen ? '50%' : '35%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    {/* Medium aurora blur */}
                    <div 
                      className="absolute hidden lg:block"
                      style={{ 
                        width: '640px',
                        height: '110px',
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse at center, #1B1330 0%, rgba(27, 19, 48, 0.8) 40%, rgba(27, 19, 48, 0.5) 70%, transparent 100%)`,
                        filter: 'blur(30px)',
                        WebkitFilter: 'blur(30px)',
                        zIndex: 2,
                        animation: 'aurora-shift 8s ease-in-out infinite reverse',
                        opacity: 0.9,
                        top: '45px',
                        left: isDnaOpen ? '48%' : '33%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    {/* Inner aurora blur */}
                    <div 
                      className="absolute hidden lg:block"
                      style={{ 
                        width: '640px',
                        height: '110px',
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse at center, #1B1330 0%, rgba(27, 19, 48, 0.7) 50%, transparent 100%)`,
                        filter: 'blur(20px)',
                        WebkitFilter: 'blur(20px)',
                        zIndex: 3,
                        animation: 'aurora-shift 4s ease-in-out infinite',
                        opacity: 0.8,
                        top: '45px',
                        left: isDnaOpen ? '52%' : '37%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    {/* Large Artist Name with clean text */}
                    <h1 className="mb-6 lg:mb-10 font-power-grotesk-variable force-powergrotesk relative lg:-ml-2" style={{
                      fontFamily: 'PowerGrotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 800,
                      fontStyle: 'normal',
                      fontSize: 'clamp(48px, 8vw, 100px)',
                      lineHeight: 'clamp(48px, 8vw, 61px)',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      zIndex: 20
                    }}>
                      {/* Clean main text */}
                      <span 
                        className="relative"
                        style={{
                          color: 'white',
                          zIndex: 25,
                        }}
                      >
                        COLDPLAY
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="font-inter text-[11px] sm:text-[12px] font-[400] leading-[12px] sm:leading-[13px] tracking-[0] text-text-secondary mb-4 max-w-2xl mx-auto lg:mx-0">
                      EDM visionary known for hit remixes and artist management. 6 Core Styles and 30 Signature Sounds.
                    </p>

                    {/* Genre Tags */}
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 flex-wrap">
                      {['House', 'Dance Pop', 'Pop', 'EDM'].map((genre, index) => (
                        <React.Fragment key={genre}>
                          <span className="font-inter text-[11px] sm:text-[12px] font-[400] leading-[12px] sm:leading-[13px] tracking-[0] text-text-secondary">
                            {genre}
                          </span>
                          {index < 3 && (
                            <span className="font-inter text-[11px] sm:text-[12px] font-[400] leading-[12px] sm:leading-[13px] tracking-[0] text-text-secondary">•</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Separator Line - Only between heading and tabs */}
                <div className="w-full h-px bg-border-color mb-8"></div>

                {/* Tabs: CORE STYLE / SIGNATURE SOUND */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
                  <button
                    onClick={() => setActiveTab('core')}
                    className={`px-4 sm:px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center ${
                      activeTab === 'core'
                        ? 'text-white'
                        : 'text-text-secondary hover:text-white'
                    }`}
                    style={{
                      backgroundColor: activeTab === 'core' ? '#212121' : '#121213',
                      width: '100%',
                      maxWidth: '223px',
                      height: '36px'
                    }}
                  >
                    CORE STYLE
                  </button>
                  <button
                    onClick={() => setActiveTab('signature')}
                    className={`px-4 sm:px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center ${
                      activeTab === 'signature'
                        ? 'text-white'
                        : 'text-text-secondary hover:text-white'
                    }`}
                    style={{
                      backgroundColor: activeTab === 'signature' ? '#212121' : '#121213',
                      width: '100%',
                      maxWidth: '223px',
                      height: '36px'
                    }}
                  >
                    SIGNATURE SOUND
                  </button>
                </div>

                {/* Style Cards Grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-items-center mb-8 px-2 sm:px-0">
                  {filteredStyles.map((style, index) => (
                    <div
                      key={style.id}
                      className="animate-scale-in w-full max-w-[160px] xs:max-w-[170px] sm:max-w-[182.65px]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <StyleCard
                        style={style}
                        onPlay={onPlayTrack}
                        isPlaying={currentTrack?.id === style.id && isPlaying}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Global Player - Part of MainContent */}
          {currentTrack && isPlayerVisible && (
            <div className="absolute bottom-0 left-0 right-0 z-30">
              <GlobalPlayer
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onTogglePlayPause={onTogglePlayPause}
                onSeek={onSeek}
                onVolumeChange={onVolumeChange}
                onToggleMute={onToggleMute}
                onClose={onClosePlayer || (() => {})}
                onNext={onNext}
                onPrevious={onPrevious}
                onToggleQueue={onToggleQueue}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                isMuted={isMuted}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
              />
            </div>
          )}

          {/* Show Player Button - When music is playing but player is hidden */}
          {currentTrack && !isPlayerVisible && (
            <div className="absolute bottom-4 right-4 z-30">
              <button
                onClick={onShowPlayer}
                className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Show player"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-black" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                )}
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;