import React from 'react';

export const RoyalExperience: React.FC = () => {
    return (
        <section id="experience" className="py-24 bg-awadh-ivory">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-serif text-awadh-charcoal">The Modern Awadh Experience</h2>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Blending heritage recipes with futuristic delivery models.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Col 1 */}
                    <div className="text-center p-6 group reveal">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-awadh-maroon/5 flex items-center justify-center text-awadh-maroon text-2xl transition-colors group-hover:bg-awadh-maroon group-hover:text-awadh-ivory">
                            <i className="fa-solid fa-cloud"></i>
                        </div>
                        <h3 className="font-serif text-xl mb-3 text-awadh-charcoal">Cloud Kitchens</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Precision-controlled environments ensuring every Dum Biryani is cooked to the exact same royal standard, every time.
                        </p>
                    </div>

                    {/* Col 2 */}
                    <div className="text-center p-6 group reveal transition-all delay-100">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-awadh-maroon/5 flex items-center justify-center text-awadh-maroon text-2xl transition-colors group-hover:bg-awadh-maroon group-hover:text-awadh-ivory">
                            <i className="fa-solid fa-bolt"></i>
                        </div>
                        <h3 className="font-serif text-xl mb-3 text-awadh-charcoal">EV Food Carts</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Bringing Lucknow to your doorstep sustainably. Our custom electric carts maintain ideal serving temperatures.
                        </p>
                    </div>

                    {/* Col 3 */}
                    <div className="text-center p-6 group reveal transition-all delay-200">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-awadh-maroon/5 flex items-center justify-center text-awadh-maroon text-2xl transition-colors group-hover:bg-awadh-maroon group-hover:text-awadh-ivory">
                            <i className="fa-solid fa-stopwatch"></i>
                        </div>
                        <h3 className="font-serif text-xl mb-3 text-awadh-charcoal">Smart Delivery</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Integrated with top logistics to ensure the 'Dum' (steam) is broken only when you open the box.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
