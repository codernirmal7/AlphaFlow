import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateUser } from '../store/slices/authSlice';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
    User,
    Mail,
    Phone,
    Camera,
    Shield,
    Calendar,
    Award,
    TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { transactions } = useSelector((state: RootState) => state.app);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUser(formData));
        setIsEditing(false);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock password change logic
        console.log('Password change attempt:', passwordData);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    const stats = [
        {
            title: 'Member Since',
            value: new Date(user?.joinDate || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
            }),
            icon: Calendar,
            color: 'bg-primary-500',
        },
        {
            title: 'Current Plan',
            value: user?.currentPlan || 'Basic',
            icon: Award,
            color: 'bg-accent-500',
        },
        {
            title: 'Total Purchases',
            value: transactions.filter(t => t.type === 'recharge').length.toString(),
            icon: TrendingUp,
            color: 'bg-success-500',
        },
    ];

    const purchaseHistory = transactions.filter(t => t.type === 'recharge').slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:block hidden">
                <h1 className="text-3xl font-heading font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
            </div>

            {/* Profile Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card>
                    <div className="p-4 md:p-8">
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div className="relative">
                                <img
                                    src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                                    alt={user?.name}
                                    className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
                                />
                                <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors">
                                    <Camera size={16} />
                                </button>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                                <p className="text-gray-600 mb-2 text-sm md:text-base">{user?.email}</p>
                                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                                        {user?.currentPlan} Plan
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        ID: {user?.referralCode}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <p className="text-sm text-gray-500 mb-1">Wallet Balance</p>
                                <p className="text-2xl md:text-3xl font-bold text-primary-600">
                                    ${user?.walletBalance?.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
                                </div>
                                <p className="text-gray-600 text-xs md:text-sm mb-1">{stat.title}</p>
                                <p className="text-lg md:text-xl font-bold text-gray-900 capitalize">{stat.value}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Profile Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Personal Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </Button>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <Input
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    icon={<User size={20} className="text-gray-400" />}
                                    disabled={!isEditing}
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    icon={<Mail size={20} className="text-gray-400" />}
                                    disabled={!isEditing}
                                />

                                <Input
                                    label="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    icon={<Phone size={20} className="text-gray-400" />}
                                    disabled={!isEditing}
                                />

                                {isEditing && (
                                    <Button type="submit" className="w-full">
                                        Save Changes
                                    </Button>
                                )}
                            </form>
                        </div>
                    </Card>
                </motion.div>

                {/* Security Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>

                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <Input
                                    label="Current Password"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    icon={<Shield size={20} className="text-gray-400" />}
                                    placeholder="Enter current password"
                                />

                                <Input
                                    label="New Password"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    icon={<Shield size={20} className="text-gray-400" />}
                                    placeholder="Enter new password"
                                />

                                <Input
                                    label="Confirm New Password"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    icon={<Shield size={20} className="text-gray-400" />}
                                    placeholder="Confirm new password"
                                />

                                <Button type="submit" variant="outline" className="w-full">
                                    Change Password
                                </Button>
                            </form>

                            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                                <p className="text-sm text-amber-800">
                                    🔒 <strong>Security Tip:</strong> Use a strong password with at least 8 characters,
                                    including uppercase, lowercase, numbers, and symbols.
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Purchase History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Purchase History</h3>

                        {purchaseHistory.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchaseHistory.map((transaction) => (
                                            <tr key={transaction.id} className="border-b border-gray-100">
                                                <td className="py-4 px-4 text-sm text-gray-900">{transaction.date}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900">{transaction.description}</td>
                                                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                                                    ${transaction.amount.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'completed' ? 'bg-success-100 text-success-800' :
                                                        transaction.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                                            'bg-error-100 text-error-800'
                                                        }`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No purchase history found</p>
                            </div>
                        )}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};