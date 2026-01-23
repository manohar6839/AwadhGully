import React from 'react';

export const RoyalMenuShowcase: React.FC = () => {
    return (
        <section id="menu" className="py-24 bg-[#F2EDE6]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
                    <div>
                        <span className="text-awadh-gold text-xs font-bold tracking-[0.3em] uppercase">The Menu</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-awadh-charcoal mt-3">Signature Creations</h2>
                    </div>
                    <a href="#order" className="hidden md:inline-block text-awadh-maroon hover:text-awadh-gold transition-colors pb-1 border-b border-awadh-maroon/30 hover:border-awadh-gold text-sm tracking-widest uppercase mt-6 md:mt-0">
                        View Full Menu
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group cursor-pointer reveal transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-80 overflow-hidden w-full bg-gray-900">
                            <img src="https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=1227&auto=format&fit=crop" 
                                 alt="Galouti Kebab" 
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-awadh-ivory font-serif text-2xl mb-1">Royal Galouti Kebab</h3>
                                <p className="text-awadh-gold text-xs uppercase tracking-wider">Melt-in-mouth texture</p>
                            </div>
                        </div>
                        <div className="bg-awadh-ivory p-6 border-b-4 border-transparent group-hover:border-awadh-maroon shadow-sm transition-all">
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Finely minced lamb marinated with 160 secret spices, smoked with cloves, and pan-seared in ghee.
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-awadh-saffron"></span>
                                <span className="text-xs text-awadh-maroon font-medium uppercase tracking-wide">Signature</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group cursor-pointer reveal transition-all duration-500 hover:-translate-y-2 lg:mt-12">
                        <div className="relative h-80 overflow-hidden w-full bg-gray-900">
                            <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop" 
                                 alt="Awadhi Biryani" 
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-awadh-ivory font-serif text-2xl mb-1">Nawabi Dum Biryani</h3>
                                <p className="text-awadh-gold text-xs uppercase tracking-wider">Aromatic & Subtle</p>
                            </div>
                        </div>
                        <div className="bg-awadh-ivory p-6 border-b-4 border-transparent group-hover:border-awadh-maroon shadow-sm transition-all">
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Long-grain basmati and succulent meat, slow-cooked in a sealed 'handi' to trap the aroma of saffron and ittar.
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-awadh-saffron"></span>
                                <span className="text-xs text-awadh-maroon font-medium uppercase tracking-wide">Bestseller</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group cursor-pointer reveal transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-80 overflow-hidden w-full bg-gray-900">
                            <img src="https://images.unsplash.com/photo-1574926054530-540288c8e678?q=80&w=1287&auto=format&fit=crop" 
                                 alt="Shahi Tukda" 
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-awadh-ivory font-serif text-2xl mb-1">Saffron Phirni</h3>
                                <p className="text-awadh-gold text-xs uppercase tracking-wider">Sweet Conclusion</p>
                            </div>
                        </div>
                        <div className="bg-awadh-ivory p-6 border-b-4 border-transparent group-hover:border-awadh-maroon shadow-sm transition-all">
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Creamy ground rice pudding enriched with saffron, cardamom, and garnished with silver leaf and nuts.
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-awadh-saffron"></span>
                                <span className="text-xs text-awadh-maroon font-medium uppercase tracking-wide">Dessert</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center md:hidden">
                    <a href="#order" className="text-awadh-maroon border-b border-awadh-maroon pb-1 text-sm tracking-widest uppercase">View Full Menu</a>
                </div>
            </div>
        </section>
    );
};
