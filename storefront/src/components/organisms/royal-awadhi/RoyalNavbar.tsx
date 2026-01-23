import React, { useState, useEffect } from 'react';

export const RoyalNavbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
             setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = !menuOpen ? 'hidden' : 'auto';
    };

    return (
        <>
            <nav id="navbar" className={`fixed w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 flex justify-between items-center ${scrolled ? 'bg-awadh-maroon/95 shadow-lg backdrop-blur-sm py-2' : 'bg-transparent'}`}>
                <div className="flex items-center gap-2">
                    {/* Logo Icon (Abstract Gateway/Arch) */}
                    <div className="text-awadh-ivory text-2xl">
                        <i className="fa-solid fa-archway"></i>
                    </div>
                    <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-awadh-ivory">AWADH GULLY</span>
                </div>
                
                <div className="hidden md:flex gap-8 items-center">
                    <a href="#story" className="text-awadh-ivory/90 hover:text-awadh-gold text-sm tracking-widest uppercase transition-colors">Our Story</a>
                    <a href="#menu" className="text-awadh-ivory/90 hover:text-awadh-gold text-sm tracking-widest uppercase transition-colors">Menu</a>
                    <a href="#experience" className="text-awadh-ivory/90 hover:text-awadh-gold text-sm tracking-widest uppercase transition-colors">Experience</a>
                    <a href="#order" className="border border-awadh-gold text-awadh-gold px-5 py-2 text-sm hover:bg-awadh-gold hover:text-awadh-maroon transition-all duration-300">Order Now</a>
                </div>

                {/* Mobile Menu Button */}
                <button id="mobile-menu-btn" className="md:hidden text-awadh-ivory text-2xl" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div id="mobile-menu" className={`fixed inset-0 bg-awadh-maroon z-40 transform transition-transform duration-300 flex flex-col items-center justify-center gap-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button id="close-menu-btn" className="absolute top-6 right-6 text-awadh-ivory text-3xl" onClick={toggleMenu}>
                    <i className="fa-solid fa-times"></i>
                </button>
                <a href="#story" className="mobile-link text-awadh-ivory text-2xl font-serif" onClick={toggleMenu}>Our Story</a>
                <a href="#menu" className="mobile-link text-awadh-ivory text-2xl font-serif" onClick={toggleMenu}>Menu</a>
                <a href="#experience" className="mobile-link text-awadh-ivory text-2xl font-serif" onClick={toggleMenu}>Experience</a>
                <a href="#order" className="mobile-link text-awadh-gold text-2xl font-serif border-b border-awadh-gold pb-1" onClick={toggleMenu}>Order Now</a>
            </div>
        </>
    );
};
