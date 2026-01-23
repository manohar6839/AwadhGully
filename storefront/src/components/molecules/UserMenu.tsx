import { Dropdown, HoverMenu, DropdownItem } from '@/src/styles/reusableStyles';
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
            <div className="flex items-center justify-center p-2 rounded-lg cursor-pointer text-awadh-ivory hover:bg-white/10 transition-colors">
                <AnimatePresence>
                    {isLogged ? (
                        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-10 h-10 flex items-center justify-center">
                            <UserCheck2 size="1.8rem" />
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-10 h-10 flex items-center justify-center">
                            <User2 size="1.8rem" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <HoverMenu customerMenu>
                <div className="bg-white rounded-lg shadow-xl p-2 min-w-[200px] border border-gray-100">
                    {isLogged ? (
                        <>
                            <Link href="/customer/manage" className="block w-full">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors text-gray-800">
                                    <UserCircle size="1.2rem" className="text-awadh-maroon" />
                                    <span className="font-medium text-sm">My Account</span>
                                </div>
                            </Link>
                            <Link href="/customer/manage/orders" className="block w-full">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors text-gray-800">
                                    <Package size="1.2rem" className="text-awadh-maroon" />
                                    <span className="font-medium text-sm">My Orders</span>
                                </div>
                            </Link>
                            <Link href="/customer/manage/addresses" className="block w-full">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors text-gray-800">
                                    <MapPin size="1.2rem" className="text-awadh-maroon" />
                                    <span className="font-medium text-sm">Manage Addresses</span>
                                </div>
                            </Link>
                            <div className="h-px bg-gray-100 my-1"></div>
                            <button onClick={handleLogout} className="w-full text-left">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors text-red-600">
                                    <LogOut size="1.2rem" />
                                    <span className="font-medium text-sm">Logout</span>
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/customer/sign-in" className="block w-full">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors text-gray-800">
                                    <LogIn size="1.2rem" className="text-awadh-maroon" />
                                    <span className="font-medium text-sm">Sign in</span>
                                </div>
                            </Link>
                            <Link href="/customer/sign-up" className="block w-full">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors text-gray-800">
                                    <UserPlus size="1.2rem" className="text-awadh-maroon" />
                                    <span className="font-medium text-sm">Sign up</span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </HoverMenu>
        </Dropdown>
    );
};
