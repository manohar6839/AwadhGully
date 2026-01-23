import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const AwadhHero: React.FC = () => {
    return (
        <section className="relative h-screen w-full flex items-center bg-black overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full z-10 opacity-60 pointer-events-none">
                <Image 
                    src="/hero-background.png" 
                    alt="Awadh Gully cuisine" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#180507] via-[#180507cc] to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-8">
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-awadh-ivory mb-6 leading-tight max-w-4xl">
                    Royal Awadhi Flavors,<br />
                    Modernly Served.
                </h1>
                <p className="font-sans text-lg text-awadh-ivory/90 mb-12 max-w-xl tracking-wide">
                    A culinary journey back to the royal kitchens of the Nawabs, reimagined for the pace of the modern urban gourmand.
                </p>
                <div className="flex gap-6">
                    <Link href="#menu" className="bg-awadh-maroon text-awadh-ivory px-10 py-4 font-sans font-medium uppercase tracking-widest border border-transparent transition-all hover:bg-[#7A1F2E] hover:border-awadh-gold hover:text-white hover:shadow-[0_0_20px_rgba(90,15,27,0.5)]">
                        Order Now
                    </Link>
                    <Link href="#story" className="bg-transparent text-awadh-ivory px-10 py-4 font-sans font-medium uppercase tracking-widest border border-awadh-ivory transition-all hover:bg-awadh-ivory/10 hover:text-white">
                        View Our Story
                    </Link>
                </div>
            </div>
            
            {/* Scroll Indicator (Added from Royal Design) */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-awadh-ivory animate-bounce text-opacity-70 z-20">
                <span className="text-xs tracking-widest uppercase mb-2 block text-center">Scroll</span>
                <i className="fa-solid fa-chevron-down text-xl"></i>
            </div>
        </section>
    );
};

