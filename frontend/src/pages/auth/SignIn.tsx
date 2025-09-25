import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { clearError, mockLogin } from '../../store/slices/authSlice';
import { Input } from '../../components/ui/Input';

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState('demo@earnhub.com');
    const [password, setPassword] = useState('demo123');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        dispatch(mockLogin(email, password) as any);
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
                        <h1 className="text-3xl font-heading font-bold text-gray-900 ml-2">AlphaFlow</h1>
                    </div>
                    <p className="text-gray-600">Sign in to start earning with tasks</p>
                </div>

                <Card>
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<Mail size={20} className="text-gray-400" />}
                                placeholder="Enter your email"
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock size={20} className="text-gray-400" />}
                                placeholder="Enter your password"
                                required
                            />

                            {error && (
                                <div className="text-error-600 text-sm bg-error-50 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                loading={loading}
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-6 text-center space-y-2">
                            <Link
                                to="/forgot-password"
                                className="text-primary-600 hover:text-primary-700 text-sm"
                            >
                                Forgot your password?
                            </Link>
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>


                </Card>
            </motion.div>
        </div>
    );
};