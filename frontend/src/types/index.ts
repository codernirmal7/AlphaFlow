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