import { StyleCard } from '@/types';
import { styleImages, placeholderImages } from '@/assets/images';

export const styleCards: StyleCard[] = [
  {
    id: 'frank-sinatra',
    title: 'The World We Knew',
    description: 'Frank Sinatra - Classic, Smooth, Timeless',
    imageUrl: styleImages.dubstep,
    audioUrl: '/audio/Frank Sinatra - The world we knew (over and over).mp3',
    tags: ['Classic', 'Jazz', 'Smooth'],
    category: 'core'
  },
  {
    id: 'fred-again',
    title: 'Victory Lap',
    description: 'Fred again.. x Skepta x PlaqueBoyMax - Electronic, Energetic',
    imageUrl: styleImages['big-room'],
    audioUrl: '/audio/Fred again.. x Skepta x PlaqueBoyMax - Victory Lap.mp3',
    tags: ['Electronic', 'UK Garage', 'Energetic'],
    category: 'core'
  },
  {
    id: 'gorillaz',
    title: 'Dirty Harry',
    description: 'Gorillaz - Alternative, Hip-Hop, Experimental',
    imageUrl: styleImages['piano-house'],
    audioUrl: '/audio/Gorillaz - Dirty Harry (Official Video).mp3',
    tags: ['Alternative', 'Hip-Hop', 'Experimental'],
    category: 'core'
  },
  {
    id: 'jiandro',
    title: 'Confess Your Love',
    description: 'Jiandro ft. ola - R&B, Soulful, Contemporary',
    imageUrl: styleImages['progressive-house'],
    audioUrl: '/audio/Jiandro - Confess your love (Audio) ft. ola.wav.mp3',
    tags: ['R&B', 'Soul', 'Contemporary'],
    category: 'core'
  },
  {
    id: 'gulmohar',
    title: 'Atithi Bhooto Bhava',
    description: 'Gulmohar - Bollywood, Cinematic, Traditional',
    imageUrl: styleImages.edm,
    audioUrl: '/audio/Gulmohar - Atithi Bhooto Bhava  Shahid M  Jackie S, Pratik Gandhi, Sharmin  Hardik G  Prasad S.mp3',
    tags: ['Bollywood', 'Cinematic', 'Traditional'],
    category: 'core'
  },
  {
    id: 'the-weeknd',
    title: 'São Paulo',
    description: 'The Weeknd feat. Anitta - Pop, Latin, Smooth',
    imageUrl: styleImages.folktronica,
    audioUrl: '/audio/The Weeknd - São Paulo feat. Anitta (Official Audio).mp3',
    tags: ['Pop', 'Latin', 'Smooth'],
    category: 'signature'
  }
];

// Export placeholder images for fallback use in components
export { placeholderImages };