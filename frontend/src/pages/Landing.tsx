import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Shield,
    Zap,
    Users,
    CheckCircle,
    Star,
    ArrowRight,
} from 'lucide-react';
import { plans } from '../constant';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const features = [
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Bank-grade security with guaranteed payments',
    },
    {
        icon: Zap,
        title: 'Fast Payments',
        description: 'Get paid within 24 hours of task completion',
    },
    {
        icon: Users,
        title: 'Community Support',
        description: '24/7 support from our dedicated team',
    },
];

export function Landing() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold font-heading text-gray-900">AlphaFlow</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/auth/signin">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/auth/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-6 py-20 bg-gradient-to-br from-primary-50 to-accent-50">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge className="mb-6">🎉 Join 10,000+ Happy Earners</Badge>
                        <h1 className="text-5xl font-bold font-heading text-gray-900 mb-6">
                            Earn by Completing
                            <br />
                            <span className="text-primary-600">Simple Tasks</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Transform your free time into income. Complete surveys, reviews, and micro-tasks
                            to earn money from the comfort of your home.
                        </p>

                        <div className="flex items-center justify-center space-x-4">
                            <Link to="/auth/signup">
                                <Button size="lg" className="text-base px-8">
                                    Sign Up Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="lg" className="text-base px-8">
                                Learn More
                            </Button>
                        </div>

                        <div className="flex items-center justify-center space-x-8 mt-12">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">$50K+</div>
                                <div className="text-sm text-gray-600">Earned by users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">10,000+</div>
                                <div className="text-sm text-gray-600">Active users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                                <div className="flex items-center justify-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Plans Section */}
            <section className="px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                            Choose Your Earning Plan
                        </h2>
                        <p className="text-lg text-gray-600">
                            Select the plan that fits your earning goals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className={`relative ${plan.popular ? 'border-primary-200 shadow-lg' : ''}`}>
                                    {plan.popular && (
                                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            Most Popular
                                        </Badge>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="text-center">
                                            <div className="text-2xl font-bold">{plan.displayName}</div>
                                            <div className="text-3xl font-bold text-primary-600 mt-2">
                                                ${plan.price}
                                                <span className="text-sm text-gray-600 font-normal">/month</span>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 text-center">
                                            <div className="text-sm text-gray-600 mb-4">
                                                Earn up to <span className="font-semibold text-accent-600">
                                                    ${plan.earningPotential}/month
                                                </span>
                                            </div>
                                            <Link to="/auth/signup">
                                                <Button
                                                    className="w-full"
                                                    variant={plan.popular ? 'primary' : 'outline'}
                                                >
                                                    Get Started
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                            Why Choose AlphaFlow?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join thousands who trust us for their online earning journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Card className="text-center h-full">
                                    <CardContent className="pt-6">
                                        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <feature.icon className="h-8 w-8 text-primary-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold font-heading text-gray-900 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white px-6 py-12">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold font-heading">AlphaFlow</span>
                    </div>
                    <div className="flex items-center justify-center space-x-8 text-gray-400">
                        <Link to="/about" className="hover:text-white">About</Link>
                        <Link to="/terms" className="hover:text-white">Terms</Link>
                        <Link to="/privacy" className="hover:text-white">Privacy</Link>
                        <Link to="/support" className="hover:text-white">Support</Link>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
                        © {new Date().getFullYear()} AlphaFlow. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}