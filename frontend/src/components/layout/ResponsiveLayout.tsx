import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Layout } from './Layout';
import { MobileLayout } from './MobileLayout';

export const ResponsiveLayout: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            {/* Desktop/Tablet Layout */}
            <div className="hidden md:block">
                <Layout />
            </div>

            {/* Mobile Layout */}
            <div className="block md:hidden">
                <MobileLayout />
            </div>
        </>
    );
};