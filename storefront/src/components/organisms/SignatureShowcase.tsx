import React from 'react';
import styled from '@emotion/styled';
import { useCart } from '@/src/state/cart';
import { useProduct } from '@/src/state/product';

interface Product {
    name: string;
    description: string;
    image: string;
    price: string;
    slug: string;
}

import { ProductImage } from '@/src/components/atoms/ProductImage';
import { Price as PriceAtom } from '@/src/components/atoms/Price';
import { useTranslation } from 'next-i18next';

const Section = styled.section`
    padding: 6rem 2rem;
    background-color: #FAF7F2;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const SectionTitle = styled.h2`
    font-family: var(--font-playfair), serif;
    font-size: 3.5rem;
    color: #1E1E1E;
    text-align: center;
    margin-bottom: 4rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
`;

const Card = styled.div`
    background-color: #FAF7F2;
    border: 1px solid transparent;
    transition: all 0.3s ease;
    padding-bottom: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover {
        border-color: #5A0F1B;
        box-shadow: 0 10px 30px rgba(90, 15, 27, 0.1);
        transform: translateY(-5px);
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    height: 300px;
    width: 100%;
    background-color: #2a0a0f;
    margin-bottom: 1.5rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const DishName = styled.h3`
    font-family: var(--font-playfair), serif;
    font-size: 2.2rem;
    color: #1E1E1E;
    padding: 0 1.5rem;
    margin-bottom: 0.5rem;
`;

const Description = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 1.4rem;
    color: #8C8C8C;
    padding: 0 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    flex-grow: 1;
`;

const AccentDot = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #E07A2D;
    border-radius: 50%;
    margin-left: 1rem;
`;

const PriceWrapper = styled.div`
    padding: 0 1.5rem;
    margin-bottom: 1rem;
`;

const AddToCartBtn = styled.button`
    margin: 0 1.5rem;
    background-color: #5A0F1B;
    color: #FAF7F2;
    border: none;
    padding: 0.8rem 1.5rem;
    font-family: var(--font-poppins), sans-serif;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background-color: #7A1F2E;
    }
`;

export const SignatureShowcase: React.FC<{ products?: any[] }> = ({ products }) => {
    const { addToCart } = useCart();
    const { t } = useTranslation('common');

    const handleAddToCart = async (product: any) => {
        const variantId = product.productVariantId || (product.variants && product.variants[0]?.id);
        if (variantId) {
            await addToCart(variantId, 1, true);
        } else {
            console.error("No variant ID found for", product.slug, product);
        }
    };

    const getPriceValue = (price: any): number => {
        if (typeof price === 'number') return price;
        if (price?.__typename === 'PriceRange' || price?.min !== undefined) return price.min;
        if (price?.__typename === 'SinglePrice' || price?.value !== undefined) return price.value;
        return 0;
    };

    if (!products || products.length === 0) return null;

    return (
        <Section id="menu">
            <Container>
                <SectionTitle>Signature Creations</SectionTitle>
                <Grid>
                    {products.map((p, i) => (
                        <Card key={p.id || i}>
                            <ImageWrapper>
                                {p.productAsset?.preview ? (
                                    <ProductImage
                                        src={p.productAsset.preview}
                                        size="tile"
                                        alt={p.productName || p.name}
                                    />
                                ) : (
                                    <div style={{ color: '#FAF7F2', opacity: 0.5 }}>Image coming soon</div>
                                )}
                            </ImageWrapper>
                            <DishName>
                                {p.productName || p.name} <AccentDot />
                            </DishName>
                            <Description>{p.description}</Description>
                            <PriceWrapper>
                                <PriceAtom
                                    price={getPriceValue(p.priceWithTax)}
                                    currencyCode={p.currencyCode}
                                    size="1.8rem"
                                    weight={600}
                                />
                            </PriceWrapper>
                            <AddToCartBtn onClick={() => handleAddToCart(p)}>Add to Cart</AddToCartBtn>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </Section>
    );
};
