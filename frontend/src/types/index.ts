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