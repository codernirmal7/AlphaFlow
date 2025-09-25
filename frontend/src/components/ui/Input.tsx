import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    className,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        'block w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
                        icon && 'pl-10',
                        error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-sm text-error-600">{error}</p>
            )}
        </div>
    );
};