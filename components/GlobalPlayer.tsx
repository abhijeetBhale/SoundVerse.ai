'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, X, SkipBack, SkipForward, List } from 'lucide-react';
import { StyleCard } from '@/types';

interface GlobalPlayerProps {
  currentTrack: StyleCard | null;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleQueue: () => void;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

const GlobalPlayer: React.FC<GlobalPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onClose,
  onNext,
  onPrevious,
  onToggleQueue,
  currentTime,
  duration,
  volume,
  isMuted,
  hasNext,
  hasPrevious,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [isDraggingSeek, setIsDraggingSeek] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef<HTMLDivElement>(null);

  if (!currentTrack) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Improved volume handling with smooth dragging
  const handleVolumeInteraction = useCallback((clientX: number) => {
    if (!volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onVolumeChange(percent);
  }, [onVolumeChange]);

  const handleVolumeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingVolume(true);
    handleVolumeInteraction(e.clientX);
  }, [handleVolumeInteraction]);

  const handleVolumeMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingVolume) {
      handleVolumeInteraction(e.clientX);
    }
  }, [isDraggingVolume, handleVolumeInteraction]);

  const handleVolumeMouseUp = useCallback(() => {
    setIsDraggingVolume(false);
  }, []);

  // Simplified seek handling - immediate seek on interaction
  const handleSeekInteraction = useCallback((clientX: number) => {
    if (!seekRef.current) return;
    
    const rect = seekRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    
    // Immediately seek to the new position
    onSeek(newTime);
  }, [onSeek, duration]);

  const handleSeekMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingSeek(true);
    handleSeekInteraction(e.clientX);
  }, [handleSeekInteraction]);

  const handleSeekMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingSeek) {
      handleSeekInteraction(e.clientX);
    }
  }, [isDraggingSeek, handleSeekInteraction]);

  const handleSeekMouseUp = useCallback(() => {
    setIsDraggingSeek(false);
  }, []);

  // Global mouse event listeners for smooth dragging
  React.useEffect(() => {
    if (isDraggingVolume) {
      document.addEventListener('mousemove', handleVolumeMouseMove);
      document.addEventListener('mouseup', handleVolumeMouseUp);
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleVolumeMouseMove);
      document.removeEventListener('mouseup', handleVolumeMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDraggingVolume, handleVolumeMouseMove, handleVolumeMouseUp]);

  React.useEffect(() => {
    if (isDraggingSeek) {
      document.addEventListener('mousemove', handleSeekMouseMove);
      document.addEventListener('mouseup', handleSeekMouseUp);
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleSeekMouseMove);
      document.removeEventListener('mouseup', handleSeekMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDraggingSeek, handleSeekMouseMove, handleSeekMouseUp]);

  // Simple progress calculation - always use actual current time
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="p-2 flex justify-center">
      <div className={`bg-dark-bg rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-3 relative transition-all duration-300 shadow-2xl border border-gray-800/50 ${
        isClosing ? 'animate-player-slide-out' : 'animate-player-slide-in'
      }`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        width: '96%',
        maxWidth: '900px',
        minWidth: '280px',
        height: 'auto',
        minHeight: '80px'
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center z-10 backdrop-blur-sm"
          aria-label="Close player"
        >
          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-text-secondary hover:text-white transition-colors" />
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between pr-2 sm:pr-4 gap-2 lg:gap-0">
          {/* Track Info */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink-0 lg:flex-1 lg:max-w-[200px] xl:max-w-[250px] justify-center lg:justify-start">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-purple-600 to-blue-600"
              style={{
                backgroundImage: `url(${currentTrack.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-bold text-xs sm:text-sm truncate">
                {currentTrack.title}
              </h4>
              <p className="text-text-secondary text-[10px] sm:text-xs truncate">
                {currentTrack.description.split(' - ')[0]} • {currentTrack.category.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center justify-center space-y-1 flex-1 w-full lg:max-w-md xl:max-w-lg">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                  hasPrevious 
                    ? 'hover:bg-gray-900 text-text-secondary hover:text-white' 
                    : 'text-gray-600 cursor-not-allowed'
                }`}
                aria-label="Previous track"
              >
                <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors" />
              </button>
              
              <button
                onClick={onTogglePlayPause}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="currentColor" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                )}
              </button>
              
              <button
                onClick={onNext}
                disabled={!hasNext}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                  hasNext 
                    ? 'hover:bg-gray-900 text-text-secondary hover:text-white' 
                    : 'text-gray-600 cursor-not-allowed'
                }`}
                aria-label="Next track"
              >
                <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors" />
              </button>

              <button
                onClick={onToggleQueue}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
                aria-label="Show queue"
              >
                <List className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-secondary hover:text-white transition-colors" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 w-full">
              <span className="text-[10px] sm:text-xs text-text-secondary min-w-[28px] sm:min-w-[32px] font-mono time-display">
                {formatTime(currentTime)}
              </span>
              <div
                ref={seekRef}
                className="flex-1 h-1.5 sm:h-2 bg-gray-900 rounded-full cursor-pointer group relative"
                onMouseDown={handleSeekMouseDown}
              >
                {/* Progress fill */}
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full group-hover:from-purple-500 group-hover:to-purple-600 relative transition-none"
                  style={{ 
                    width: `${Math.max(0, Math.min(100, progress))}%`
                  }}
                >
                  {/* Progress handle */}
                  <div className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full shadow-lg transition-all duration-200 ${
                    isDraggingSeek || progress > 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-text-secondary min-w-[28px] sm:min-w-[32px] font-mono time-display">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0 justify-end lg:max-w-[140px] xl:max-w-[160px]">
            <button
              onClick={onToggleMute}
              className="w-7 h-7 xl:w-8 xl:h-8 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-text-secondary hover:text-white transition-colors" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-text-secondary hover:text-white transition-colors" />
              )}
            </button>
            <div className="relative">
              <div
                ref={volumeRef}
                className="w-16 xl:w-20 h-1.5 xl:h-2 bg-gray-900 rounded-full cursor-pointer group relative"
                onMouseDown={handleVolumeMouseDown}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all duration-150 group-hover:from-purple-500 group-hover:to-purple-600 relative"
                  style={{ 
                    width: `${isMuted ? 0 : volume * 100}%`,
                    transition: isDraggingVolume ? 'none' : 'width 0.15s ease-out'
                  }}
                >
                  <div className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 xl:w-3 xl:h-3 bg-white rounded-full shadow-lg transition-opacity duration-200 ${
                    isDraggingVolume ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
              </div>
              {/* Volume Percentage Display */}
              <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded transition-opacity duration-200 ${
                isDraggingVolume ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </div>
            </div>
          </div>

          {/* Volume - Mobile/Tablet */}
          <div className="flex lg:hidden items-center space-x-2 justify-center">
            <button
              onClick={onToggleMute}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-secondary" />
              ) : (
                <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-secondary" />
              )}
            </button>
            <div className="relative group">
              <div
                className="w-12 sm:w-16 h-1 sm:h-1.5 bg-gray-900 rounded-full cursor-pointer relative"
                onMouseDown={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  const newVolume = Math.max(0, Math.min(1, percent));
                  onVolumeChange(newVolume);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all duration-150"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                />
              </div>
              {/* Mobile Volume Percentage Display */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPlayer;