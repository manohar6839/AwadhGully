import { Dropdown, HoverMenu, DropdownItem } from '@/src/styles/reusableStyles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Link } from '@/src/components/atoms';
import { User2, UserCheck2, UserCircle, Package, MapPin, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/router';
import { storefrontApiMutation } from '@/src/graphql/client';
import { useChannels } from '@/src/state/channels';

export const UserMenu: React.FC<{ isLogged: boolean }> = ({ isLogged }) => {
    const router = useRouter();
    const ctx = useChannels();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await storefrontApiMutation(ctx)({
                logout: {
                    success: true,
                },
            });
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Dropdown>
            <IconButton aria-label="User menu">
                <AnimatePresence>
                    {isLogged ? (
                        <IconWrapper initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <UserCheck2 size="2.4rem" />
                        </IconWrapper>
                    ) : (
                        <IconWrapper initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <User2 size="2.4rem" />
                        </IconWrapper>
                    )}
                </AnimatePresence>
            </IconButton>
            
            <HoverMenu customerMenu>
                {isLogged ? (
                    <>
                        <MenuLink href="/customer/manage">
                            <MenuItem>
                                <UserCircle size="2rem" />
                                <MenuText>My Account</MenuText>
                            </MenuItem>
                        </MenuLink>
                        <MenuLink href="/customer/manage/orders">
                            <MenuItem>
                                <Package size="2rem" />
                                <MenuText>My Orders</MenuText>
                            </MenuItem>
                        </MenuLink>
                        <MenuLink href="/customer/manage/addresses">
                            <MenuItem>
                                <MapPin size="2rem" />
                                <MenuText>Manage Addresses</MenuText>
                            </MenuItem>
                        </MenuLink>
                        <MenuDivider />
                        <MenuButton onClick={handleLogout}>
                            <MenuItem>
                                <LogOut size="2rem" />
                                <MenuText>Logout</MenuText>
                            </MenuItem>
                        </MenuButton>
                    </>
                ) : (
                    <>
                        <MenuLink href="/customer/sign-in">
                            <MenuItem>
                                <LogIn size="2rem" />
                                <MenuText>Sign in</MenuText>
                            </MenuItem>
                        </MenuLink>
                        <MenuLink href="/customer/sign-up">
                            <MenuItem>
                                <UserPlus size="2rem" />
                                <MenuText>Sign up</MenuText>
                            </MenuItem>
                        </MenuLink>
                    </>
                )}
            </HoverMenu>
        </Dropdown>
    );
};

const IconWrapper = styled(motion.div)`
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const IconButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${p => p.theme.text.main};
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${p => p.theme.gray(50)};
    }
`;

const MenuLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;
    width: 100%;
`;

const MenuButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    text-align: left;
    color: inherit;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    transition: all 0.2s ease;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;

    &:hover {
        background-color: ${p => p.theme.gray(100)};
    }

    svg {
        flex-shrink: 0;
        color: ${p => p.theme.text.main};
    }
`;

const MenuText = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${p => p.theme.text.main};
    white-space: nowrap;
`;

const MenuDivider = styled.div`
    height: 1px;
    background-color: ${p => p.theme.gray(200)};
    margin: 0.5rem 0;
`;
