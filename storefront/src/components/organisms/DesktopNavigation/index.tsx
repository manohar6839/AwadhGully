import React from 'react';
import { RootNode } from '@/src/util/arrayToTree';
import { NavigationType } from '@/src/graphql/selectors';
import { useTranslation } from 'next-i18next';
import { useCart } from '@/src/state/cart';
import { Link } from '@/src/components/atoms';

interface NavProps {
    navigation: RootNode<NavigationType> | null;
}

export const DesktopNavigation: React.FC<NavProps> = ({ navigation }) => {
    const { t } = useTranslation('common');
    
    return (
        <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center gap-8">
                <a href="#story" className="text-awadh-ivory/90 hover:text-awadh-gold text-2xl font-bold uppercase tracking-[0.15em] transition-colors">
                    Our Story
                </a>
                <a href="#menu" className="text-awadh-ivory/90 hover:text-awadh-gold text-2xl font-bold uppercase tracking-[0.15em] transition-colors">
                    Menu
                </a>
                <a href="#experience" className="text-awadh-ivory/90 hover:text-awadh-gold text-2xl font-bold uppercase tracking-[0.15em] transition-colors">
                    Experience
                </a>
            </nav>
        </div>
    );
};
