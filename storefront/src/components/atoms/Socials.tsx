import React from 'react';
import { Stack } from './Stack';
import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from '@/src/components/atoms';
import styled from '@emotion/styled';

const socialHrefs = [
    { href: 'https://www.facebook.com/Aexol', icon: <Facebook size="3rem" />, ariaLabel: 'Facebook', hoverColor: '#1877F2' },
    { href: 'https://www.instagram.com/aexolofficial/', icon: <Instagram size="3rem" />, ariaLabel: 'Instagram', hoverColor: '#E1306C' },
    { href: 'https://www.youtube.com/@AEXOLAPPS', icon: <Youtube size="3rem" />, ariaLabel: 'Youtube', hoverColor: '#FF0000' },
];

export const Socials: React.FC = () => {
    return (
        <Container gap="1rem" justifyEnd>
            {socialHrefs.map(({ href, icon, ariaLabel, hoverColor }) => (
                <StyledLink aria-label={ariaLabel} external key={href} href={href} hoverColor={hoverColor}>
                    {icon}
                </StyledLink>
            ))}
        </Container>
    );
};

const StyledLink = styled(Link)<{ hoverColor: string }>`
    height: max-content;
    color: inherit;
    transition: color 0.3s ease;
    
    &:hover {
        color: ${p => p.hoverColor};
    }
`;

const Container = styled(Stack)`
    color: ${({ theme }) => theme.gray(800)};
    @media (min-width: ${p => p.theme.breakpoints.ssm}) {
        gap: 3.5rem;
    }
`;
