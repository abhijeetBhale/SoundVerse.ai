export interface StyleCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  tags: string[];
  category: 'core' | 'signature';
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTrack: StyleCard | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

export interface PanelState {
  isDnaOpen: boolean;
  isMainContentOpen: boolean;
  activeNavItem: 'create' | 'home' | 'search' | 'library' | 'dna';
}