import React from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { Outlet, useLocation } from 'react-router-dom';

const getPageTitle = (pathname: string): string => {
    switch (pathname) {
        case '/dashboard': return 'EarnHub';
        case '/tasks': return 'Tasks';
        case '/earnings': return 'Earnings';
        case '/referrals': return 'Referrals';
        case '/profile': return 'Profile';
        case '/plans': return 'Plans';
        case '/support': return 'Support';
        default: return 'EarnHub';
    }
};

export const MobileLayout: React.FC = () => {
    const location = useLocation();
    const title = getPageTitle(location.pathname);

    return (
        <div className="flex flex-col h-screen bg-gray-50 md:hidden">
            <MobileHeader title={title} />
            <main className="flex-1 overflow-y-auto pb-20">
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
            <MobileBottomNav />
        </div>
    );
};