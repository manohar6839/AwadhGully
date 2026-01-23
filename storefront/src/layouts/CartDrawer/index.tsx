import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { TP } from '@/src/components/atoms/TypoGraphy';
import { Stack } from '@/src/components/atoms/Stack';
import { IconButton } from '@/src/components/molecules/Button';
import { ActiveOrderType } from '@/src/graphql/selectors';
import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/src/state/cart';
import { CurrencyCode } from '@/src/zeus';
import { CartHeader } from './CartHeader';
import { CartFooter } from './CartFooter';
import { CartBody } from './CartBody';
import { useOutsideClick } from '@/src/util/hooks/useOutsideClick';

export const CartDrawer = ({ activeOrder }: { activeOrder?: ActiveOrderType }) => {
    const { isOpen, open, close } = useCart();
    const currencyCode = activeOrder?.currencyCode || CurrencyCode.USD;
    const discountsSum = useMemo(() => {
        const discounts = activeOrder?.discounts?.reduce((acc, discount) => acc - discount.amountWithTax, 0) ?? 0;
        return discounts;
    }, [activeOrder]);

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => close());

    const cartItemCount = activeOrder?.lines?.length || 0;

    return (
        <>
            {cartItemCount > 0 && (
                <button 
                    onClick={open}
                    className="relative flex items-center justify-center p-2 rounded-lg cursor-pointer text-awadh-ivory hover:bg-white/10 transition-colors"
                >
                    <ShoppingCartIcon size={'1.8rem'} />
                    <div className="absolute -top-1 -right-1 bg-awadh-gold text-awadh-maroon text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border border-awadh-maroon">
                        {cartItemCount}
                    </div>
                </button>
            )}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <CartComponentMain
                        ref={ref}
                        initial={{ transform: 'translateX(100%)' }}
                        animate={{ transform: 'translateX(0%)' }}
                        exit={{ transform: 'translateX(100%)' }}>
                        <CartContainer column>
                            <CartHeader activeOrder={activeOrder} />
                            <CartBody activeOrder={activeOrder} currencyCode={currencyCode} />
                            <CartFooter
                                activeOrder={activeOrder}
                                currencyCode={currencyCode}
                                discountsSum={discountsSum}
                            />
                        </CartContainer>
                    </CartComponentMain>
                )}
            </AnimatePresence>
        </>
    );
};

const CartComponentMain = styled(motion.div)`
    width: 100%;
    max-width: 55rem;
    height: 100dvh;

    z-index: 2147483647;

    position: fixed;
    top: 0;
    right: 0;

    overflow-y: auto;

    background: ${p => p.theme.gray(0)};
    border-left: 1px solid ${p => p.theme.gray(100)};
    box-shadow: 0rem 0.2rem 1rem ${p => p.theme.shadow};
`;

const CartContainer = styled(Stack)`
    height: 100%;
`;
