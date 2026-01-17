import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Section = styled.section`
    padding: 6rem 2rem;
    background-color: #FAF7F2;
    text-align: center;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-family: var(--font-playfair), serif;
    font-size: 3.5rem;
    color: #1E1E1E;
    margin-bottom: 4rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
    margin-bottom: 5rem;
`;

const FeatureCard = styled.div`
    padding: 2rem;
    border: 1px solid #C9A24D;
    border-radius: 4px;
    background-color: #fff;
`;

const FeatureTitle = styled.h3`
    font-family: var(--font-playfair), serif;
    font-size: 2rem;
    color: #5A0F1B;
    margin-bottom: 1rem;
`;

const FeatureText = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 1.5rem;
    color: #1E1E1E;
    line-height: 1.6;
`;

const CTAContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
`;

const ExternalLink = styled.a`
    display: inline-block;
    padding: 1.2rem 2.5rem;
    font-family: var(--font-poppins), sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
    border-radius: 8px;
    text-decoration: none;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
    }
`;

const SwiggyBtn = styled(ExternalLink)`
    background-color: #FC8019; // Swiggy Orange
`;

const ZomatoBtn = styled(ExternalLink)`
    background-color: #CB202D; // Zomato Red
`;

export const ExperienceSection: React.FC = () => {
    return (
        <Section id="experience">
            <Container>
                <Title>The Modern Awadh Experience</Title>
                <Grid>
                    <FeatureCard>
                        <FeatureTitle>Cloud Kitchens</FeatureTitle>
                        <FeatureText>Precision-controlled environments ensuring every Dum Biryani is cooked to the exact same royal standard, every time.</FeatureText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>EV Food Carts</FeatureTitle>
                        <FeatureText>Bringing Lucknow to your doorstep sustainably. Our custom electric carts maintain ideal serving temperatures.</FeatureText>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Smart Delivery</FeatureTitle>
                        <FeatureText>Integrated with top logistics to ensure the 'Dum' (steam) is broken only when you open the box.</FeatureText>
                    </FeatureCard>
                </Grid>

                <CTAContainer>
                    <SwiggyBtn href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer">Order on Swiggy</SwiggyBtn>
                    <ZomatoBtn href="https://www.zomato.com" target="_blank" rel="noopener noreferrer">Order on Zomato</ZomatoBtn>
                </CTAContainer>
            </Container>
        </Section>
    );
};
