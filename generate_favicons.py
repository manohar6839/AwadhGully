#!/usr/bin/env python3
"""
Generate favicon files from SVG logo using rsvg-convert
"""

import os
import subprocess
import sys

def generate_png_from_svg(svg_path, png_path, size):
    """Convert SVG to PNG at specified size using rsvg-convert"""
    try:
        subprocess.run(
            ["rsvg-convert", "-w", str(size), "-h", str(size), "-o", png_path, svg_path],
            check=True,
            capture_output=True
        )
        print(f"✓ Generated {os.path.basename(png_path)} ({size}x{size})")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Error generating {png_path}: {e.stderr.decode() if e.stderr else str(e)}")
        return False
    except FileNotFoundError:
        print("✗ rsvg-convert not found. Please install librsvg: brew install librsvg")
        return False

def main():
    # Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    svg_path = os.path.join(base_dir, "assets", "images", "logo.svg")
    icons_dir = os.path.join(base_dir, "assets", "icons")
    images_dir = os.path.join(base_dir, "assets", "images")
    
    # Create directories if they don't exist
    os.makedirs(icons_dir, exist_ok=True)
    os.makedirs(images_dir, exist_ok=True)
    
    if not os.path.exists(svg_path):
        print(f"Error: SVG file not found at {svg_path}")
        return
    
    print("Generating logo and favicon files from SVG...")
    print("-" * 50)
    
    # Generate main logo PNG (400x400 for high quality)
    logo_png = os.path.join(images_dir, "logo.png")
    if generate_png_from_svg(svg_path, logo_png, 400):
        print(f"✓ Main logo created: logo.png (400x400)")
    
    # Generate favicon sizes
    favicon_sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }
    
    for filename, size in favicon_sizes.items():
        png_path = os.path.join(icons_dir, filename)
        generate_png_from_svg(svg_path, png_path, size)
    
    # Generate favicon.ico from 32x32 PNG using sips (macOS)
    ico_path = os.path.join(icons_dir, "favicon.ico")
    ico_source = os.path.join(icons_dir, "favicon-32x32.png")
    if os.path.exists(ico_source):
        try:
            # sips can convert to ICO format
            subprocess.run(
                ["sips", "-s", "format", "ico", ico_source, "--out", ico_path],
                check=True,
                capture_output=True
            )
            print(f"✓ Generated favicon.ico")
        except Exception as e:
            print(f"Note: Could not create .ico file automatically")
            print(f"   Copy {ico_source} to favicon.ico manually or use online converter")
    
    print("-" * 50)
    print("✓ All favicon files generated successfully!")
    print(f"\nFiles created:")
    print(f"  Logo: {images_dir}/logo.png")
    print(f"  Favicons: {icons_dir}/")

if __name__ == "__main__":
    main()
