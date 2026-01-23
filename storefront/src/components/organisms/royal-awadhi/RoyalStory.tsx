import React from 'react';

export const RoyalStory: React.FC = () => {
    return (
        <section id="story" className="py-24 md:py-32 bg-awadh-ivory relative">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                {/* Decorative Header */}
                <div className="text-center mb-16 reveal">
                    <span className="text-awadh-maroon text-xs font-bold tracking-[0.3em] uppercase">Heritage</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-awadh-charcoal mt-3 mb-6">The Awadh Gully Story</h2>
                    <div className="w-24 h-[1px] bg-awadh-gold mx-auto opacity-60"></div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Sticky Title/Quote */}
                    <div className="md:col-span-4 md:sticky md:top-32 reveal">
                        <h3 className="font-serif text-3xl text-awadh-maroon leading-tight italic">
                            "Where the slow art of Dum Pukht meets the speed of the city."
                        </h3>
                        <div className="mt-8 hidden md:block w-12 h-1 bg-awadh-maroon"></div>
                    </div>

                    {/* Right Column: Narrative */}
                    <div className="md:col-span-8 space-y-8 text-gray-700 leading-relaxed font-light text-lg reveal">
                        <p className="first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-serif first-letter:text-awadh-gold first-letter:font-bold first-letter:leading-[0.85]">
                            In the narrow, aromatic lanes of old Lucknow, food was never just sustenance; it was an art form patronage by Nawabs. The <span className="text-awadh-maroon font-medium">Galoutis</span> were crafted to melt on the tongue, and the <span className="text-awadh-maroon font-medium">Biryanis</span> were slow-cooked overnight to capture the essence of saffron and charcoal. This was a world of patience, texture, and untold luxury.
                        </p>
                        
                        <div className="w-full h-[1px] bg-awadh-gold/30 my-6"></div>

                        <p>
                            Awadh Gully was born from a desire to bridge centuries. We asked ourselves: can this royal heritage survive the hustle of the modern metropolis? The answer lies in our philosophy of <span className="italic text-awadh-charcoal">"Premium Convenience."</span> We stripped away the heaviness of traditional dining halls but kept the weight of the culinary tradition intact.
                        </p>

                        <p>
                            Every spice blend is authentic. Every cut of meat is premium. But the experience is designed for you—whether you're ordering from our cloud kitchen for a dinner party or grabbing a box from our eco-friendly carts. This is the new heritage.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
