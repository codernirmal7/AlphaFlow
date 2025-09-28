import { Notification, Plan, Referral, Task, Transaction, User } from '../types/index';

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


export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Complete Social Media Survey',
        description: 'Answer questions about your social media habits and preferences.',
        icon: 'MessageSquare',
        reward: 25.00,
        type: 'daily',
        status: 'pending',
        deadline: '2024-12-31',
        category: 'Survey',
    },
    {
        id: '2',
        title: 'Watch Product Demo Video',
        description: 'Watch a 5-minute product demonstration and provide feedback.',
        icon: 'Play',
        reward: 15.00,
        type: 'daily',
        status: 'completed',
        category: 'Video',
    },
    {
        id: '3',
        title: 'App Testing & Review',
        description: 'Test a mobile app for 10 minutes and write a detailed review.',
        icon: 'Smartphone',
        reward: 50.00,
        type: 'weekly',
        status: 'in_progress',
        deadline: '2024-12-28',
        category: 'Testing',
    },
    {
        id: '4',
        title: 'Online Shopping Data Entry',
        description: 'Enter product information from provided images into spreadsheet.',
        icon: 'Database',
        reward: 35.00,
        type: 'daily',
        status: 'pending',
        category: 'Data Entry',
    },
    {
        id: '5',
        title: 'Website Usability Test',
        description: 'Navigate through a website and report any usability issues.',
        icon: 'Globe',
        reward: 40.00,
        type: 'weekly',
        status: 'completed',
        category: 'Testing',
    },
];


export const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'task',
        amount: 25.00,
        status: 'completed',
        date: '2024-12-20',
        description: 'Social Media Survey completed',
    },
    {
        id: '2',
        type: 'referral',
        amount: 50.00,
        status: 'completed',
        date: '2024-12-19',
        description: 'Referral bonus - Sarah Johnson',
    },
    {
        id: '3',
        type: 'withdrawal',
        amount: -200.00,
        status: 'pending',
        date: '2024-12-18',
        description: 'Bank transfer withdrawal',
    },
    {
        id: '4',
        type: 'task',
        amount: 15.00,
        status: 'completed',
        date: '2024-12-17',
        description: 'Product demo video watched',
    },
    {
        id: '5',
        type: 'recharge',
        amount: 59.99,
        status: 'completed',
        date: '2024-12-15',
        description: 'Medium plan purchase',
    },
];

export const mockReferrals: Referral[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        joinDate: '2024-12-15',
        earnings: 250.00,
        status: 'active',
        level: 1,
    },
    {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@example.com',
        joinDate: '2024-12-10',
        earnings: 180.00,
        status: 'active',
        level: 1,
    },
    {
        id: '3',
        name: 'Emma Davis',
        email: 'emma.d@example.com',
        joinDate: '2024-12-08',
        earnings: 320.00,
        status: 'active',
        level: 1,
    },
    {
        id: '4',
        name: 'Alex Wilson',
        email: 'alex.w@example.com',
        joinDate: '2024-12-05',
        earnings: 95.00,
        status: 'inactive',
        level: 1,
    },
];

export const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Task Completed',
        message: 'Your social media survey has been approved. $25 added to wallet.',
        type: 'success',
        read: false,
        date: '2024-12-20',
    },
    {
        id: '2',
        title: 'New Referral',
        message: 'Sarah Johnson joined using your referral code. Bonus incoming!',
        type: 'info',
        read: false,
        date: '2024-12-19',
    },
    {
        id: '3',
        title: 'Withdrawal Pending',
        message: 'Your withdrawal request of $200 is being processed.',
        type: 'warning',
        read: true,
        date: '2024-12-18',
    },
    {
        id: '4',
        title: 'Plan Expiry Reminder',
        message: 'Your Medium plan expires in 5 days. Consider upgrading!',
        type: 'info',
        read: true,
        date: '2024-12-16',
    },
];