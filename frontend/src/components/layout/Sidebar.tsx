import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CheckSquare,
    CreditCard,
    TrendingUp,
    Users,
    User,
    HelpCircle,
    LogOut,
    DollarSign,
    Settings,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { cn } from '../../utils/cn';

const navigationItems = [
    { icon: LayoutDashboard, name: 'Dashboard', href: '/dashboard' },
    { icon: CheckSquare, name: 'Tasks', href: '/tasks' },
    { icon: CreditCard, name: 'Plans', href: '/plans' },
    { icon: DollarSign, name: 'Earnings', href: '/earnings' },
    { icon: Users, name: 'Referrals', href: '/referrals' },
    { icon: User, name: 'Profile', href: '/profile' },
    { icon: Settings, name: 'Settings', href: '/settings' },
    { icon: HelpCircle, name: 'Support', href: '/support' },
];

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={cn('bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col', className)}>
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold font-heading text-gray-900">EarnPro</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            )
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}