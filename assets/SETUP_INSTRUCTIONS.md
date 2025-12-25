# Logo and Favicon Setup Instructions

## Step 1: Add Your Logo Image

1. Place your logo image file in `assets/images/` directory
2. Name it `logo.png` (or `logo.svg` for better scalability)
3. Recommended specifications:
   - **Format**: PNG with transparency or SVG
   - **Size**: Minimum 400x400px (for high-quality favicon generation)
   - **Background**: Transparent
   - **File size**: Optimize to under 100KB for web

## Step 2: Generate Favicons

You have several options to generate all required favicon sizes:

### Option A: Using RealFaviconGenerator (Recommended)
1. Go to https://realfavicongenerator.net/
2. Upload your `logo.png` file
3. Configure settings:
   - iOS: Use your logo
   - Android Chrome: Use your logo
   - Windows Metro: Use your logo
   - Favicon for Desktop: Use your logo
4. Generate and download the favicon package
5. Extract all files to `assets/icons/` directory
6. Make sure these files are included:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`
   - `site.webmanifest` (already created, but you can update it)

### Option B: Using Favicon.io
1. Go to https://favicon.io/
2. Upload your logo image
3. Download the generated package
4. Extract files to `assets/icons/` directory

### Option C: Manual Creation (Using Image Editor)
Create the following sizes from your logo:
- `favicon.ico` - Multi-size ICO (16x16, 32x32, 48x48)
- `favicon-16x16.png` - 16x16px
- `favicon-32x32.png` - 32x32px
- `apple-touch-icon.png` - 180x180px
- `android-chrome-192x192.png` - 192x192px
- `android-chrome-512x512.png` - 512x512px

## Step 3: Optimize Images

Before uploading, optimize your images:

1. **PNG Optimization**: Use TinyPNG (https://tinypng.com/) or ImageOptim
2. **SVG Optimization**: Use SVGOMG (https://jakearchibald.github.io/svgomg/)
3. **ICO Creation**: Use online tools like https://convertio.co/png-ico/ or https://www.icoconverter.com/

## Step 4: Verify

After adding all files, verify:
- Logo appears in navigation (top left)
- Logo appears in footer
- Favicon appears in browser tab
- Test on mobile devices to see app icons

## File Structure After Setup

```
assets/
├── images/
│   └── logo.png (or logo.svg)
└── icons/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    └── site.webmanifest
```

## Notes

- The HTML is already configured to use these paths
- If logo fails to load, the site will fall back to the archway icon
- All paths use absolute paths starting with `/` for GitHub Pages compatibility
- Make sure to test on different devices and browsers

