'use client';

import React, { useState } from 'react';
import { Keyboard, X } from 'lucide-react';

const KeyboardShortcuts: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const shortcuts = [
    { key: 'Space', description: 'Play/Pause current track' },
    { key: '← →', description: 'Previous/Next track' },
    { key: '↑ ↓', description: 'Volume up/down (10% increments)' },
    { key: 'M', description: 'Mute/Unmute' },
    { key: 'Q', description: 'Toggle queue panel' },
    { key: 'Esc', description: 'Close panels' },
  ];

  return (
    <>
      {/* Keyboard Shortcuts Button */}
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        aria-label="Show keyboard shortcuts"
        title="Keyboard Shortcuts"
      >
        <Keyboard className="w-5 h-5 text-white" />
      </button>

      {/* Keyboard Shortcuts Modal */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-bg rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Keyboard className="w-5 h-5" />
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setIsVisible(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
                aria-label="Close shortcuts"
              >
                <X className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-text-secondary text-sm">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.key.split(' ').map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <kbd className="px-2 py-1 bg-gray-800 text-white text-xs rounded border border-gray-600 font-mono">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.key.split(' ').length - 1 && (
                          <span className="text-text-secondary text-xs mx-1">or</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-text-secondary text-xs text-center">
                Shortcuts work when not typing in input fields
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardShortcuts;