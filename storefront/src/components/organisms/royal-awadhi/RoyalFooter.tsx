import React from 'react';

export const RoyalFooter: React.FC = () => {
    return (
        <footer className="bg-awadh-maroon text-awadh-ivory pt-20 pb-10 border-t border-awadh-gold/20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="text-awadh-gold text-xl">
                                <i className="fa-solid fa-archway"></i>
                            </div>
                            <span className="font-serif text-xl font-bold tracking-wide">AWADH GULLY</span>
                        </div>
                        <p className="text-awadh-ivory/60 text-sm leading-relaxed">
                            Royal Awadhi flavors, curated for the modern connoisseur. Bringing the legacy of Lucknow to your table.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-awadh-gold text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-awadh-ivory/80">
                            <li><a href="#story" className="hover:text-awadh-gold transition-colors">Our Story</a></li>
                            <li><a href="#menu" className="hover:text-awadh-gold transition-colors">Signature Menu</a></li>
                            <li><a href="#experience" className="hover:text-awadh-gold transition-colors">Locations</a></li>
                            <li><a href="#" className="hover:text-awadh-gold transition-colors">Franchise Inquiry</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-awadh-gold text-sm font-bold uppercase tracking-widest mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-awadh-ivory/80">
                            <li><i className="fa-regular fa-envelope mr-2"></i> hello@awadhgully.com</li>
                            <li><i className="fa-solid fa-phone mr-2"></i> +91 98765 43210</li>
                            <li><i className="fa-solid fa-location-dot mr-2"></i> Greater Kailash I, New Delhi</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-awadh-gold text-sm font-bold uppercase tracking-widest mb-6">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border border-awadh-ivory/30 rounded-full flex items-center justify-center hover:bg-awadh-gold hover:border-awadh-gold hover:text-awadh-maroon transition-all">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 border border-awadh-ivory/30 rounded-full flex items-center justify-center hover:bg-awadh-gold hover:border-awadh-gold hover:text-awadh-maroon transition-all">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 border border-awadh-ivory/30 rounded-full flex items-center justify-center hover:bg-awadh-gold hover:border-awadh-gold hover:text-awadh-maroon transition-all">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-awadh-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-awadh-ivory/40">
                    <p>&copy; 2024 Awadh Gully Foods Pvt. Ltd. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-awadh-ivory transition-colors">Privacy Policy</a>
                        <a href="#" class="hover:text-awadh-ivory transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
