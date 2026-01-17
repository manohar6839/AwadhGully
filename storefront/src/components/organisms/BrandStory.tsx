import React from 'react';
import styled from '@emotion/styled';

const Section = styled.section`
    background-color: #FAF7F2;
    padding: 8rem 2rem;
    text-align: center;
`;

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-family: var(--font-playfair), serif;
    font-size: 4rem;
    color: #1E1E1E;
    margin-bottom: 4rem;
`;

const Text = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 1.8rem;
    line-height: 1.8;
    color: #1E1E1E;
    margin-bottom: 2rem;
    position: relative;
    
    &::first-letter {
        font-family: var(--font-playfair), serif;
        font-size: 3.5em;
        float: left;
        line-height: 0.8;
        margin-right: 0.1em;
        color: #C9A24D;
    }
`;

const Highlight = styled.span`
    color: #5A0F1B;
    font-weight: 600;
`;

const Divider = styled.div`
    height: 1px;
    width: 60px;
    background-color: rgba(201, 162, 77, 0.4);
    margin: 3rem auto;
`;

export const BrandStory: React.FC = () => {
    return (
        <Section id="story">
            <Container>
                <Title>The Awadh Gully Story</Title>
                <Text>
                    In the narrow, aromatic lanes of old Lucknow, food was never just sustenance; it was an art form patronage by Nawabs. The <Highlight>Galoutis</Highlight> were crafted to melt on the tongue, and the <Highlight>Biryanis</Highlight> were slow-cooked overnight to capture the essence of saffron and charcoal. This was a world of patience, texture, and untold luxury.
                </Text>
                <Divider />
                <Text>
                    Awadh Gully was born from a desire to bridge centuries. We asked ourselves: can this royal heritage survive the hustle of the modern metropolis? The answer lies in our philosophy of <Highlight>"Premium Convenience"</Highlight>. We stripped away the heaviness of traditional dining halls but kept the weight of the culinary tradition intact.
                </Text>
                <Divider />
                <Text>
                    Every spice blend is authentic. Every cut of meat is premium. But the experience is designed for you—whether you're ordering from our cloud kitchen for a dinner party or grabbing a box from our eco-friendly carts. This is the new heritage.
                </Text>
            </Container>
        </Section>
    );
};
