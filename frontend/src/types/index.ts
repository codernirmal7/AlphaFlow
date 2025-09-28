export interface Plan {
    id: string;
    name: 'basic' | 'medium' | 'high';
    displayName: string;
    price: number;
    features: string[];
    taskLimit: number;
    earningPotential: number;
    popular?: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    walletBalance: number;
    currentPlan: 'basic' | 'medium' | 'high';
    referralCode: string;
    totalReferrals: number;
    joinDate: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    icon: string;
    reward: number;
    type: 'daily' | 'weekly';
    status: 'pending' | 'completed' | 'in_progress';
    deadline?: string;
    category: string;
}


export interface Transaction {
    id: string;
    type: 'task' | 'referral' | 'withdrawal' | 'recharge';
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    description: string;
}

export interface Referral {
    id: string;
    name: string;
    email: string;
    joinDate: string;
    earnings: number;
    status: 'active' | 'inactive';
    level: number;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    date: string;
}

export interface AppState {
    tasks: Task[];
    plans: Plan[];
    transactions: Transaction[];
    referrals: Referral[];
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}