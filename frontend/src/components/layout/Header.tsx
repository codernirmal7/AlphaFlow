import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { Menu, Transition } from '@headlessui/react';
import { Bell, User, LogOut, Settings, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { markAllNotificationsAsRead } from '../../store/slices/appSlice';

export const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { notifications } = useSelector((state: RootState) => state.app);
    const [showNotifications, setShowNotifications] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleNotificationToggle = () => {
        if (!showNotifications && unreadCount > 0) {
            dispatch(markAllNotificationsAsRead());
        }
        setShowNotifications(!showNotifications);
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
                <div className="flex items-center justify-end">


                    <div className="flex items-center space-x-4">
                        {/* Wallet Balance */}
                        <div className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-2xl">
                            <Wallet size={20} className="text-primary-600" />
                            <span className="font-semibold text-primary-900">
                                NPR {user?.walletBalance?.toFixed(2)}
                            </span>
                        </div>

                        {/* Notifications */}
                        <Menu as="div" className="relative">
                            <Menu.Button
                                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                                onClick={handleNotificationToggle}
                            >
                                <Bell size={24} />
                                {unreadCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                                    >
                                        {unreadCount}
                                    </motion.span>
                                )}
                            </Menu.Button>

                            <Transition
                                show={showNotifications}
                                enter="transition duration-200 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 focus:outline-none z-10">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.slice(0, 5).map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                            >
                                                <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* Profile Menu */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center space-x-3 p-1 rounded-2xl hover:bg-gray-100 transition-colors">
                                <img
                                    src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                                    alt={user?.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="text-left hidden md:block">
                                    <p className="font-medium text-gray-900">{user?.name}</p>
                                    <p className="text-sm text-gray-500 capitalize">{user?.currentPlan} Plan</p>
                                </div>
                            </Menu.Button>

                            <Transition
                                enter="transition duration-200 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 focus:outline-none z-10">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="/profile"
                                                className={`${active ? 'bg-gray-50' : ''
                                                    } flex items-center px-4 py-2 text-gray-700`}
                                            >
                                                <User size={18} className="mr-3" />
                                                Profile
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="/settings"
                                                className={`${active ? 'bg-gray-50' : ''
                                                    } flex items-center px-4 py-2 text-gray-700`}
                                            >
                                                <Settings size={18} className="mr-3" />
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`${active ? 'bg-gray-50' : ''
                                                    } flex items-center w-full px-4 py-2 text-gray-700`}
                                            >
                                                <LogOut size={18} className="mr-3" />
                                                Sign Out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
};