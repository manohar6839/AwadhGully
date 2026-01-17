import React from 'react';
import { InferGetStaticPropsType } from 'next';

import { getStaticProps } from '@/src/components/pages/products/props';
import { ProductPage } from '@/src/components/pages/products';
import { getStaticPaths } from '@/src/components/pages/products/paths';
import { ProductProvider } from '@/src/state/product';

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = props => (
    <ProductProvider initialState={{ product: props.product }}>
        <ProductPage {...props} />
    </ProductProvider>
);

export { getStaticPaths, getStaticProps };
export default Page;
