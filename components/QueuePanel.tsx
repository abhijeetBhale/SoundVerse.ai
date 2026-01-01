'use client';

import React from 'react';
import { X, Play, Trash2 } from 'lucide-react';
import { StyleCard } from '@/types';

interface QueuePanelProps {
  isVisible: boolean;
  queue: StyleCard[];
  currentIndex: number;
  onClose: () => void;
  onPlayFromQueue: (track: StyleCard) => void;
  onRemoveFromQueue: (trackId: string) => void;
  isPlaying: boolean;
}

const QueuePanel: React.FC<QueuePanelProps> = ({
  isVisible,
  queue,
  currentIndex,
  onClose,
  onPlayFromQueue,
  onRemoveFromQueue,
  isPlaying,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-dark-bg rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Queue</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
            aria-label="Close queue"
          >
            <X className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
          </button>
        </div>

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {queue.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-secondary">No songs in queue</p>
            </div>
          ) : (
            <div className="space-y-2">
              {queue.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                    index === currentIndex
                      ? 'bg-purple-600/20 border border-purple-600/30'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  {/* Track Image */}
                  <div 
                    className="w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-purple-600 to-blue-600"
                    style={{
                      backgroundImage: `url(${track.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm truncate ${
                      index === currentIndex ? 'text-purple-400' : 'text-white'
                    }`}>
                      {track.title}
                    </h4>
                    <p className="text-text-secondary text-xs truncate">
                      {track.description.split(' - ')[0]}
                    </p>
                  </div>

                  {/* Current Playing Indicator */}
                  {index === currentIndex && (
                    <div className="flex items-center space-x-2">
                      {isPlaying && (
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-purple-400 rounded-full waveform-bar"
                              style={{
                                height: `${8 + Math.random() * 6}px`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {index !== currentIndex && (
                      <button
                        onClick={() => onPlayFromQueue(track)}
                        className="w-8 h-8 rounded-full hover:bg-gray-700 transition-all duration-200 flex items-center justify-center"
                        aria-label={`Play ${track.title}`}
                      >
                        <Play className="w-3 h-3 text-white" fill="currentColor" />
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveFromQueue(track.id)}
                      className="w-8 h-8 rounded-full hover:bg-red-600/20 transition-all duration-200 flex items-center justify-center"
                      aria-label={`Remove ${track.title} from queue`}
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {queue.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-text-secondary text-sm text-center">
              {queue.length} song{queue.length !== 1 ? 's' : ''} in queue
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueuePanel;