import React from 'react';

export const RoyalOrder: React.FC = () => {
    return (
        <section id="order" className="py-24 bg-awadh-charcoal relative overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-awadh-maroon rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-awadh-gold rounded-full blur-[100px] opacity-10"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-awadh-ivory mb-6 reveal">Indulge Now</h2>
                <p className="text-gray-400 mb-12 max-w-xl mx-auto font-light reveal">
                    Your royal feast is just a click away. Available across major delivery platforms in your city.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6 reveal">
                    {/* Swiggy Button */}
                    <a href="#" className="group bg-[#FC8019] hover:bg-[#e06d0e] text-white px-8 py-4 rounded-sm flex items-center justify-center gap-4 transition-all duration-300 w-full md:w-auto min-w-[240px]">
                        <span className="text-2xl"><i className="fa-solid fa-utensils"></i></span>
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-widest opacity-90">Order on</p>
                            <p className="font-bold text-xl leading-none">Swiggy</p>
                        </div>
                    </a>

                    {/* Zomato Button */}
                    <a href="#" className="group bg-[#CB202D] hover:bg-[#b01b27] text-white px-8 py-4 rounded-sm flex items-center justify-center gap-4 transition-all duration-300 w-full md:w-auto min-w-[240px]">
                        <span className="text-2xl italic font-serif font-black">Z</span>
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-widest opacity-90">Order on</p>
                            <p className="font-bold text-xl leading-none">Zomato</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};
