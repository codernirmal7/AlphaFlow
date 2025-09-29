import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import {
    DollarSign,
    TrendingUp,
    Download,
    CreditCard,
    Building,
    Smartphone,
    Calendar,
    CheckSquare,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const Earnings: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { transactions } = useSelector((state: RootState) => state.app);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawMethod, setWithdrawMethod] = useState('bank');

    const earningsData = [
        { date: '2024-12-01', earnings: 45.50, tasks: 3, referrals: 0 },
        { date: '2024-12-02', earnings: 72.30, tasks: 4, referrals: 25 },
        { date: '2024-12-03', earnings: 38.20, tasks: 2, referrals: 0 },
        { date: '2024-12-04', earnings: 95.60, tasks: 5, referrals: 50 },
        { date: '2024-12-05', earnings: 67.40, tasks: 3, referrals: 0 },
        { date: '2024-12-06', earnings: 123.80, tasks: 6, referrals: 75 },
        { date: '2024-12-07', earnings: 84.90, tasks: 4, referrals: 25 },
    ];

    const totalEarnings = transactions
        .filter(t => t.type !== 'withdrawal' && t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const thisMonthEarnings = 847.20; // Mock data
    const lastMonthEarnings = 623.45; // Mock data
    const growthPercent = ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings * 100).toFixed(1);

    const stats = [
        {
            title: 'Current Balance',
            value: `$${user?.walletBalance?.toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-primary-500',
        },
        {
            title: 'Total Earnings',
            value: `$${totalEarnings.toFixed(2)}`,
            icon: TrendingUp,
            color: 'bg-success-500',
        },
        {
            title: 'This Month',
            value: `$${thisMonthEarnings.toFixed(2)}`,
            icon: Calendar,
            color: 'bg-accent-500',
            trend: `+${growthPercent}%`,
        },
        {
            title: 'Pending Withdrawals',
            value: '$200.00',
            icon: Download,
            color: 'bg-purple-500',
        },
    ];

    const handleWithdraw = () => {
        // Mock withdrawal logic
        console.log('Withdrawal request:', { amount: withdrawAmount, method: withdrawMethod });
        setShowWithdrawModal(false);
        setWithdrawAmount('');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between md:block hidden">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">Earnings</h1>
                    <p className="text-gray-600 mt-1">Track your earnings and manage withdrawals</p>
                </div>
                <Button onClick={() => setShowWithdrawModal(true)}>
                    <Download size={20} className="mr-2" />
                    Withdraw
                </Button>
            </div>

            {/* Mobile Withdraw Button */}
            <div className="md:hidden">
                <Button onClick={() => setShowWithdrawModal(true)} className="w-full">
                    <Download size={18} className="mr-2" />
                    Withdraw Earnings
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <div className="p-3 md:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${stat.color}`}>
                                        <stat.icon size={18} className="text-white md:w-6 md:h-6" />
                                    </div>
                                    {stat.trend && (
                                        <span className="text-success-600 text-xs md:text-sm font-medium">
                                            {stat.trend}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-xs md:text-sm mb-1 truncate">{stat.title}</p>
                                <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Earnings Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card>
                    <div className="p-4 md:p-6">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
                            Daily Earnings Trend
                        </h3>
                        <div className="h-48 md:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={earningsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Earnings']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="earnings"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.1}
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Earnings Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                                <Button variant="ghost" size="sm">View All</Button>
                            </div>
                            <div className="space-y-4">
                                {transactions.slice(0, 6).map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${transaction.type === 'task' ? 'bg-success-100' :
                                                transaction.type === 'referral' ? 'bg-accent-100' :
                                                    transaction.type === 'withdrawal' ? 'bg-error-100' :
                                                        'bg-primary-100'
                                                }`}>
                                                {transaction.type === 'task' && <CheckSquare size={16} className="text-success-600" />}
                                                {transaction.type === 'referral' && <Users size={16} className="text-accent-600" />}
                                                {transaction.type === 'withdrawal' && <Download size={16} className="text-error-600" />}
                                                {transaction.type === 'recharge' && <Calendar size={16} className="text-primary-600" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                                                <p className="text-xs text-gray-500">{transaction.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold text-sm ${transaction.amount > 0 ? 'text-success-600' : 'text-error-600'
                                                }`}>
                                                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                            </p>
                                            <p className={`text-xs capitalize ${transaction.status === 'completed' ? 'text-success-600' :
                                                transaction.status === 'pending' ? 'text-accent-600' :
                                                    'text-error-600'
                                                }`}>
                                                {transaction.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Earnings Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Summary</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-success-50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <CheckSquare size={20} className="text-success-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">Task Earnings</p>
                                            <p className="text-sm text-gray-600">From completed tasks</p>
                                        </div>
                                    </div>
                                    <p className="text-xl font-bold text-success-600">$1,247.50</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-accent-50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <Users size={20} className="text-accent-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">Referral Bonuses</p>
                                            <p className="text-sm text-gray-600">From referrals</p>
                                        </div>
                                    </div>
                                    <p className="text-xl font-bold text-accent-600">$325.00</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <TrendingUp size={20} className="text-primary-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">Bonus Earnings</p>
                                            <p className="text-sm text-gray-600">Special bonuses</p>
                                        </div>
                                    </div>
                                    <p className="text-xl font-bold text-primary-600">$157.20</p>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-semibold text-gray-900">Total Withdrawn</p>
                                        <p className="text-xl font-bold text-gray-600">$842.70</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Withdrawal Modal */}
            <Modal
                isOpen={showWithdrawModal}
                onClose={() => setShowWithdrawModal(false)}
                title="Withdraw Earnings"
                size="md"
            >
                <div className="space-y-6">
                    <div className="bg-primary-50 p-4 rounded-xl">
                        <p className="text-sm text-primary-800 mb-2">Available Balance</p>
                        <p className="text-2xl font-bold text-primary-900">
                            ${user?.walletBalance?.toFixed(2)}
                        </p>
                    </div>

                    <Input
                        label="Withdrawal Amount"
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        icon={<DollarSign size={20} className="text-gray-400" />}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Withdrawal Method
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                className={`p-4 rounded-xl border-2 transition-colors ${withdrawMethod === 'bank'
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setWithdrawMethod('bank')}
                            >
                                <Building size={24} className="mx-auto mb-2 text-gray-600" />
                                <p className="text-sm font-medium">Bank Transfer</p>
                                <p className="text-xs text-gray-500">1-3 days</p>
                            </button>

                            <button
                                className={`p-4 rounded-xl border-2 transition-colors ${withdrawMethod === 'card'
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setWithdrawMethod('card')}
                            >
                                <CreditCard size={24} className="mx-auto mb-2 text-gray-600" />
                                <p className="text-sm font-medium">Debit Card</p>
                                <p className="text-xs text-gray-500">Instant</p>
                            </button>

                            <button
                                className={`p-4 rounded-xl border-2 transition-colors ${withdrawMethod === 'wallet'
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setWithdrawMethod('wallet')}
                            >
                                <Smartphone size={24} className="mx-auto mb-2 text-gray-600" />
                                <p className="text-sm font-medium">Digital Wallet</p>
                                <p className="text-xs text-gray-500">Few minutes</p>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-600">
                            💡 <strong>Pro tip:</strong> Withdrawals are processed faster during business hours.
                            A small processing fee may apply based on the withdrawal method.
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowWithdrawModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={handleWithdraw}
                            disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                        >
                            Request Withdrawal
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};