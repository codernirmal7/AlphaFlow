import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
    Users,
    Copy,
    Share2,
    DollarSign,
    Award,
    TrendingUp,
    UserPlus,
    Check,
    ChevronDown,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Referrals: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { referrals } = useSelector((state: RootState) => state.app);
    const [copied, setCopied] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    const referralLink = `https://earnhub.com/invite/${user?.referralCode}`;

    const totalReferralEarnings = referrals.reduce((sum, ref) => sum + ref.earnings * 0.1, 0);
    const activeReferrals = referrals.filter(ref => ref.status === 'active').length;

    const stats = [
        {
            title: 'Total Referrals',
            value: user?.totalReferrals?.toString() || '0',
            icon: Users,
            color: 'bg-primary-500',
        },
        {
            title: 'Active Referrals',
            value: activeReferrals.toString(),
            icon: UserPlus,
            color: 'bg-success-500',
        },
        {
            title: 'Referral Earnings',
            value: `$${totalReferralEarnings.toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-accent-500',
        },
        {
            title: 'This Month Bonus',
            value: '$127.50',
            icon: Award,
            color: 'bg-purple-500',
        },
    ];

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleNode = (nodeId: string) => {
        const newExpanded = new Set(expandedNodes);
        if (newExpanded.has(nodeId)) {
            newExpanded.delete(nodeId);
        } else {
            newExpanded.add(nodeId);
        }
        setExpandedNodes(newExpanded);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between md:block ">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">Referrals</h1>
                    <p className="text-gray-600 mt-1">Invite friends and earn commission from their activities</p>
                </div>
                <div className="text-right md:block hidden">
                    <p className="text-sm text-gray-500">Your Referral Code</p>
                    <p className="text-2xl font-bold text-primary-600">{user?.referralCode}</p>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden text-center">
                <p className="text-sm text-gray-500">Your Referral Code</p>
                <p className="text-xl font-bold text-primary-600">{user?.referralCode}</p>
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
                                </div>
                                <p className="text-gray-600 text-xs md:text-sm mb-1 truncate">{stat.title}</p>
                                <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Referral Link */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card>
                    <div className="p-4 md:p-6">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Share Your Referral Link</h3>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                            <Input
                                value={referralLink}
                                readOnly
                                className="flex-1"
                            />
                            <div className="flex space-x-3">
                                <Button onClick={copyReferralLink} variant="outline" className="flex-1 md:flex-none">
                                    {copied ? (
                                        <>
                                            <Check size={18} className="mr-2" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} className="mr-2" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                                <Button className="flex-1 md:flex-none">
                                    <Share2 size={18} className="mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 p-3 md:p-4 bg-primary-50 rounded-xl">
                            <p className="text-xs md:text-sm text-primary-800">
                                💰 <strong>Earn 10% commission</strong> on all your referrals' earnings!
                                Plus get a $25 bonus for each successful referral.
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Referral Tree and List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Referral Tree */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Network</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-xl">
                                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {user?.name?.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">You</p>
                                        <p className="text-sm text-gray-600">{user?.totalReferrals} referrals</p>
                                    </div>
                                </div>

                                {referrals.slice(0, 5).map((referral) => (
                                    <div key={referral.id} className="ml-6">
                                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl">
                                            <button
                                                onClick={() => toggleNode(referral.id)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                {expandedNodes.has(referral.id) ? (
                                                    <ChevronDown size={16} />
                                                ) : (
                                                    <ChevronRight size={16} />
                                                )}
                                            </button>
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 font-medium text-xs">
                                                    {referral.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 text-sm">{referral.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    ${referral.earnings.toFixed(2)} earned
                                                </p>
                                            </div>
                                            <span className={`w-2 h-2 rounded-full ${referral.status === 'active' ? 'bg-success-500' : 'bg-gray-400'
                                                }`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Referral Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
                            <div className="space-y-4">
                                {[...referrals] // clone the array first
                                    .sort((a, b) => b.earnings - a.earnings)
                                    .slice(0, 6)
                                    .map((referral, index) => (
                                        <div key={referral.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                                    <span className="text-sm font-medium text-gray-600">
                                                        #{index + 1}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{referral.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        Joined {referral.joinDate}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    ${referral.earnings.toFixed(2)}
                                                </p>
                                                <p className="text-xs text-success-600">
                                                    +${(referral.earnings * 0.1).toFixed(2)} for you
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Commission Structure */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">How Referral Commissions Work</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserPlus size={32} className="text-primary-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Invite Friends</h4>
                                <p className="text-sm text-gray-600">
                                    Share your unique referral link with friends and family.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award size={32} className="text-success-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">They Sign Up</h4>
                                <p className="text-sm text-gray-600">
                                    Get $25 bonus when they complete their first task successfully.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp size={32} className="text-accent-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Earn Forever</h4>
                                <p className="text-sm text-gray-600">
                                    Earn 10% commission on all their future task earnings.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-accent-50 rounded-xl">
                            <p className="text-sm text-accent-800 text-center">
                                🚀 <strong>Special Promotion:</strong> Refer 5 friends this month and get a
                                $100 bonus! Current progress: {activeReferrals}/5
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};