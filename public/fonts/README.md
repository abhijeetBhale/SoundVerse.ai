# Fonts Directory

This directory contains custom fonts for the SoundVerse.ai application.

## Font Files
Place your custom font files (.woff, .woff2, .ttf, .otf) in this directory.

## Current Fonts
- PowerGrotesk fonts should be placed here for the COLDPLAY text styling
- Any additional custom fonts can be added to this directory

## Usage
Fonts placed in this directory can be referenced in CSS using relative paths like:
```css
@font-face {
  font-family: 'PowerGrotesk';
  src: url('/fonts/PowerGrotesk-Variable.woff2') format('woff2');
}
```

## Font Loading
The fonts are loaded through the CSS file in `app/globals.css` and configured in the Tailwind config.