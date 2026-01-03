'use client';

import React from 'react';
import { X, Plus } from 'lucide-react';

interface DNAPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DNAPanel: React.FC<DNAPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'core' | 'signature'>('core');
  const [lyrics, setLyrics] = React.useState('');
  const [selectedOutput, setSelectedOutput] = React.useState<'song' | 'instrumental' | 'singing'>('song');
  const [inputMode, setInputMode] = React.useState<'describe' | 'lyrics'>('describe'); // New state for input mode

  const maxLyricsLength = 3000;

  const handleClearLyrics = () => {
    setLyrics('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-16 top-0 h-full z-30 animate-slide-in" style={{ width: '423px' }}>
      <div className="flex flex-col h-full bg-dark-bg">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold text-white font-power-grotesk">DNA</h1>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
            aria-label="Close DNA panel"
          >
            <X className="w-4 h-4 text-text-secondary hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-8">
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setActiveTab('core')}
                className={`rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'core'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                style={{ 
                  width: '149.68px',
                  height: '40px', 
                  borderRadius: '32px',
                  backgroundColor: activeTab === 'core' ? '#474E54' : '#181A1C'
                }}
              >
                Core Style
              </button>
              <button
                onClick={() => setActiveTab('signature')}
                className={`rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'signature'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                style={{ 
                  width: '149.68px',
                  height: '40px', 
                  borderRadius: '32px',
                  backgroundColor: activeTab === 'signature' ? '#474E54' : '#181A1C'
                }}
              >
                Signature Sound
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">Attach Model</p>
              <button 
                className="rounded-2xl flex items-center justify-center hover:bg-gray-700 transition-all duration-200 group mx-auto"
                style={{ 
                  backgroundColor: '#181A1C',
                  width: '93.53px',
                  height: '93.53px'
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: '#333537',
                    width: '24.64px',
                    height: '24.64px'
                  }}
                >
                  <Plus className="w-24.64 h-24.64 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>
            <div>
              <p className="font-inter text-[10px] font-[400] leading-[1] tracking-[0.05em] text-center text-gray-400 mb-4">Select the output</p>
              <div className="flex justify-center gap-2">
                {(['song', 'instrumental', 'singing'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedOutput(type)}
                    className={`font-inter text-[10px] font-[400] leading-[1.4] tracking-[0] text-center align-middle rounded-full transition-all duration-200 flex items-center justify-center ${
                      selectedOutput === type
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    style={{ 
                      width: '91px',
                      height: '30px', 
                      borderRadius: '32px',
                      backgroundColor: selectedOutput === type ? '#474E54' : '#181A1C'
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-center">
                <div className="flex" style={{ width: '304px', gap: '4px' }}>
                  <button 
                    onClick={() => setInputMode('describe')}
                    className={`font-inter text-[13px] font-[500] leading-[1.4] tracking-[0] text-center align-middle rounded-full transition-all duration-200 whitespace-nowrap flex items-center justify-center ${
                      inputMode === 'describe'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    style={{ 
                      width: '150.04px',
                      height: '40.39px', 
                      borderRadius: '32px',
                      backgroundColor: inputMode === 'describe' ? '#474E54' : '#181A1C'
                    }}
                  >
                    Describe your song
                  </button>
                  <button 
                    onClick={() => setInputMode('lyrics')}
                    className={`font-inter text-[13px] font-[500] leading-[1.4] tracking-[0] text-center align-middle rounded-full transition-all duration-200 flex items-center justify-center ${
                      inputMode === 'lyrics'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    style={{ 
                      width: '150.04px',
                      height: '40.39px', 
                      borderRadius: '32px',
                      backgroundColor: inputMode === 'lyrics' ? '#474E54' : '#181A1C'
                    }}
                  >
                    Lyrics
                  </button>
                </div>
              </div>
              
              <div className="relative mt-4 flex justify-center">
                <div className="relative">
                  <textarea
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value.slice(0, maxLyricsLength))}
                    placeholder={inputMode === 'describe' ? 'Describe your song style, mood, or genre...' : 'Enter your own lyrics'}
                    className="rounded-2xl p-4 text-white placeholder-gray-500 resize-y focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200 text-sm"
                    style={{ 
                      backgroundColor: '#1B1B1B',
                      width: '304px',
                      height: '265px',
                      paddingBottom: '32px' // Add extra padding at bottom for character counter
                    }}
                    maxLength={maxLyricsLength}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500 pointer-events-none">
                    {lyrics.length}/{maxLyricsLength}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <div className="flex" style={{ width: '304px', justifyContent: 'flex-start', gap: '12px' }}>
                  <button 
                    className="hover:bg-gray-700 text-gray-400 hover:text-white rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center" 
                    style={{ 
                      width: '112.66px',
                      height: '24.95px', 
                      borderRadius: '32px',
                      backgroundColor: '#181A1C'
                    }}
                  >
                    Help me write
                  </button>
                  <button 
                    onClick={handleClearLyrics}
                    className="hover:bg-gray-700 text-gray-400 hover:text-white rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center"
                    style={{ 
                      width: '72.84px',
                      height: '24.95px', 
                      borderRadius: '32px',
                      backgroundColor: '#181A1C'
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="p-6 flex justify-center">
          <button 
            className="font-inter text-[20px] font-[700] leading-[22px] tracking-[0] text-center align-middle py-4 text-white rounded-full hover:opacity-90 hover:shadow-lg glow-on-hover flex items-center justify-center"
            style={{
              background: 'linear-gradient(45deg, #9730EF 0%, #5937EE 50%, #7456EC 100%)',
              borderRadius: '50px',
              width: '313px',
              height: '59px',
              transition: 'all 300ms ease-out'
            }}
            onClick={() => {
              console.log('Create button clicked - Navigate to: None');
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DNAPanel;