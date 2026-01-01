# SoundVerse.ai - DNA Music Interface

A modern music streaming and production interface built with Next.js, React, and Tailwind CSS. Features a sophisticated dark theme, responsive design, and advanced audio playback capabilities with queue management.

## ✨ Features

### 🎵 Core Functionality
- **Global Audio Player**: Full-featured music player with queue management, volume control, and seek functionality
- **Queue System**: Add tracks to queue, skip forward/backward, auto-advance to next track
- **Volume Control**: Logarithmic volume scaling with percentage display and mute functionality
- **Real Audio Playback**: Supports MP3 files with Howler.js integration and fallback simulation
- **Responsive Design**: Optimized for all Chrome DevTools device presets (mobile to desktop)
- **Style Cards**: Interactive music style cards with play functionality and hover effects

### 🎨 Design & User Experience
- **Pure Black Theme**: Clean #000000 background with sophisticated dark UI
- **Aurora Effects**: Dynamic blur effects behind artist names (desktop only)
- **Responsive Layout**: Adapts seamlessly from 280px (Galaxy Fold) to 4K displays
- **Smooth Animations**: 60fps transitions and micro-interactions throughout
- **PowerGrotesk Typography**: Custom font implementation for headings
- **Meet DNA Landing**: Beautiful landing page with gradient buttons and fluid typography

### 🎛️ Interactive Panels
- **DNA Panel**: Collapsible side panel with Core Style/Signature Sound tabs
- **Main Content**: Artist showcase with COLDPLAY theme and style card grid
- **Sidebar Navigation**: Compact navigation with Create, Home, Search, Library, and DNA tabs
- **Queue Panel**: View and manage current playback queue with track controls

### 📱 Responsive Features
- **Mobile-First**: Optimized touch interactions and mobile layouts
- **Tablet Support**: Enhanced layouts for iPad and tablet devices
- **Desktop Experience**: Full-featured desktop interface with all effects
- **Cross-Browser**: Compatible with Chrome, Safari, Firefox, and Edge

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router and TypeScript
- **React 18**: Component-based UI with hooks and modern patterns
- **TypeScript**: Full type safety and enhanced developer experience

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Custom CSS**: Advanced animations, responsive breakpoints, and theme variables
- **PowerGrotesk Font**: Premium typography with multiple font weights
- **Lucide React**: Modern icon library with consistent styling

### Audio & Media
- **Howler.js**: Advanced audio library for web audio playback
- **MP3 Support**: Real audio file playback with error handling
- **Volume Management**: Logarithmic volume scaling for natural audio perception
- **Queue System**: Advanced playlist management with auto-advance

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Git**: Version control with structured commits

## � Getting Started

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/soundverse-ai.git
cd soundverse-ai
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📁 Project Structure

```
soundverse-ai/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── DNAPanel.tsx       # DNA panel with tabs and controls
│   ├── GlobalPlayer.tsx   # Music player with queue controls
│   ├── MainContent.tsx    # Artist showcase and style cards
│   ├── QueuePanel.tsx     # Queue management interface
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── StyleCard.tsx      # Individual style card component
├── hooks/                 # Custom React hooks
│   └── useAudio.ts        # Audio playback and queue management
├── data/                  # Static data and configuration
│   └── styles.ts          # Style cards data and audio URLs
├── assets/                # Asset management
│   └── images.ts          # Image imports and fallbacks
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared type definitions
├── public/                # Static assets
│   ├── audio/             # MP3 audio files
│   ├── assets/images/     # PNG images for style cards
│   └── fonts/             # PowerGrotesk font files
└── README.md              # Project documentation
```

## 🎵 Audio Setup

### Adding Audio Files

1. **Place MP3 files** in the `public/audio/` directory
2. **Update the data** in `data/styles.ts`:

```typescript
export const styleCards: StyleCard[] = [
  {
    id: 'your-track',
    title: 'Track Title',
    description: 'Artist - Genre Description',
    imageUrl: styleImages.yourImage,
    audioUrl: '/audio/your-track.mp3',
    tags: ['Genre', 'Style', 'Mood'],
    category: 'core' // or 'signature'
  }
];
```

### Current Audio Tracks
- Frank Sinatra - "The World We Knew"
- Fred again.. x Skepta x PlaqueBoyMax - "Victory Lap"
- Gorillaz - "Dirty Harry"
- Jiandro ft. ola - "Confess Your Love"
- The Weeknd feat. Anitta - "São Paulo"
- Gulmohar - "Atithi Bhooto Bhava"

## 🎨 Customization

### Theme Colors
Update colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'dark-bg': '#000000',
        'text-secondary': '#888888',
        'border-color': '#333333',
        // Add your custom colors
      }
    }
  }
}
```

### Responsive Breakpoints
The application supports all Chrome DevTools device presets:

- **Mobile**: 320px - 768px (1-2 columns)
- **Tablet**: 768px - 1024px (2-3 columns)
- **Desktop**: 1024px+ (3-5 columns)

### Animation Timing
Modify animations in `app/globals.css`:

```css
.animate-scale-in {
  animation: scale-in 0.6s ease-out;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

## 🎯 Key Interactions

### Keyboard Shortcuts
- **Space**: Play/pause current track
- **Escape**: Close open panels
- **Tab**: Navigate through interactive elements

### Mouse/Touch Interactions
- **Style Cards**: Click to play track and open global player
- **Volume Bar**: Drag to adjust volume with percentage display
- **Progress Bar**: Click or drag to seek to specific time
- **Queue**: View, reorder, and manage playback queue
- **Logo**: Click to return to "Meet DNA" landing page

## 🌐 Browser Support

- ✅ **Chrome** (Desktop & Mobile)
- ✅ **Safari** (Desktop & Mobile)
- ✅ **Firefox** (Desktop & Mobile)
- ✅ **Edge** (Desktop & Mobile)
- ✅ **Touch Devices** (Optimized interactions)

## 📱 Responsive Design

Tested and optimized for all Chrome DevTools device presets:
- Galaxy Fold (280px)
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- iPad Air (820px)
- Desktop (1024px+)

## 🚀 Performance Features

- **Lazy Loading**: Components and audio load on demand
- **Optimized Animations**: 60fps CSS transforms
- **Memory Management**: Proper cleanup of audio resources
- **Responsive Images**: Efficient PNG loading with fallbacks
- **Code Splitting**: Automatic Next.js code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for demonstration purposes. Please ensure you have proper licensing for any audio files used in production.

## 🔧 Troubleshooting

### Audio Not Playing
- Check that MP3 files are in `public/audio/`
- Verify file paths in `data/styles.ts`
- Check browser console for audio loading errors

### Responsive Issues
- Test in Chrome DevTools device mode
- Check CSS media queries in `app/globals.css`
- Verify Tailwind responsive classes

### Performance Issues
- Check for memory leaks in audio playback
- Optimize image sizes in `public/assets/images/`
- Monitor component re-renders in React DevTools

---

Built with ❤️ using Next.js, React, and Tailwind CSS