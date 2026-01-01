'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, X } from 'lucide-react';
import { StyleCard } from '@/types';

interface InlinePlayerProps {
  currentTrack: StyleCard;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onClose: () => void; // New prop for closing the player
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

const InlinePlayer: React.FC<InlinePlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onClose,
  currentTime,
  duration,
  volume,
  isMuted,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // Delay the actual close to allow animation to complete
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));
    onVolumeChange(newVolume);
  };

  return (
    <div className={`bg-dark-bg rounded-3xl p-6 relative transition-all duration-300 shadow-2xl border border-gray-800/50 ${
      isClosing ? 'animate-player-slide-out' : 'animate-player-slide-in'
    }`}
    style={{
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
    }}>
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center z-10 backdrop-blur-sm"
        aria-label="Close player"
      >
        <X className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 pr-8">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <div 
            className="w-16 h-16 rounded-xl flex-shrink-0 bg-gradient-to-br from-purple-600 to-blue-600"
            style={{
              backgroundImage: `url(${currentTrack.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="min-w-0">
            <h4 className="text-white font-bold text-base truncate">
              {currentTrack.title}
            </h4>
            <p className="text-text-secondary text-sm truncate">
              COLDPLAY • {currentTrack.category.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-3 flex-1 max-w-lg">
          <div className="flex items-center space-x-6">
            <button
              className="w-8 h-8 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
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
              className="w-8 h-8 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-3 w-full">
            <span className="text-xs text-text-secondary min-w-[35px] font-mono">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-2 bg-gray-900 rounded-full cursor-pointer group relative"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all group-hover:from-purple-500 group-hover:to-purple-600 relative"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-text-secondary min-w-[35px] font-mono">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
          <button
            onClick={onToggleMute}
            className="w-10 h-10 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-text-secondary hover:text-white transition-colors" />
            ) : (
              <Volume2 className="w-5 h-5 text-text-secondary hover:text-white transition-colors" />
            )}
          </button>
          <div
            className="w-24 h-2 bg-gray-900 rounded-full cursor-pointer group relative"
            onClick={handleVolumeChange}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all group-hover:from-purple-500 group-hover:to-purple-600 relative"
              style={{ width: `${volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Mobile Volume */}
        <div className="flex md:hidden items-center space-x-3 justify-center">
          <button
            onClick={onToggleMute}
            className="w-8 h-8 rounded-full hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-text-secondary" />
            ) : (
              <Volume2 className="w-4 h-4 text-text-secondary" />
            )}
          </button>
          <div
            className="w-20 h-2 bg-gray-900 rounded-full cursor-pointer group relative"
            onClick={handleVolumeChange}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlinePlayer;