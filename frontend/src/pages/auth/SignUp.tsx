import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { User, Mail, Phone, Lock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup - would typically dispatch action
        console.log('Signup attempt:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <TrendingUp size={32} className="text-primary-600" />
                        <h1 className="text-3xl font-heading font-bold text-gray-900 ml-2">EarnHub</h1>
                    </div>
                    <p className="text-gray-600">Create your account and start earning</p>
                </div>

                <Card>
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                icon={<User size={20} className="text-gray-400" />}
                                placeholder="Enter your full name"
                                required
                            />

                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                icon={<Mail size={20} className="text-gray-400" />}
                                placeholder="Enter your email"
                                required
                            />

                            <Input
                                label="Phone Number"
                                name="phone"
                                type='number'
                                value={formData.phone}
                                onChange={handleChange}
                                icon={<Phone size={20} className="text-gray-400" />}
                                placeholder="Enter your phone number"
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                icon={<Lock size={20} className="text-gray-400" />}
                                placeholder="Create a password"
                                required
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                icon={<Lock size={20} className="text-gray-400" />}
                                placeholder="Confirm your password"
                                required
                            />

                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/signin"
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};