import React from 'react';
import { cn } from '../../utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';

const Card = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
    ({ className, whileHover, ...props }, ref) => (
        <motion.div
            ref={ref}
            whileHover={whileHover ?? { y: -2 }}
            className={cn(
                'rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200',
                className
            )}
            {...props}
        />
    )
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-lg font-semibold leading-none tracking-tight font-heading text-gray-900',
            className
        )}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-gray-600', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardDescription, CardContent };