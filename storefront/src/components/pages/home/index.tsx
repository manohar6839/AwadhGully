import styled from '@emotion/styled';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { Stack } from '@/src/components/atoms';
import { AwadhHero } from '@/src/components/organisms/AwadhHero';
import { BrandStory } from '@/src/components/organisms/BrandStory';
import { SignatureShowcase } from '@/src/components/organisms/SignatureShowcase';
import { ExperienceSection } from '@/src/components/organisms/ExperienceSection';
import { Layout } from '@/src/layouts';
import type { getStaticProps } from './props';

const Main = styled(Stack)`
    padding: 0 0 4rem 0;
`;

export const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const { t } = useTranslation('homepage');

    return (
        <Layout navigation={props.navigation} categories={props.categories} pageTitle={t('seo.home')}>
            <Main w100 column gap="4rem">
                <AwadhHero />
                <BrandStory />
                <SignatureShowcase products={props.products} />
                <ExperienceSection />
            </Main>
        </Layout>
    );
};
