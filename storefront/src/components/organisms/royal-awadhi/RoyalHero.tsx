import React from 'react';

export const RoyalHero: React.FC = () => {
    return (
        <header className="relative w-full h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat bg-fixed flex items-center">
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20">
                <div className="max-w-3xl reveal active animate-fade-in-up">
                    <p className="text-awadh-gold tracking-[0.2em] uppercase text-sm md:text-base mb-4 font-medium">Est. Lucknow • Served Modern</p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-awadh-ivory font-bold leading-tight mb-6">
                        Royal Awadhi Flavors, <br />
                        <span className="italic font-light">Modernly Served.</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-light max-w-lg mb-10 leading-relaxed">
                        A culinary journey back to the royal kitchens of the Nawabs, reimagined for the pace of the modern urban gourmand.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-5">
                        <a href="#order" className="group relative px-8 py-4 bg-awadh-maroon text-awadh-ivory overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(90,15,27,0.5)]">
                            <span className="relative z-10 flex items-center gap-3 font-medium tracking-wide">
                                Order Now <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                            </span>
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </a>
                        
                        <a href="#story" className="px-8 py-4 border border-awadh-ivory text-awadh-ivory hover:bg-awadh-ivory hover:text-awadh-maroon transition-all duration-300 font-medium tracking-wide text-center">
                            View Our Story
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-awadh-ivory animate-bounce text-opacity-70">
                <span className="text-xs tracking-widest uppercase mb-2 block text-center">Scroll</span>
                <i className="fa-solid fa-chevron-down text-xl"></i>
            </div>
        </header>
    );
};
