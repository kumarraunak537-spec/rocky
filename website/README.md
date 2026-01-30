# Molvbriv Website

A modern, professional single-page website for Molvbriv - a digital solutions company.

## Features

- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Modern Aesthetics**: Glassmorphism, gradients, and smooth animations
- **SEO Optimized**: Meta tags, Open Graph tags, semantic HTML
- **Accessible**: WCAG compliant with keyboard navigation and reduced motion support
- **Interactive**: Smooth scroll, testimonials slider, form validation

## File Structure

```
website/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
├── favicon.svg     # Brand favicon
└── README.md       # This file
```

## Deployment

### Option 1: Direct Open
Simply open `index.html` in any modern browser.

### Option 2: Static Hosting (Netlify/Vercel)
1. Upload all files to your hosting provider
2. Set `index.html` as the entry point

### Option 3: GitHub Pages
1. Push files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the branch containing these files

### Option 4: Vercel CLI
```bash
npm i -g vercel
cd website
vercel
```

## Customization

### Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --color-primary: #6C3CE9;
    --color-secondary: #FF6B6B;
    --color-accent: #00C9B7;
}
```

### Content
Edit text directly in `index.html`. Key sections:
- Hero: Lines 82-130
- About: Lines 135-200
- Services: Lines 205-310
- Testimonials: Lines 315-390
- Contact: Lines 395-510
- Footer: Lines 515-600

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2026 Molvbriv. All rights reserved.
