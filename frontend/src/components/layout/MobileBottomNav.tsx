import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Home,
    CheckSquare,
    DollarSign,
    Users,
    User
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: DollarSign, label: 'Earnings', path: '/earnings' },
    { icon: Users, label: 'Referrals', path: '/referrals' },
    { icon: User, label: 'Profile', path: '/profile' },
];

export const MobileBottomNav: React.FC = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 md:hidden">
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className="flex flex-col items-center justify-center py-2 px-3 min-w-0 relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeBottomTab"
                                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-600 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Icon
                                size={22}
                                className={`mb-1 ${isActive
                                        ? 'text-primary-600'
                                        : 'text-gray-500'
                                    }`}
                            />
                            <span
                                className={`text-xs font-medium truncate ${isActive
                                        ? 'text-primary-600'
                                        : 'text-gray-500'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};