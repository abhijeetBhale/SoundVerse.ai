/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '112': '28rem', // 448px - for DNA panel width (w-96 = 384px + sidebar 64px = 448px)
        '121.75': '30.4375rem', // 487px - for DNA panel width (423px + sidebar 64px = 487px)
      },
      colors: {
        'dark-bg': '#000000',
        'panel-bg': '#000000',
        'card-bg': '#000000',
        'accent-purple': '#6366f1',
        'accent-blue': '#3b82f6',
        'accent-teal': '#14b8a6',
        'text-primary': '#ffffff',
        'text-secondary': '#888888',
        'border-color': '#333333',
        'hover-glow': '#6366f1',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'power-grotesk': ['PowerGrotesk', 'Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'player-slide-in': 'playerSlideIn 0.3s ease-out',
        'player-slide-out': 'playerSlideOut 0.3s ease-in',
        'scale-in': 'scaleIn 0.15s ease-out',
        'glow': 'glow 0.2s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'tab-slide': 'tabSlide 0.3s ease-out',
        'aurora-shift': 'auroraShift 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        playerSlideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        playerSlideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 0 rgba(99, 102, 241, 0)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' },
        },
        tabSlide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        auroraShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        waveform: {
          '0%': { height: '4px' },
          '100%': { height: '16px' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.waveform-bar': {
          animation: 'waveform 1.5s ease-in-out infinite alternate'
        }
      })
    }
  ],
}