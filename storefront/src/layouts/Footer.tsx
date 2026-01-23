import React from 'react';
import { useTranslation } from 'next-i18next';
import { LogoAexol } from '@/src/assets';
import { Link, NotifyFooterForm } from '@/src/components/atoms';
import { Socials } from '@/src/components/atoms/Socials';
import { NavigationType } from '@/src/graphql/selectors';
import { RootNode } from '@/src/util/arrayToTree';
import { Github } from 'lucide-react';

export const Footer: React.FC<{
    navigation: RootNode<NavigationType> | null;
}> = ({ navigation }) => {
    const { t } = useTranslation('common');

    return (
        <footer className="bg-awadh-maroon text-awadh-ivory pt-16 pb-8 border-t border-awadh-gold/20 font-sans">
            <div className="container mx-auto px-6 md:px-12">
                
                {/* --- Row 1: Newsletter & Collections --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12 relative overflow-hidden">
                    {/* Newsletter */}
                    <div className="lg:w-1/2 relative z-10">
                        <h4 className="text-awadh-gold text-2xl font-bold font-serif mb-4">
                            {t('footer.notify.header')}
                        </h4>
                        <p className="text-awadh-ivory/80 mb-6 font-light max-w-md text-base">
                            {t('footer.notify.paragraph')}
                        </p>
                        <div className="max-w-md">
                            <NotifyFooterForm />
                        </div>
                    </div>

                    {/* Dynamic Collections Grid */}
                    <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 relative z-10">
                         {navigation?.children
                            .filter(c => c.slug !== 'all' && c.slug !== 'search')
                            .slice(0, 6)
                            .map(section => {
                                const href = section.parent?.slug !== '__root_collection__'
                                        ? `/collections/${section.parent?.slug}/${section.slug}`
                                        : `/collections/${section.slug}`;
                                return (
                                    <Link key={section.name} href={href} className="text-awadh-ivory/80 hover:text-awadh-gold text-sm font-medium transition-colors">
                                        {section.name}
                                    </Link>
                                );
                            })}
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-awadh-gold to-transparent opacity-60 mb-16 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-awadh-gold rotate-45 transform shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                </div>


                {/* --- Row 2: 4 Columns Info --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    
                    {/* Column 1: Logo + Tagline (Stacked) */}
                    <div className="md:col-span-1">
                        <div className="flex flex-col items-start gap-4">
                            <div className="w-24 shrink-0 text-awadh-ivory">
                                <LogoAexol width={80} />
                            </div>
                            <p className="text-awadh-ivory/90 text-lg font-serif italic py-1 leading-snug">
                                Royal Awadhi flavors,<br/>curated for the modern connoisseur.
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Explore */}
                    <div>
                        <h4 className="text-awadh-gold text-lg font-bold uppercase tracking-[0.2em] mb-6 font-sans">Explore</h4>
                        <ul className="space-y-4 text-lg text-awadh-ivory/80 font-light tracking-wide">
                            <li><Link href="/story" className="hover:text-awadh-gold transition-colors block py-0.5">Our Story</Link></li>
                            <li><Link href="/menu" className="hover:text-awadh-gold transition-colors block py-0.5">Signature Menu</Link></li>
                            <li><Link href="/locations" className="hover:text-awadh-gold transition-colors block py-0.5">Locations</Link></li>
                            <li><Link href="/franchise" className="hover:text-awadh-gold transition-colors block py-0.5">Franchise Inquiry</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="text-awadh-gold text-lg font-bold uppercase tracking-[0.2em] mb-6 font-sans">Contact</h4>
                        <ul className="space-y-4 text-lg text-awadh-ivory/80 font-light tracking-wide">
                            <li className="flex items-center gap-3"><i className="fa-regular fa-envelope text-awadh-gold/70"></i> hello@awadhgully.com</li>
                            <li className="flex items-center gap-3"><i className="fa-solid fa-phone text-awadh-gold/70"></i> +91 98765 43210</li>
                            <li className="flex items-start gap-3"><i className="fa-solid fa-location-dot mt-1 text-awadh-gold/70"></i> Greater Kailash I, New Delhi</li>
                        </ul>
                    </div>

                    {/* Column 4: Socials */}
                    <div className="flex flex-col">
                        <h4 className="text-awadh-gold text-lg font-bold uppercase tracking-[0.2em] mb-6 font-sans text-center md:text-center w-full">Follow Us</h4>
                        <div className="transform origin-right scale-90 flex justify-end">
                             <Socials />
                        </div>
                    </div>
                </div>

                {/* --- Bottom Bar: Copyright & Credit --- */}
                <div className="border-t border-awadh-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-awadh-ivory/60 gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                        <p>&copy; {new Date().getFullYear()} <strong className="font-semibold text-awadh-ivory/80">Awadh Gully Foods Pvt. Ltd.</strong> All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link href="/privacy" className="hover:text-awadh-ivory transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-awadh-ivory transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Made with Love Credit */}
                    <div className="flex items-center gap-2 text-sm hover:text-awadh-gold transition-colors group cursor-pointer justify-end">
                        <span>Made with</span>
                        <span className="text-red-500 animate-pulse">❤️</span>
                        <span>by</span>
                        <a href="https://github.com/manohar6839" target="_blank" rel="noopener noreferrer" className="flex items-center group-hover:underline">
                            <Github size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

