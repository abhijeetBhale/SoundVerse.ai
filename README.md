# SoundVerse.ai - DNA Music Interface

A modern music streaming and production interface built with Next.js, React, and Tailwind CSS. Features a sophisticated dark theme, comprehensive keyboard shortcuts, responsive design, and advanced audio playback capabilities with intelligent queue management.

## ✨ Features

### 🎵 Core Audio Functionality
- **Global Audio Player**: Full-featured music player with queue management, volume control, and seek functionality
- **Intelligent Queue System**: Add tracks to queue, skip forward/backward, auto-advance to next track with state preservation
- **Advanced Volume Control**: Logarithmic volume scaling with percentage display, mute functionality, and volume restoration
- **Real Audio Playback**: Supports MP3 files with Howler.js integration and graceful fallback simulation
- **State Consistency**: Track navigation preserves play/pause state - no unexpected track jumping
- **Audio Memory Management**: Proper cleanup and resource management for optimal performance

### ⌨️ Keyboard Shortcuts System
- **Comprehensive Shortcuts**: 8 different keyboard shortcuts for complete hands-free control
- **Smart Input Detection**: Automatically disables shortcuts when typing in input fields
- **Visual Help System**: Floating keyboard button with professional modal showing all shortcuts
- **Shortcuts Available**:
  - `Space` - Play/pause current track
  - `← →` - Previous/next track (preserves play state)
  - `↑ ↓` - Volume up/down (10% increments)
  - `M` - Mute/unmute with volume restoration
  - `Q` - Toggle queue panel
  - `Esc` - Close open panels

### 🎨 Design & User Experience
- **Pure Black Theme**: Clean #000000 background with sophisticated dark UI components
- **Aurora Effects**: Dynamic blur effects behind artist names using color #1B1330 (desktop only)
- **DNA Panel Toggle**: Click DNA button to open/close with smooth animations and proper state management
- **18px Border Radius**: Consistent rounded corners throughout the interface
- **Smooth Animations**: 60fps transitions and micro-interactions with proper z-indexing
- **PowerGrotesk Typography**: Custom font implementation for "MEET DNA" and "COLDPLAY" headings
- **Responsive Layout**: Fluid design adapting from 280px (Galaxy Fold) to 4K displays

### 🎛️ Interactive Panels & Navigation
- **DNA Panel**: Collapsible side panel with Core Style/Signature Sound tabs and toggle functionality
- **Main Content**: Artist showcase with COLDPLAY theme, aurora effects, and responsive style card grid
- **Sidebar Navigation**: Compact navigation with Create, Home, Search, Library, and DNA tabs
- **Queue Panel**: View and manage current playback queue with track controls and removal options
- **Global Player**: Persistent music player with drag controls and visual feedback

### 📱 Comprehensive Responsive Design
- **Mobile-First Approach**: Optimized touch interactions and mobile-specific layouts
- **7 Breakpoint System**: Covers all Chrome DevTools device presets seamlessly
- **Adaptive Grid System**: 1→2→3→4→5 columns based on screen size with fluid typography
- **Touch-Optimized**: Enhanced interactions for mobile and tablet devices
- **Cross-Browser Compatibility**: Tested on Chrome, Safari, Firefox, and Edge

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router and TypeScript for optimal performance
- **React 18**: Component-based UI with hooks, modern patterns, and state management
- **TypeScript**: Full type safety and enhanced developer experience with strict typing

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with custom configuration and responsive utilities
- **Custom CSS**: Advanced animations, responsive breakpoints, and theme variables
- **PowerGrotesk Font**: Premium typography with multiple font weights and proper loading
- **Lucide React**: Modern icon library with consistent styling and accessibility

### Audio & Media
- **Howler.js**: Advanced audio library for web audio playback with cross-browser support
- **MP3 Support**: Real audio file playback with comprehensive error handling and fallbacks
- **Logarithmic Volume**: Natural audio perception with exponential volume curve (volume²)
- **Queue Management**: Advanced playlist system with auto-advance and state preservation

### Development Tools
- **ESLint**: Code linting and quality assurance with TypeScript integration
- **PostCSS**: CSS processing and optimization for production builds
- **Git**: Version control with structured commits and deployment automation

## 🚀 Getting Started

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
│   ├── globals.css        # Global styles, animations, and responsive utilities
│   ├── layout.tsx         # Root layout component with font loading
│   └── page.tsx           # Main application with keyboard shortcuts
├── components/            # React components
│   ├── DNAPanel.tsx       # DNA panel with tabs and toggle functionality
│   ├── GlobalPlayer.tsx   # Music player with drag controls and volume percentage
│   ├── KeyboardShortcuts.tsx # Keyboard shortcuts help system
│   ├── MainContent.tsx    # Artist showcase with aurora effects and 18px borders
│   ├── QueuePanel.tsx     # Queue management interface
│   ├── Sidebar.tsx        # Navigation sidebar with responsive design
│   └── StyleCard.tsx      # Individual style card component
├── hooks/                 # Custom React hooks
│   └── useAudio.ts        # Audio playback with logarithmic volume and state consistency
├── data/                  # Static data and configuration
│   └── styles.ts          # Style cards data with real audio URLs
├── assets/                # Asset management
│   └── images.ts          # Image imports and PNG fallbacks
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared type definitions and interfaces
├── public/                # Static assets
│   ├── audio/             # MP3 audio files (6 tracks)
│   ├── assets/images/     # PNG images for style cards
│   └── fonts/             # PowerGrotesk font files
└── README.md              # Comprehensive project documentation
```

## ⌨️ Keyboard Shortcuts

The application includes a comprehensive keyboard shortcuts system for hands-free control:

### Available Shortcuts
| Key | Action | Description |
|-----|--------|-------------|
| `Space` | Play/Pause | Toggle playback of current track |
| `←` | Previous | Go to previous track (preserves play state) |
| `→` | Next | Go to next track (preserves play state) |
| `↑` | Volume Up | Increase volume by 10% |
| `↓` | Volume Down | Decrease volume by 10% |
| `M` | Mute/Unmute | Toggle mute with volume restoration |
| `Q` | Queue | Toggle queue panel visibility |
| `Esc` | Close | Close open panels |

### Smart Features
- **Input Field Detection**: Shortcuts automatically disable when typing in text fields
- **Visual Help**: Click the keyboard icon (bottom-left) to view all shortcuts
- **State Preservation**: Navigation shortcuts maintain current play/pause state
- **Volume Memory**: Mute function remembers and restores exact previous volume level

## 🎵 Audio System

### Current Audio Tracks
- **Frank Sinatra** - "The World We Knew (Over and Over)"
- **Fred again.. x Skepta x PlaqueBoyMax** - "Victory Lap"
- **Gorillaz** - "Dirty Harry"
- **Jiandro ft. ola** - "Confess Your Love"
- **The Weeknd feat. Anitta** - "São Paulo"
- **Gulmohar** - "Atithi Bhooto Bhava"

### Adding New Audio Files

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

### Volume System
- **Logarithmic Scaling**: Uses exponential curve (volume²) for natural audio perception
- **Percentage Display**: Shows linear percentages (5% = very quiet, 50% = moderate, 100% = full)
- **Mute Memory**: Remembers exact volume level before muting for precise restoration

## 🎨 Customization

### Theme Colors
Update colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'dark-bg': '#000000',        // Pure black background
        'text-secondary': '#888888', // Secondary text
        'border-color': '#333333',   // Border elements
        'aurora-purple': '#1B1330',  // Aurora effect color
        // Add your custom colors
      }
    }
  }
}
```

### Responsive Breakpoints
The application supports all Chrome DevTools device presets:

- **Galaxy Fold**: 280px (1 column, compact layout)
- **iPhone SE**: 375px (1-2 columns, mobile optimized)
- **iPhone 12 Pro**: 390px (2 columns, enhanced mobile)
- **iPad Air**: 820px (3 columns, tablet layout)
- **Desktop**: 1024px+ (4-5 columns, full features)

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

### Mouse/Touch Interactions
- **Style Cards**: Click to play track and open global player
- **Volume Bar**: Drag to adjust volume with real-time percentage display
- **Progress Bar**: Click or drag to seek to specific time position
- **Queue Management**: View, reorder, and remove tracks from playback queue
- **DNA Button**: Click to toggle DNA panel open/close
- **Logo**: Click to return to "Meet DNA" landing page

### Advanced Features
- **State Consistency**: Track navigation preserves current play/pause state
- **Auto-Advance**: Automatically plays next track when current song ends
- **Memory Management**: Proper cleanup of audio resources and event listeners
- **Error Handling**: Graceful fallback to simulation mode if audio fails to load

## 🌐 Browser Support & Performance

### Supported Browsers
- ✅ **Chrome** (Desktop & Mobile) - Full feature support
- ✅ **Safari** (Desktop & Mobile) - Optimized for iOS/macOS
- ✅ **Firefox** (Desktop & Mobile) - Cross-platform compatibility
- ✅ **Edge** (Desktop & Mobile) - Windows integration
- ✅ **Touch Devices** - Enhanced touch interactions

### Performance Features
- **Lazy Loading**: Components and audio load on demand
- **60fps Animations**: Hardware-accelerated CSS transforms
- **Memory Management**: Automatic cleanup of audio resources and intervals
- **Responsive Images**: Efficient PNG loading with SVG fallbacks
- **Code Splitting**: Automatic Next.js code splitting for optimal loading
- **Audio Optimization**: Logarithmic volume scaling reduces CPU usage

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Connect to Vercel:**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect Next.js configuration

2. **Environment Setup:**
   - No environment variables required for basic functionality
   - Audio files are served statically from `public/audio/`

3. **Build Configuration:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install"
   }
   ```

### Manual Deployment
```bash
# Build the application
npm run build

# The build output will be in .next/
# Deploy the .next/ folder and public/ folder to your hosting provider
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript strict mode requirements
- Use Tailwind CSS utilities over custom CSS when possible
- Maintain responsive design across all breakpoints
- Test keyboard shortcuts and audio functionality
- Ensure proper cleanup of audio resources

## 🔧 Troubleshooting

### Audio Issues
- **Audio Not Playing**: Check MP3 files are in `public/audio/` and paths in `data/styles.ts`
- **Volume Problems**: Verify logarithmic scaling is working (5% should be very quiet)
- **State Issues**: Check browser console for audio loading errors and state consistency

### Responsive Issues
- **Layout Problems**: Test in Chrome DevTools device mode with all presets
- **Touch Issues**: Verify touch interactions work on mobile devices
- **Breakpoint Issues**: Check CSS media queries in `app/globals.css`

### Keyboard Shortcuts
- **Not Working**: Check if focus is in an input field (shortcuts auto-disable)
- **Wrong Behavior**: Verify keyboard event handling in `app/page.tsx`
- **Help Modal**: Click keyboard icon in bottom-left to view all shortcuts

### Performance Issues
- **Memory Leaks**: Check audio cleanup in `useAudio.ts` hook
- **Slow Loading**: Optimize image sizes in `public/assets/images/`
- **Animation Lag**: Monitor component re-renders in React DevTools

## 📄 License

This project is for demonstration purposes. Please ensure you have proper licensing for any audio files used in production.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

*Features comprehensive keyboard shortcuts, logarithmic volume scaling, state-consistent navigation, and responsive design optimized for all devices.*