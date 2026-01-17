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
  const [hasBeenSeeked, setHasBeenSeeked] = useState(false);
  
  // Store the volume before muting
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(0.7);

  const howlRef = useRef<Howl | null>(null);
  const animationRef = useRef<number | null>(null);

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

  const updateTime = useCallback(() => {
    if (howlRef.current) {
      const currentTime = howlRef.current.seek() as number;
      const duration = howlRef.current.duration();
      
      if (typeof currentTime === 'number' && currentTime >= 0) {
        setPlaybackState(prev => ({
          ...prev,
          currentTime: currentTime,
        }));
        
        // Check if song has naturally ended (within 0.5 seconds of duration)
        if (typeof duration === 'number' && currentTime >= duration - 0.5 && playbackState.isPlaying) {
          // Song has ended naturally, advance to next track
          setPlaybackState(prev => ({
            ...prev,
            isPlaying: false,
            currentTime: 0,
          }));
          
          // Reset seek flag and advance to next track
          setHasBeenSeeked(false);
          setTimeout(() => playNext(), 100);
        }
      }
    }
  }, [playbackState.isPlaying]);

  useEffect(() => {
    const startTimeUpdates = () => {
      const updateLoop = () => {
        updateTime();
        animationRef.current = requestAnimationFrame(updateLoop);
      };
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(updateLoop);
    };

    const stopTimeUpdates = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    if (playbackState.isPlaying) {
      startTimeUpdates();
    } else {
      stopTimeUpdates();
    }

    return stopTimeUpdates;
  }, [playbackState.isPlaying, updateTime]);

  const playTrackAtIndex = useCallback((index: number, trackQueue?: StyleCard[], shouldPlay: boolean = true) => {
    const currentQueue = trackQueue || queue;
    if (index < 0 || index >= currentQueue.length) return;

    const track = currentQueue[index];
    const wasPlaying = playbackState.isPlaying;
    
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
        // This callback might be unreliable after seeking, so we handle end detection in updateTime
        console.log('Howl onend triggered');
      },
      onloaderror: (_id: any, error: any) => {
        console.warn('Audio error:', error);
        setPlaybackState(prev => ({
          ...prev,
          currentTrack: track,
          duration: 180,
          isPlaying: shouldPlay && wasPlaying,
          currentTime: 0,
        }));
        
        const simulateProgress = () => {
          setPlaybackState(prev => {
            const newTime = prev.currentTime + (1/60);
            if (!prev.isPlaying || newTime >= prev.duration) {
              // Clear the simulation interval
              if (animationRef.current) {
                clearInterval(animationRef.current as any);
                animationRef.current = null;
              }
              // Auto-play next track only if we reached the actual end
              if (newTime >= prev.duration) {
                setTimeout(() => playNext(), 100);
              }
              return { ...prev, isPlaying: false, currentTime: prev.duration };
            }
            return { ...prev, currentTime: newTime };
          });
        };
        
        if (shouldPlay && wasPlaying) {
          const simulationInterval = setInterval(simulateProgress, 16); // ~60fps
          animationRef.current = simulationInterval as any;
        }
      }
    });

    howlRef.current = sound;
    setCurrentIndex(index);
    setHasBeenSeeked(false); // Reset seek flag for new track
    
    setPlaybackState(prev => ({
      ...prev,
      currentTrack: track,
      currentTime: 0,
    }));

    setIsPlayerVisible(true);

    // Only start playing if shouldPlay is true
    if (shouldPlay) {
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
            const newTime = prev.currentTime + (1/60);
            if (!prev.isPlaying) {
              // Clear the simulation interval
              if (animationRef.current) {
                clearInterval(animationRef.current as any);
                animationRef.current = null;
              }
              return prev;
            }
            
            if (newTime >= prev.duration) {
              // Clear the simulation interval
              if (animationRef.current) {
                clearInterval(animationRef.current as any);
                animationRef.current = null;
              }
              // Auto-play next track only if we reached the actual end
              setHasBeenSeeked(false);
              setTimeout(() => playNext(), 100);
              return { ...prev, isPlaying: false, currentTime: prev.duration };
            }
            
            return { ...prev, currentTime: newTime };
          });
        };
        
        const simulationInterval = setInterval(simulateProgress, 16); // ~60fps
        animationRef.current = simulationInterval as any;
      }
    } else {
      // Set the track but don't start playing
      setPlaybackState(prev => ({
        ...prev,
        isPlaying: false,
      }));
    }
  }, [playbackState.volume, playbackState.isMuted, playbackState.isPlaying, queue, linearToLogarithmic]);

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
      const wasPlaying = playbackState.isPlaying;
      playTrackAtIndex(currentIndex + 1, undefined, wasPlaying);
    }
  }, [currentIndex, queue.length, playTrackAtIndex, playbackState.isPlaying]);

  const playPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const wasPlaying = playbackState.isPlaying;
      playTrackAtIndex(currentIndex - 1, undefined, wasPlaying);
    }
  }, [currentIndex, playTrackAtIndex, playbackState.isPlaying]);

  const togglePlayPause = useCallback(() => {
    if (howlRef.current && playbackState.currentTrack) {
      if (playbackState.isPlaying) {
        howlRef.current.pause();
      } else {
        howlRef.current.play();
      }
    } else if (playbackState.currentTrack && !howlRef.current) {
      // If we have a current track but no howl instance, recreate it
      const currentTrackIndex = queue.findIndex(track => track.id === playbackState.currentTrack?.id);
      if (currentTrackIndex !== -1) {
        playTrackAtIndex(currentTrackIndex);
      }
    } else if (playbackState.currentTrack) {
      // Fallback for simulation mode
      setPlaybackState(prev => ({
        ...prev,
        isPlaying: !prev.isPlaying,
      }));
    }
  }, [playbackState.isPlaying, playbackState.currentTrack, queue, playTrackAtIndex]);

  const seek = useCallback((time: number) => {
    const clampedTime = Math.max(0, Math.min(time, playbackState.duration));
    
    // Mark that this track has been seeked
    setHasBeenSeeked(true);
    
    if (howlRef.current) {
      howlRef.current.seek(clampedTime);
    }
    
    // Immediately update the state to prevent jumping
    setPlaybackState(prev => ({
      ...prev,
      currentTime: clampedTime,
    }));
  }, [playbackState.duration]);

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

    if (animationRef.current) {
      if (typeof animationRef.current === 'number') {
        cancelAnimationFrame(animationRef.current);
        clearInterval(animationRef.current);
      }
      animationRef.current = null;
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
      if (animationRef.current) {
        if (typeof animationRef.current === 'number') {
          // Could be either requestAnimationFrame or setInterval
          cancelAnimationFrame(animationRef.current);
          clearInterval(animationRef.current);
        }
        animationRef.current = null;
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