'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DNAPanel from '@/components/DNAPanel';
import MainContent from '@/components/MainContent';
import QueuePanel from '@/components/QueuePanel';
import { useAudio } from '@/hooks/useAudio';
import { PanelState } from '@/types';
import { styleCards } from '@/data/styles';

export default function Home() {
  const [panelState, setPanelState] = useState<PanelState>({
    isDnaOpen: false,
    isMainContentOpen: true, // Start with main content open showing Coldplay
    activeNavItem: 'home', // Start with home active
  });

  const {
    playbackState,
    isPlayerVisible,
    queue,
    currentIndex,
    isQueueVisible,
    playTrack,
    playNext,
    playPrevious,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    stopTrack,
    hidePlayer,
    showPlayer,
    toggleQueue,
    hideQueue,
    playFromQueue,
    removeFromQueue,
  } = useAudio();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && playbackState.currentTrack) {
        e.preventDefault();
        togglePlayPause();
      }
      if (e.code === 'Escape') {
        if (panelState.isDnaOpen) {
          setPanelState(prev => ({ ...prev, isDnaOpen: false, activeNavItem: 'home' }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playbackState.currentTrack, togglePlayPause, panelState.isDnaOpen]);

  const handleNavItemClick = (item: 'create' | 'home' | 'search' | 'library' | 'dna') => {
    if (item === 'dna') {
      setPanelState(prev => ({ 
        ...prev, 
        isDnaOpen: true, 
        activeNavItem: item,
        isMainContentOpen: true 
      }));
    } else if (item === 'create') {
      // Point 2: Clicking "+" icon reopens the right panel/modal
      setPanelState(prev => ({ 
        ...prev, 
        isDnaOpen: false, 
        activeNavItem: item,
        isMainContentOpen: true // Reopen main content when clicking create/+
      }));
    } else {
      setPanelState(prev => ({ 
        ...prev, 
        isDnaOpen: false, 
        activeNavItem: item,
        isMainContentOpen: item === 'home' || item === 'search' || item === 'library'
      }));
    }
  };

  const handlePlayTrack = (track: any) => {
    // When playing a track, set all style cards as the queue
    playTrack(track, styleCards);
  };

  const handleCollapseDnaPanel = () => {
    setPanelState(prev => ({ ...prev, isDnaOpen: false, activeNavItem: 'home' }));
  };

  const handleCloseMainContent = () => {
    setPanelState(prev => ({ ...prev, isMainContentOpen: false }));
  };

  const handleLogoClick = () => {
    // Close main content to show the "Meet DNA" empty state
    setPanelState(prev => ({ 
      ...prev, 
      isMainContentOpen: false, 
      isDnaOpen: false,
      activeNavItem: 'home' 
    }));
  };

  const handleClosePlayer = () => {
    // Only hide the player UI, don't stop the music
    hidePlayer();
  };

  return (
    <main className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeNavItem={panelState.activeNavItem}
        onNavItemClick={handleNavItemClick}
        onLogoClick={handleLogoClick}
      />

      {/* DNA Panel */}
      <DNAPanel
        isOpen={panelState.isDnaOpen}
        onClose={handleCollapseDnaPanel}
      />

      {/* Main Content */}
      <MainContent
        isOpen={panelState.isMainContentOpen}
        onClose={handleCloseMainContent}
        onPlayTrack={handlePlayTrack}
        currentTrack={playbackState.currentTrack}
        isPlaying={playbackState.isPlaying}
        isPlayerVisible={isPlayerVisible}
        isDnaOpen={panelState.isDnaOpen}
        onCollapseDnaPanel={handleCollapseDnaPanel}
        onClosePlayer={handleClosePlayer}
        onShowPlayer={showPlayer}
        onNext={playNext}
        onPrevious={playPrevious}
        onToggleQueue={toggleQueue}
        onTogglePlayPause={togglePlayPause}
        onSeek={seek}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        currentTime={playbackState.currentTime}
        duration={playbackState.duration}
        volume={playbackState.volume}
        isMuted={playbackState.isMuted}
        hasNext={currentIndex < queue.length - 1}
        hasPrevious={currentIndex > 0}
      />

      {/* Queue Panel */}
      <QueuePanel
        isVisible={isQueueVisible}
        queue={queue}
        currentIndex={currentIndex}
        onClose={hideQueue}
        onPlayFromQueue={playFromQueue}
        onRemoveFromQueue={removeFromQueue}
        isPlaying={playbackState.isPlaying}
      />

      {/* Empty State when main content is closed - Point 1.2 */}
      {!panelState.isMainContentOpen && (
        <div 
          className={`flex items-center justify-center min-h-screen transition-all duration-500 ease-out ${
            panelState.isDnaOpen ? 'ml-96 xl:ml-96 lg:ml-80 md:ml-64 sm:ml-16' : 'ml-12 sm:ml-16'
          } animate-fade-in px-4 py-8`}
        >
          <div 
            className="text-center px-4 sm:px-6 animate-scale-in flex flex-col justify-center items-center max-w-full"
            style={{
              width: 'min(800px, calc(100vw - 80px))',
              height: 'auto',
              minHeight: 'min(503px, 70vh)'
            }}
          >
            {/* Main Heading */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-1 sm:mb-2 tracking-wide font-power-grotesk animate-slide-up"
              style={{
                fontSize: 'clamp(2rem, 6vw + 1rem, 4.5rem)',
                fontWeight: '300',
                lineHeight: '1.1'
              }}>
                MEET
              </h1>
              <h2 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-white tracking-tight font-power-grotesk animate-slide-up" style={{ 
                animationDelay: '0.1s', 
                fontSize: 'clamp(3rem, 12vw + 1rem, 12.5rem)', 
                lineHeight: '0.9', 
                fontWeight: '900' 
              }}>
                DNA
              </h2>
            </div>

            {/* Description */}
            <p 
              className="text-text-secondary text-sm xs:text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-12 leading-relaxed mx-auto animate-slide-up flex items-center justify-center px-2 sm:px-4" 
              style={{ 
                animationDelay: '0.2s',
                width: 'min(768px, 100%)',
                height: 'auto',
                minHeight: '40px',
                fontSize: 'clamp(0.875rem, 2vw + 0.5rem, 1.125rem)',
                lineHeight: '1.6',
              }}
            >
              Soundverse DNA empowers artists to create their sonic identity while enabling others to generate unique music in their style, ensuring they get paid.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-up w-full max-w-xs xs:max-w-md sm:max-w-none" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => handleNavItemClick('home')}
                className="bg-[radial-gradient(rgb(166,51,238),rgb(105,39,211),rgb(62,34,175),rgb(42,31,90))] border border-[1.6px] border-[#a855f7] rounded-full text-white font-inter text-[14px] xs:text-[16px] sm:text-[18px] font-[700] leading-[20px] xs:leading-[24px] sm:leading-[28px] px-[16px] xs:px-[20px] sm:px-[24px] py-[8px] xs:py-[10px] sm:py-[12px] text-center transition-all duration-200 hover:shadow-lg hover:scale-105 w-full xs:w-auto min-w-[160px] xs:min-w-[180px] sm:min-w-[200px]"
              >
                Discover Creators
              </button>
              
              <button
                onClick={() => handleNavItemClick('dna')}
                className="bg-gradient-to-r from-[rgb(0,108,59)] via-[rgb(0,170,101)] via-[rgb(0,190,119)] to-[rgb(27,217,146)] border border-[1.6px] border-[#22c55e] rounded-full text-white font-inter text-[14px] xs:text-[16px] sm:text-[18px] font-[700] leading-[20px] xs:leading-[24px] sm:leading-[28px] px-[16px] xs:px-[20px] sm:px-[24px] py-[8px] xs:py-[10px] sm:py-[12px] text-center transition-all duration-200 hover:shadow-lg hover:scale-105 w-full xs:w-auto min-w-[160px] xs:min-w-[180px] sm:min-w-[200px]"
              >
                Build DNA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </main>
  );
}