import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
    DollarSign,
    CheckSquare,
    Users,
    TrendingUp,
    ArrowUpRight,
    Calendar,
    Plus,
    Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { tasks, transactions } = useSelector((state: RootState) => state.app);

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;

    const stats = [
        {
            title: 'Wallet Balance',
            value: `NPR ${user?.walletBalance?.toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-primary-500',
            trend: '+12.5%',
        },
        {
            title: 'Completed Tasks',
            value: completedTasks.toString(),
            icon: CheckSquare,
            color: 'bg-success-500',
            trend: '+8.2%',
        },
        {
            title: 'Total Referrals',
            value: user?.totalReferrals?.toString() || '0',
            icon: Users,
            color: 'bg-accent-500',
            trend: '+15.3%',
        },
        {
            title: 'This Month Earnings',
            value: 'NPR 847.20',
            icon: TrendingUp,
            color: 'bg-purple-500',
            trend: '+22.1%',
        },
    ];

    const taskData = [
        { name: 'Completed', value: completedTasks, color: '#22c55e' },
        { name: 'In Progress', value: inProgressTasks, color: '#f59e0b' },
        { name: 'Pending', value: pendingTasks, color: '#6b7280' },
    ];

    const earningsData = [
        { month: 'Jan', earnings: 450 },
        { month: 'Feb', earnings: 680 },
        { month: 'Mar', earnings: 520 },
        { month: 'Apr', earnings: 780 },
        { month: 'May', earnings: 920 },
        { month: 'Jun', earnings: 847 },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white md:block hidden">
                    <div className="p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-heading font-bold mb-2">
                                    Welcome back, {user?.name?.split(' ')[0]}! 👋
                                </h1>
                                <p className="text-primary-100 text-lg">
                                    You're doing great! Keep completing tasks to boost your earnings.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="text-right">
                                    <p className="text-primary-100 text-sm">Current Plan</p>
                                    <p className="text-2xl font-bold capitalize">{user?.currentPlan}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Mobile Welcome Card */}
                <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white md:hidden">
                    <div className="p-4">
                        <h1 className="text-xl font-heading font-bold mb-1">
                            Welcome back, {user?.name?.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-primary-100 text-sm">
                            Keep completing tasks to boost your earnings.
                        </p>
                    </div>
                </Card>
            </motion.div>

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
                            <div className="p-4 md:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${stat.color}`}>
                                        <stat.icon size={20} className="text-white md:w-6 md:h-6" />
                                    </div>
                                    <div className="flex items-center text-success-600 text-xs md:text-sm font-medium">
                                        <ArrowUpRight size={16} className="mr-1" />
                                        {stat.trend}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-xs md:text-sm mb-1 truncate">{stat.title}</p>
                                <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>


            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Task Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <div className="p-4 md:p-6">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Task Distribution</h3>
                            <div className="h-48 md:h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={taskData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {taskData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center space-x-3 md:space-x-6 mt-4">
                                {taskData.map((item) => (
                                    <div key={item.name} className="flex items-center">
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-xs md:text-sm text-gray-600">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Earnings Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <div className="p-4 md:p-6">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Monthly Earnings</h3>
                            <div className="h-48 md:h-64">
                                <ResponsiveContainer width="100%" height="100%" >
                                    <BarChart data={earningsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card>
                    <div className="p-4 md:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900">Recent Activity</h3>
                            <Button variant="ghost" size="sm">
                                View All
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {transactions.slice(0, 5).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between py-2 md:py-3 border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-lg ${transaction.type === 'task' ? 'bg-success-100' :
                                            transaction.type === 'referral' ? 'bg-accent-100' :
                                                transaction.type === 'withdrawal' ? 'bg-error-100' :
                                                    'bg-primary-100'
                                            }`}>
                                            {transaction.type === 'task' && <CheckSquare size={16} className="text-success-600" />}
                                            {transaction.type === 'referral' && <Users size={16} className="text-accent-600" />}
                                            {transaction.type === 'withdrawal' && <DollarSign size={16} className="text-error-600" />}
                                            {transaction.type === 'recharge' && <Calendar size={16} className="text-primary-600" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm md:text-base truncate">{transaction.description}</p>
                                            <p className="text-xs md:text-sm text-gray-500">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-success-600' : 'text-error-600'
                                            }`}>
                                            {transaction.amount > 0 ? '+' : ''}NPR {Math.abs(transaction.amount).toFixed(2)}
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
        </div>
    );
};