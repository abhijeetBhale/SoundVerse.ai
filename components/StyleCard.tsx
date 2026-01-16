'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { StyleCard as StyleCardType } from '@/types';

interface StyleCardProps {
  style: StyleCardType;
  onPlay: (style: StyleCardType) => void;
  isPlaying?: boolean;
}

const StyleCard: React.FC<StyleCardProps> = ({ style, onPlay, isPlaying = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    // Card click and button click both trigger player
    onPlay(style);
  };

  return (
    <div className="relative"> {/* Removed margin-right to use grid gaps */}
      {/* Hover Background - Same size as the card */}
      <div
        className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: '#212121',
          transform: isHovered ? 'scale(1.01)' : 'scale(1)',
          width: 'calc(100% + 8px)',
          height: 'calc(100% + 8px)',
          maxWidth: '148px',
          marginLeft: '-4px',
          marginTop: '-4px',
          borderRadius: '6px',
        }}
      />
      
      {/* Main Card */}
      <div
        className="group relative cursor-pointer transition-all duration-200 w-full max-w-[140px] mx-auto z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onPlay(style)}
        role="button"
        tabIndex={0}
        aria-label={`Play ${style.title} - ${style.description}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPlay(style);
          }
        }}
      >
      {/* Image Container - Responsive dimensions */}
      <div className="relative w-full aspect-square" style={{ 
        borderRadius: '4px',
        overflow: 'hidden',
        maxWidth: '140px',
        margin: '0 auto'
      }}>
        <div
          className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `url(${style.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '4px'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-200 ${
            isHovered || isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handlePlay}
            className={`transition-all duration-200 ${
              isHovered || isPlaying ? 'scale-100' : 'scale-75'
            } hover:scale-110`}
            aria-label={`Play ${style.title}`}
          >
            <Play className="w-8 h-8 text-white" fill="white" />
          </button>
        </div>

        {/* Playing Indicator - Removed waveform bars */}
        {isPlaying && (
          <div className="absolute top-3 right-3">
            {/* Removed the animated waveform bars */}
          </div>
        )}
      </div>

      {/* Content - No background, centered text */}
      <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col justify-center items-center">
        <div className="text-center w-full">
          <h3 className="font-power text-[14px] sm:text-[16px] md:text-[18px] font-[400] leading-[1.4] tracking-[0] text-center text-white transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis -mt-1 sm:-mt-2">
            {style.title}
          </h3>
          <p className="font-macan text-[9px] sm:text-[10px] md:text-[11px] font-[400] leading-[1.4] tracking-[0] text-center text-text-secondary line-clamp-2 px-1" style={{color: '#828282'}}>
            {style.description}
          </p>
        </div>
      </div>

    </div>
    </div>
  );
};

export default StyleCard;