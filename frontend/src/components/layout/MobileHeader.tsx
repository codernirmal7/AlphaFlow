import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { markAllNotificationsAsRead } from '../../store/slices/appSlice';
import { Menu, Transition } from '@headlessui/react';
import { Bell, Settings, LogOut, Wallet, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHeaderProps {
    title: string;
    showBackButton?: boolean;
    onBackClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
    title,
    showBackButton = false,
    onBackClick
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { notifications } = useSelector((state: RootState) => state.app);
    const [showMenu, setShowMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = () => {
        dispatch(logout());
        setShowMenu(false);
    };

    const handleNotificationToggle = () => {
        if (!showNotifications && unreadCount > 0) {
            dispatch(markAllNotificationsAsRead());
        }
        setShowNotifications(!showNotifications);
    };

    return (
        <>
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {showBackButton ? (
                                <button
                                    onClick={onBackClick}
                                    className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowMenu(true)}
                                    className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors md:hidden"
                                >
                                    <MenuIcon size={24} />
                                </button>
                            )}
                            <h1 className="text-xl font-heading font-bold text-gray-900 truncate">
                                {title}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* Wallet Balance - Compact */}
                            <div className="flex items-center space-x-1 bg-primary-50 px-3 py-1.5 rounded-full">
                                <Wallet size={16} className="text-primary-600" />
                                <span className="font-semibold text-primary-900 text-sm">
                                    ${user?.walletBalance?.toFixed(0)}
                                </span>
                            </div>

                            {/* Notifications */}
                            <button
                                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                                onClick={handleNotificationToggle}
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </motion.span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                        onClick={() => setShowMenu(false)}
                    >
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="bg-white h-full w-80 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-heading font-bold text-gray-900">Menu</h2>
                                    <button
                                        onClick={() => setShowMenu(false)}
                                        className="p-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Profile Section */}
                                <div className="flex items-center space-x-3 mb-8 p-4 bg-gray-50 rounded-2xl">
                                    <img
                                        src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                                        alt={user?.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900">{user?.name}</p>
                                        <p className="text-sm text-gray-500 capitalize">{user?.currentPlan} Plan</p>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <nav className="space-y-2">
                                    <a
                                        href="/plans"
                                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-2xl transition-colors"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        <Settings size={20} />
                                        <span>Plans & Billing</span>
                                    </a>
                                    <a
                                        href="/support"
                                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-2xl transition-colors"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        <Bell size={20} />
                                        <span>Support</span>
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-3 px-4 py-3 text-error-600 hover:bg-error-50 rounded-2xl transition-colors w-full text-left"
                                    >
                                        <LogOut size={20} />
                                        <span>Sign Out</span>
                                    </button>
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notifications Dropdown */}
            <AnimatePresence>
                {showNotifications && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 right-4 left-4 bg-white rounded-2xl shadow-lg border border-gray-200 z-40 md:hidden"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {notifications.slice(0, 5).map((notification) => (
                                <div
                                    key={notification.id}
                                    className="p-4 border-b border-gray-100 last:border-b-0"
                                >
                                    <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};