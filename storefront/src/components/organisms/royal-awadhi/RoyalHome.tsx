import React from 'react';
import { RoyalNavbar } from './RoyalNavbar';
import { RoyalHero } from './RoyalHero';
import { RoyalStory } from './RoyalStory';
import { RoyalMenuShowcase } from './RoyalMenuShowcase';
import { RoyalExperience } from './RoyalExperience';
import { RoyalOrder } from './RoyalOrder';
import { RoyalFooter } from './RoyalFooter';

export const RoyalHome: React.FC = () => {
    return (
        <div className="font-sans antialiased overflow-x-hidden selection:bg-awadh-maroon selection:text-awadh-ivory bg-awadh-ivory text-awadh-charcoal">
            <RoyalNavbar />
            <RoyalHero />
            <RoyalStory />
            <RoyalMenuShowcase />
            <RoyalExperience />
            <RoyalOrder />
            <RoyalFooter />
        </div>
    );
};
