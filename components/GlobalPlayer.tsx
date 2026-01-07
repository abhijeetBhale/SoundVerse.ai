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
      <div className={`bg-dark-bg rounded-xl p-3 relative transition-all duration-300 shadow-2xl border border-gray-800/50 ${
        isClosing ? 'animate-player-slide-out' : 'animate-player-slide-in'
      }`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        width: '800px', // Fixed width instead of flexible
        height: '100px' // Reduced height to prevent large container
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-5 h-5 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center z-10 backdrop-blur-sm"
          aria-label="Close player"
        >
          <X className="w-3 h-3 text-text-secondary hover:text-white transition-colors" />
        </button>

        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center justify-between pr-4">
          {/* Track Info */}
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div 
              className="w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-purple-600 to-blue-600"
              style={{
                backgroundImage: `url(${currentTrack.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate">
                {currentTrack.title}
              </h4>
              <p className="text-text-secondary text-sm truncate">
                {currentTrack.description.split(' - ')[0]} • {currentTrack.category.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-1 flex-1 max-w-md">
            <div className="flex items-center space-x-3 ml-10">
              <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                  hasPrevious 
                    ? 'hover:bg-gray-900 text-text-secondary hover:text-white' 
                    : 'text-gray-600 cursor-not-allowed'
                }`}
                aria-label="Previous track"
              >
                <SkipBack className="w-4 h-4 transition-colors" />
              </button>
              
              <button
                onClick={onTogglePlayPause}
                className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-black" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                )}
              </button>
              
              <button
                onClick={onNext}
                disabled={!hasNext}
                className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                  hasNext 
                    ? 'hover:bg-gray-900 text-text-secondary hover:text-white' 
                    : 'text-gray-600 cursor-not-allowed'
                }`}
                aria-label="Next track"
              >
                <SkipForward className="w-4 h-4 transition-colors" />
              </button>

              <button
                onClick={onToggleQueue}
                className="w-8 h-8 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center ml-1"
                aria-label="Show queue"
              >
                <List className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3 w-full">
              <span className="text-sm text-text-secondary min-w-[30px] font-mono time-display">
                {formatTime(currentTime)}
              </span>
              <div
                ref={seekRef}
                className="flex-1 h-2 bg-gray-900 rounded-full cursor-pointer group relative"
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
                  <div className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-200 ${
                    isDraggingSeek || progress > 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
              </div>
              <span className="text-sm text-text-secondary min-w-[30px] font-mono time-display">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <button
              onClick={onToggleMute}
              className="w-8 h-8 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
              ) : (
                <Volume2 className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
              )}
            </button>
            <div className="relative">
              <div
                ref={volumeRef}
                className="w-20 h-2 bg-gray-900 rounded-full cursor-pointer group relative"
                onMouseDown={handleVolumeMouseDown}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all duration-150 group-hover:from-purple-500 group-hover:to-purple-600 relative"
                  style={{ 
                    width: `${isMuted ? 0 : volume * 100}%`,
                    transition: isDraggingVolume ? 'none' : 'width 0.15s ease-out'
                  }}
                >
                  <div className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-opacity duration-200 ${
                    isDraggingVolume ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
              </div>
              {/* Volume Percentage Display */}
              <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity duration-200 ${
                isDraggingVolume ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </div>
            </div>
          </div>

          {/* Mobile Volume */}
          <div className="flex md:hidden items-center space-x-2 justify-center">
            <button
              onClick={onToggleMute}
              className="w-6 h-6 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3 text-text-secondary" />
              ) : (
                <Volume2 className="w-3 h-3 text-text-secondary" />
              )}
            </button>
            <div className="relative group">
              <div
                className="w-12 h-1 bg-gray-900 rounded-full cursor-pointer relative"
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
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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