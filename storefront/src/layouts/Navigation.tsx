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

    return (
        <>
            <StickyContainer>
                <ContentContainer>
                    <Stack itemsCenter justifyBetween gap="5rem" w100>
                        <Stack itemsCenter>
                            <Link ariaLabel={'Home'} href={'/'}>
                                <LogoAexol width={60} />
                            </Link>
                        </Stack>
                        <DesktopNavigation navigation={navigation} />
                        <Stack gap="1rem" itemsCenter>
                            {/* Country selector removed - India only */}
                            <UserMenu isLogged={isLogged} />
                            <CartDrawer activeOrder={cart} />
                        </Stack>
                    </Stack>
                </ContentContainer>
            </StickyContainer>

            {categories?.length > 0 ? <CategoryBar collections={categories} /> : null}
        </>
    );
};

const StickyContainer = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 2rem;
    position: sticky;
    top: 0;
    background: ${p => p.theme.gray(0)};
    z-index: 2137;
    border-bottom: 1px solid ${p => p.theme.gray(100)};
    svg {
        max-height: 4rem;
    }
`;
