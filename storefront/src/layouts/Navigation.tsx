import React from 'react';
import { LogoAexol } from '@/src/assets';
import { ContentContainer } from '@/src/components/atoms';
import { UserMenu } from '@/src/components/molecules/UserMenu';

import { Stack } from '@/src/components/atoms/Stack';
import styled from '@emotion/styled';
import { Link } from '@/src/components/atoms/Link';
import { useCart } from '@/src/state/cart';

// import { Cart } from '@/src/layouts/Cart';
// import { LanguageSwitcher } from '@/src/components';

import { CartDrawer } from '@/src/layouts/CartDrawer';
import { CollectionTileType, NavigationType } from '@/src/graphql/selectors';
import { RootNode } from '@/src/util/arrayToTree';
import { DesktopNavigation } from '@/src/components/organisms/DesktopNavigation';
import { CategoryBar } from './CategoryBar';

interface NavigationProps {
    navigation: RootNode<NavigationType> | null;
    categories: CollectionTileType[];
    changeModal?: {
        modal: boolean;
        channel: string;
        locale: string;
        country_name: string;
    };
}

export const Navigation: React.FC<NavigationProps> = ({ navigation, categories, changeModal }) => {
    const { isLogged, cart } = useCart();
    const [scrolled, setScrolled] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
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
            <nav 
                className={`fixed w-full z-50 top-0 transition-all duration-300 ${
                    scrolled || menuOpen
                        ? 'bg-awadh-maroon shadow-lg py-2' 
                        : 'bg-transparent py-6'
                }`}
            >
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex justify-between items-center">
                        {/* Logo Section */}
                        <div className="flex items-center">
                            <Link ariaLabel={'Home'} href={'/'}>
                                <div className="text-awadh-ivory hover:text-awadh-gold transition-colors">
                                    <LogoAexol width={scrolled ? 50 : 60} />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Nav Links */}
                        <DesktopNavigation navigation={navigation} />

                        {/* Right Actions: User, Cart, Mobile Toggle */}
                        <Stack gap="1.5rem" itemsCenter className="text-awadh-ivory">
                            <div className="hidden md:flex items-center gap-6">
                                <UserMenu isLogged={isLogged} />
                                <CartDrawer activeOrder={cart} />
                            </div>
                            
                            {/* Mobile Toggle & Cart (Mobile) */}
                            <div className="md:hidden flex items-center gap-4">
                                <CartDrawer activeOrder={cart} />
                                <button onClick={toggleMenu} className="text-awadh-ivory text-5xl focus:outline-none">
                                    <i className={`fa-solid ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                                </button>
                            </div>
                        </Stack>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-awadh-maroon z-40 transform transition-transform duration-300 flex flex-col items-center justify-center gap-8 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <a href="#story" className="text-awadh-ivory text-4xl font-serif tracking-wide hover:text-awadh-gold transition-colors" onClick={toggleMenu}>OUR STORY</a>
                <a href="#menu" className="text-awadh-ivory text-4xl font-serif tracking-wide hover:text-awadh-gold transition-colors" onClick={toggleMenu}>MENU</a>
                <a href="#experience" className="text-awadh-ivory text-4xl font-serif tracking-wide hover:text-awadh-gold transition-colors" onClick={toggleMenu}>EXPERIENCE</a>
                
                <div className="mt-8 border-t border-awadh-ivory/20 pt-8 w-48 flex justify-center">
                    <UserMenu isLogged={isLogged} />
                </div>
            </div>

            {/* Placeholder for potential category bar if needed, currently hidden or styled differently */}
            {/* {categories?.length > 0 ? <CategoryBar collections={categories} /> : null} */}
        </>
    );
};
