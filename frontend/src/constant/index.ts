import { Plan, User } from '../types/index';

export const plans: Plan[] = [
    {
        id: '1',
        name: 'basic',
        displayName: 'Basic Plan',
        price: 29,
        features: [
            'Up to 20 tasks per month',
            'Basic earning potential',
            'Email support',
            'Standard withdrawal processing'
        ],
        taskLimit: 20,
        earningPotential: 500,
    },
    {
        id: '2',
        name: 'medium',
        displayName: 'Medium Plan',
        price: 59,
        features: [
            'Up to 50 tasks per month',
            'Enhanced earning potential',
            'Priority support',
            'Faster withdrawal processing',
            'Bonus tasks access'
        ],
        taskLimit: 50,
        earningPotential: 1200,
        popular: true,
    },
    {
        id: '3',
        name: 'high',
        displayName: 'High Plan',
        price: 99,
        features: [
            'Unlimited tasks per month',
            'Maximum earning potential',
            'Premium support',
            'Instant withdrawal processing',
            'Exclusive high-value tasks',
            'Referral bonus multiplier'
        ],
        taskLimit: -1,
        earningPotential: 3000,
    },
];

export const mockUser: User = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    walletBalance: 1847.50,
    currentPlan: 'medium',
    referralCode: 'JOH123456',
    totalReferrals: 12,
    joinDate: '2024-01-15',
};
