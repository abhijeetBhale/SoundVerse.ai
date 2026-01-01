'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { StyleCard, PlaybackState } from '@/types';

export const useAudio = () => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isMuted: false,
  });

  // Separate state for player visibility
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  
  // Queue management
  const [queue, setQueue] = useState<StyleCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isQueueVisible, setIsQueueVisible] = useState(false);
  
  // Store the volume before muting
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(0.7);

  const howlRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Convert linear volume (0-1) to logarithmic volume for audio
  // This creates a more natural volume curve where:
  // - 10% UI = 1% actual volume (very quiet)
  // - 50% UI = 25% actual volume (moderate)
  // - 100% UI = 100% actual volume (full volume)
  const linearToLogarithmic = useCallback((linearVolume: number) => {
    if (linearVolume === 0) return 0;
    // Use exponential curve: volume^2 for more natural audio scaling
    // This makes lower percentages much quieter and higher percentages louder
    return Math.pow(linearVolume, 2);
  }, []);

  // Convert logarithmic volume back to linear for display
  const logarithmicToLinear = useCallback((logVolume: number) => {
    if (logVolume === 0) return 0;
    return Math.sqrt(logVolume);
  }, []);

  const updateTime = useCallback(() => {
    if (howlRef.current && playbackState.isPlaying) {
      const currentTime = howlRef.current.seek() as number;
      setPlaybackState(prev => ({
        ...prev,
        currentTime: currentTime || 0,
      }));
    }
  }, [playbackState.isPlaying]);

  useEffect(() => {
    if (playbackState.isPlaying) {
      intervalRef.current = setInterval(updateTime, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playbackState.isPlaying, updateTime]);

  const playTrackAtIndex = useCallback((index: number, trackQueue?: StyleCard[]) => {
    const currentQueue = trackQueue || queue;
    if (index < 0 || index >= currentQueue.length) return;

    const track = currentQueue[index];
    
    // Stop current track if playing
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
    }

    // Create new Howl instance with actual audio file
    const audioVolume = linearToLogarithmic(playbackState.isMuted ? 0 : playbackState.volume);
    const sound = new Howl({
      src: [track.audioUrl],
      volume: audioVolume,
      html5: true,
      onload: () => {
        setPlaybackState(prev => ({
          ...prev,
          duration: sound.duration() || 180,
        }));
      },
      onplay: () => {
        setPlaybackState(prev => ({
          ...prev,
          isPlaying: true,
        }));
      },
      onpause: () => {
        setPlaybackState(prev => ({
          ...prev,
          isPlaying: false,
        }));
      },
      onend: () => {
        setPlaybackState(prev => ({
          ...prev,
          isPlaying: false,
          currentTime: 0,
        }));
        // Auto-play next track when current ends
        playNext();
      },
      onloaderror: (_id: any, error: any) => {
        console.warn('Audio error:', error);
        setPlaybackState(prev => ({
          ...prev,
          currentTrack: track,
          duration: 180,
          isPlaying: true,
          currentTime: 0,
        }));
        
        const simulateProgress = () => {
          setPlaybackState(prev => {
            if (!prev.isPlaying || prev.currentTime >= prev.duration) {
              playNext(); // Auto-play next track
              return { ...prev, isPlaying: false, currentTime: 0 };
            }
            return { ...prev, currentTime: prev.currentTime + 0.1 };
          });
        };
        
        intervalRef.current = setInterval(simulateProgress, 100);
      }
    });

    howlRef.current = sound;
    setCurrentIndex(index);
    
    setPlaybackState(prev => ({
      ...prev,
      currentTrack: track,
      currentTime: 0,
    }));

    setIsPlayerVisible(true);

    try {
      sound.play();
    } catch (error) {
      console.warn('Audio playback error:', error);
      // Fallback to simulation mode
      setPlaybackState(prev => ({
        ...prev,
        currentTrack: track,
        duration: 180,
        isPlaying: true,
        currentTime: 0,
      }));
      
      const simulateProgress = () => {
        setPlaybackState(prev => {
          if (!prev.isPlaying || prev.currentTime >= prev.duration) {
            playNext(); // Auto-play next track
            return { ...prev, isPlaying: false, currentTime: 0 };
          }
          return { ...prev, currentTime: prev.currentTime + 0.1 };
        });
      };
      
      intervalRef.current = setInterval(simulateProgress, 100);
    }
  }, [playbackState.volume, playbackState.isMuted, queue, linearToLogarithmic]);

  const playTrack = useCallback((track: StyleCard, allTracks?: StyleCard[]) => {
    // If allTracks is provided, use it as the new queue
    if (allTracks) {
      setQueue(allTracks);
      const index = allTracks.findIndex(t => t.id === track.id);
      playTrackAtIndex(index, allTracks);
    } else {
      // Add to queue if not already present
      setQueue(prevQueue => {
        const existingIndex = prevQueue.findIndex(t => t.id === track.id);
        if (existingIndex !== -1) {
          // Track exists, play it
          playTrackAtIndex(existingIndex, prevQueue);
          return prevQueue;
        } else {
          // Add new track to queue
          const newQueue = [...prevQueue, track];
          playTrackAtIndex(newQueue.length - 1, newQueue);
          return newQueue;
        }
      });
    }
  }, [playTrackAtIndex]);

  const playNext = useCallback(() => {
    if (currentIndex < queue.length - 1) {
      playTrackAtIndex(currentIndex + 1);
    }
  }, [currentIndex, queue.length, playTrackAtIndex]);

  const playPrevious = useCallback(() => {
    if (currentIndex > 0) {
      playTrackAtIndex(currentIndex - 1);
    }
  }, [currentIndex, playTrackAtIndex]);

  const togglePlayPause = useCallback(() => {
    if (howlRef.current) {
      if (playbackState.isPlaying) {
        howlRef.current.pause();
      } else {
        howlRef.current.play();
      }
    } else if (playbackState.currentTrack) {
      setPlaybackState(prev => ({
        ...prev,
        isPlaying: !prev.isPlaying,
      }));
    }
  }, [playbackState.isPlaying, playbackState.currentTrack]);

  const seek = useCallback((time: number) => {
    if (howlRef.current) {
      howlRef.current.seek(time);
    }
    setPlaybackState(prev => ({
      ...prev,
      currentTime: time,
    }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    // Convert the linear volume (0-1) to logarithmic for actual audio playback
    const audioVolume = linearToLogarithmic(volume);
    
    // Update the actual audio volume with logarithmic scaling
    if (howlRef.current) {
      howlRef.current.volume(audioVolume);
    }
    
    // Store the linear volume for UI display (this is what the user sees as %)
    setPlaybackState(prev => ({
      ...prev,
      volume, // Store linear volume for UI
      isMuted: volume === 0,
    }));

    // If we're setting volume to something > 0, we're no longer muted
    // and should update the volumeBeforeMute for future mute operations
    if (volume > 0) {
      setVolumeBeforeMute(volume);
    }
  }, [linearToLogarithmic]);

  const toggleMute = useCallback(() => {
    if (playbackState.isMuted) {
      // Unmuting: restore the previous volume
      const volumeToRestore = volumeBeforeMute;
      const audioVolume = linearToLogarithmic(volumeToRestore);
      
      if (howlRef.current) {
        howlRef.current.volume(audioVolume);
      }
      
      setPlaybackState(prev => ({
        ...prev,
        volume: volumeToRestore,
        isMuted: false,
      }));
    } else {
      // Muting: save current volume and set to 0
      setVolumeBeforeMute(playbackState.volume);
      
      if (howlRef.current) {
        howlRef.current.volume(0);
      }
      
      setPlaybackState(prev => ({
        ...prev,
        volume: 0,
        isMuted: true,
      }));
    }
  }, [playbackState.isMuted, playbackState.volume, volumeBeforeMute, linearToLogarithmic]);

  const stopTrack = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
      howlRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setPlaybackState(prev => ({
      ...prev,
      isPlaying: false,
      currentTrack: null,
      currentTime: 0,
      duration: 0,
    }));

    setIsPlayerVisible(false);
  }, []);

  const hidePlayer = useCallback(() => {
    setIsPlayerVisible(false);
  }, []);

  const showPlayer = useCallback(() => {
    if (playbackState.currentTrack) {
      setIsPlayerVisible(true);
    }
  }, [playbackState.currentTrack]);

  const toggleQueue = useCallback(() => {
    setIsQueueVisible(prev => !prev);
  }, []);

  const hideQueue = useCallback(() => {
    setIsQueueVisible(false);
  }, []);

  const playFromQueue = useCallback((track: StyleCard) => {
    const index = queue.findIndex(t => t.id === track.id);
    if (index !== -1) {
      playTrackAtIndex(index);
    }
  }, [queue, playTrackAtIndex]);

  const removeFromQueue = useCallback((trackId: string) => {
    setQueue(prevQueue => {
      const newQueue = prevQueue.filter(track => track.id !== trackId);
      // Adjust current index if necessary
      const removedIndex = prevQueue.findIndex(track => track.id === trackId);
      if (removedIndex !== -1 && removedIndex < currentIndex) {
        setCurrentIndex(prev => prev - 1);
      } else if (removedIndex === currentIndex) {
        // If current track is removed, stop playback
        stopTrack();
      }
      return newQueue;
    });
  }, [currentIndex, stopTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
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
  };
};