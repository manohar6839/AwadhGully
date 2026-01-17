import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = styled.section`
    position: relative;
    height: 90vh;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #000;
    overflow: hidden;
`;

const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.6;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #180507 0%, rgba(24, 5, 7, 0.8) 40%, rgba(24, 5, 7, 0) 100%);
    }
`;

const ContentContainer = styled.div`
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
`;

const Tagline = styled.h1`
    font-family: var(--font-playfair), serif;
    font-size: 5rem;
    font-weight: 700;
    color: #FAF7F2;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    max-width: 800px;

    @media (max-width: 768px) {
        font-size: 3.5rem;
    }
`;

const SubHeadline = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 1.8rem;
    color: rgba(250, 247, 242, 0.9);
    margin-bottom: 3rem;
    max-width: 600px;
    letter-spacing: 0.5px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const PrimaryButton = styled(Link)`
    background-color: #5A0F1B;
    color: #FAF7F2;
    padding: 1rem 2.5rem;
    font-family: var(--font-poppins), sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid #5A0F1B;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
        background-color: #7A1F2E;
        border-color: #7A1F2E;
        color: #fff;
    }
`;

const OutlineButton = styled(Link)`
    background-color: transparent;
    color: #FAF7F2;
    padding: 1rem 2.5rem;
    font-family: var(--font-poppins), sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid #FAF7F2;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
        background-color: rgba(250, 247, 242, 0.1);
        color: #fff;
    }
`;

export const AwadhHero: React.FC = () => {
    return (
        <HeroSection>
            <BackgroundImage>
                <Image 
                    src="/hero-background.png" 
                    alt="Awadh Gully cuisine" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </BackgroundImage>
            <ContentContainer>
                <Tagline>Royal Awadhi Flavors,<br />Modernly Served.</Tagline>
                <SubHeadline>
                    A culinary journey back to the royal kitchens of the Nawabs, reimagined for the pace of the modern urban gourmand.
                </SubHeadline>
                <ButtonGroup>
                    <PrimaryButton href="#menu">Order Now</PrimaryButton>
                    <OutlineButton href="#story">View Our Story</OutlineButton>
                </ButtonGroup>
            </ContentContainer>
        </HeroSection>
    );
};
