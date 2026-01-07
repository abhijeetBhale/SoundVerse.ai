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
    <div className="fixed left-12 top-0 h-full z-30 animate-slide-in" style={{ width: '280px' }}>
      <div className="flex flex-col h-full bg-dark-bg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <h1 className="text-lg font-bold text-white font-power-grotesk">DNA</h1>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-md hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
            aria-label="Close DNA panel"
          >
            <X className="w-3 h-3 text-text-secondary hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 pt-0 overflow-y-auto scrollbar-hide"  style={{height: '200px'}}>
          <div className="space-y-5">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setActiveTab('core')}
                className={`rounded-full text-xs font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'core'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                style={{ 
                  width: '110px',
                  height: '30px', 
                  borderRadius: '32px',
                  backgroundColor: activeTab === 'core' ? '#474E54' : '#181A1C'
                }}
              >
                Core Style
              </button>
              <button
                onClick={() => setActiveTab('signature')}
                className={`rounded-full text-xs font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'signature'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                style={{ 
                  width: '110px',
                  height: '30px', 
                  borderRadius: '32px',
                  backgroundColor: activeTab === 'signature' ? '#474E54' : '#181A1C'
                }}
              >
                Signature Sound
              </button>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-3 -mt-3">Attach Model</p>
              <button 
                className="rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-200 group mx-auto"
                style={{ 
                  backgroundColor: '#181A1C',
                  width: '70px',
                  height: '70px',
                  marginTop: '-10px'
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: '#333537',
                    width: '20px',
                    height: '20px'
                  }}
                >
                  <Plus className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>
            <div>
              <p className="font-inter text-[9px] font-[400] leading-[1] tracking-[0.05em] text-center text-gray-400 mb-3 mt-10">Select the output</p>
              <div className="flex justify-center gap-1">
                {(['song', 'instrumental', 'singing'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedOutput(type)}
                    className={`font-inter text-[9px] font-[400] leading-[1.4] tracking-[0] text-center align-middle rounded-full transition-all duration-200 flex items-center justify-center ${
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
                <div className="flex" style={{ width: '248px', gap: '3px' }}>
                  <button 
                    onClick={() => setInputMode('describe')}
                    className={`font-inter text-[10px] font-[500] leading-[1.4] tracking-[0] text-center align-middle rounded-full transition-all duration-200 whitespace-nowrap flex items-center justify-center ${
                      inputMode === 'describe'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    style={{ 
                      width: '150px',
                      height: '30px', 
                      borderRadius: '32px',
                      backgroundColor: inputMode === 'describe' ? '#474E54' : '#181A1C'
                    }}
                  >
                    Describe your song
                  </button>
                  <button 
                    onClick={() => setInputMode('lyrics')}
                    className={`font-inter text-[10px] font-[500] leading-[1.4] tracking-[0] text-center align-middle rounded-full transition-all duration-200 flex items-center justify-center ${
                      inputMode === 'lyrics'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    style={{ 
                      width: '150px',
                      height: '30px', 
                      borderRadius: '32px',
                      backgroundColor: inputMode === 'lyrics' ? '#474E54' : '#181A1C'
                    }}
                  >
                    Lyrics
                  </button>
                </div>
              </div>
              
              <div className="relative mt-3 flex justify-center">
                <div className="relative">
                  <textarea
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value.slice(0, maxLyricsLength))}
                    placeholder={inputMode === 'describe' ? 'Enter your own lyrics' : 'Enter your own lyrics'}
                    className="rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200 text-xs"
                    style={{ 
                      backgroundColor: '#1B1B1B',
                      width: '248px',
                      height: '180px',
                      paddingBottom: '28px', // Add extra padding at bottom for character counter
                      marginTop: '-3px'
                    }}
                    maxLength={maxLyricsLength}
                  />
                  <div className="absolute bottom-3 right-3 text-[9px] text-gray-500 pointer-events-none">
                    {lyrics.length}/{maxLyricsLength}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex" style={{ width: '248px', justifyContent: 'flex-start', gap: '8px' }}>
                  <button 
                    className="hover:bg-gray-700 text-gray-400 hover:text-white rounded-full text-[10px] font-medium transition-all duration-200 flex items-center justify-center" 
                    style={{ 
                      width: '85px',
                      height: '22px', 
                      borderRadius: '32px',
                      backgroundColor: '#181A1C',
                      marginTop: '-3px'
                    }}
                  >
                    Help me write
                  </button>
                  <button 
                    onClick={handleClearLyrics}
                    className="hover:bg-gray-700 text-gray-400 hover:text-white rounded-full text-[10px] font-medium transition-all duration-200 flex items-center justify-center"
                    style={{ 
                      width: '55px',
                      height: '22px', 
                      borderRadius: '32px',
                      backgroundColor: '#181A1C', 
                      marginTop: '-3px'
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="p-4 pt-2 flex justify-center">
          <button 
            className="font-inter text-[14px] font-[700] leading-[16px] tracking-[0] text-center align-middle py-3 text-white rounded-full hover:opacity-90 hover:shadow-lg glow-on-hover flex items-center justify-center"
            style={{
              background: 'linear-gradient(45deg, #9730EF 0%, #5937EE 50%, #7456EC 100%)',
              borderRadius: '50px',
              width: '248px',
              // height: '42px',
              transition: 'all 300ms ease-out',
              // marginTop: '70px'
              marginBottom: '-5px'
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