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
        isDnaOpen ? 'left-[328px]' : 'left-10 sm:left-12'
      } ${isOpen ? 'animate-fade-in' : ''}`}
      style={{ 
        backgroundColor: isDnaOpen ? '#0E0E0F' : '#000000',
        width: isDnaOpen ? 'calc(100vw - 328px)' : 'calc(100vw - 48px)',
        height: '100vh'
      }}
    >
      <div className={`h-full flex flex-col ${isDnaOpen ? 'p-2 sm:p-4' : ''}`}>
        <div className={`h-full flex flex-col bg-dark-bg ${isDnaOpen ? 'rounded-[18px]' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 -mt-3">
          <div className="flex items-center">
            <button
              onClick={() => {
                if (isDnaOpen && onCollapseDnaPanel) {
                  onCollapseDnaPanel();
                } else {
                  onClose();
                }
              }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
              aria-label={isDnaOpen ? "Collapse DNA panel" : "Go back"}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden -mt-2">
          {/* Scrollable Content Area */}
          <div 
            className="flex-1 overflow-y-auto scrollbar-hide"
            style={{ 
              paddingBottom: currentTrack ? '80px' : '24px', // Reduced padding for smaller player
              height: 'calc(100vh - 100px)' // Adjusted height calculation
            }}
          >
            <div className="p-4 md:p-6">
              <div className="w-full max-w-5xl mx-auto ">
                {/* Top Section - Artist Info */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start space-y-1 lg:space-y-0 lg:space-x-4 mb-2 gap-1 lg:gap-4 -mt-5">
                  {/* Circular Artwork with Waveform */}
                  <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full">
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
                  <div className="flex-1 min-w-0 text-center lg:text-left relative">
                    {/* Aurora background blur effects behind COLDPLAY text */}
                    
                    {/* Large outer aurora blur */}
                    <div 
                      className="absolute hidden lg:block"
                      style={{ 
                        width: '480px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse at center, #1B1330 0%, rgba(27, 19, 48, 0.9) 30%, rgba(27, 19, 48, 0.6) 60%, transparent 100%)`,
                        filter: 'blur(30px)',
                        WebkitFilter: 'blur(30px)',
                        zIndex: 1,
                        animation: 'aurora-shift 6s ease-in-out infinite',
                        opacity: 1,
                        top: '30%',
                        left: '35%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    {/* Medium aurora blur */}
                    <div 
                      className="absolute hidden lg:block"
                      style={{ 
                        width: '480px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse at center, #1B1330 0%, rgba(27, 19, 48, 0.8) 40%, rgba(27, 19, 48, 0.5) 70%, transparent 100%)`,
                        filter: 'blur(25px)',
                        WebkitFilter: 'blur(25px)',
                        zIndex: 2,
                        animation: 'aurora-shift 8s ease-in-out infinite reverse',
                        opacity: 0.9,
                        top: '30%',
                        left: '35%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    {/* Inner aurora blur */}
                    <div 
                      className="absolute hidden lg:block"
                      style={{ 
                        width: '480px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse at center, #1B1330 0%, rgba(27, 19, 48, 0.7) 50%, transparent 100%)`,
                        filter: 'blur(15px)',
                        WebkitFilter: 'blur(15px)',
                        zIndex: 3,
                        animation: 'aurora-shift 4s ease-in-out infinite',
                        opacity: 0.8,
                        top: '30%',
                        left: '35%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    {/* Large Artist Name with clean text */}
                    <h1 className="mb-1 lg:mb-2 text-[100px] font-[800] leading-[61px] tracking-[0] align-middle relative lg:-ml-2 mt-2" style={{
                      fontFamily: 'PowerGrotesk',
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
                    <p className="font-inter text-[10px] sm:text-[11px] font-[400] leading-[11px] sm:leading-[12px] tracking-[0] text-text-secondary mb-1 max-w-xl mx-auto lg:mx-0 mt-9" style={{color: '#D9D9D9'}}>
                      EDM visionary known for hit remixes and artist management. 6 Core Styles and 30 Signature Sounds.
                    </p>

                    {/* Genre Tags */}
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-1 flex-wrap mt-3" style={{color: '#828282'}}>
                      {['House', 'Dance Pop', 'Pop', 'EDM'].map((genre, index) => (
                        <React.Fragment key={genre}>
                          <span className="font-inter text-[10px] sm:text-[11px] font-[400] leading-[11px] sm:leading-[12px] tracking-[0] text-text-secondary">
                            {genre}
                          </span>
                          {index < 3 && (
                            <span className="font-inter text-[10px] sm:text-[11px] font-[400] leading-[11px] sm:leading-[12px] tracking-[0] text-text-secondary">•</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Separator Line - Only between heading and tabs */}
                <div className="w-full h-px bg-border-color mb-3"></div>

                {/* Tabs: CORE STYLE / SIGNATURE SOUND */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-3 mb-2">
                  <button
                    onClick={() => setActiveTab('core')}
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center ${
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
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center ${
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
                <div className="grid grid-cols-5 gap-2 mb-0 px-4" style={{ marginTop: '25px' }}>
                  {filteredStyles.map((style, index) => (
                    <div
                      key={style.id}
                      className="animate-scale-in"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        width: '150px',
                        height: '220px'
                      }}
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
            <div className="absolute bottom-3 right-3 z-30">
              <button
                onClick={onShowPlayer}
                className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Show player"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-black" fill="currentColor" />
                ) : (
                  <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
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