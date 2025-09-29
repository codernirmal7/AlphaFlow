import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateTaskStatus, addTransaction } from '../store/slices/appSlice';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tab } from '@headlessui/react';
import {
    CheckSquare,
    Clock,
    Play,
    MessageSquare,
    Smartphone,
    Database,
    Globe,
    Upload,
    DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Task } from '../types';
import { Modal } from '../components/ui/Modal';

const taskIcons: { [key: string]: any } = {
    CheckSquare,
    Play,
    MessageSquare,
    Smartphone,
    Database,
    Globe,
};

export const Tasks: React.FC = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state: RootState) => state.app);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [proof, setProof] = useState('');

    const tabs = ['All Tasks', 'Daily', 'Weekly', 'Completed'];

    const filteredTasks = tasks.filter(task => {
        switch (activeTab) {
            case 1: return task.type === 'daily';
            case 2: return task.type === 'weekly';
            case 3: return task.status === 'completed';
            default: return true;
        }
    });

    const handleCompleteTask = (task: Task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const handleSubmitProof = () => {
        if (selectedTask) {
            dispatch(updateTaskStatus({ taskId: selectedTask.id, status: 'completed' }));
            dispatch(addTransaction({
                id: Date.now().toString(),
                type: 'task',
                amount: selectedTask.reward,
                status: 'completed',
                date: new Date().toISOString().split('T')[0],
                description: `${selectedTask.title} completed`,
            }));
        }
        setShowModal(false);
        setProof('');
        setSelectedTask(null);
    };

    const getStatusBadge = (status: Task['status']) => {
        const styles = {
            pending: 'bg-gray-100 text-gray-800',
            in_progress: 'bg-accent-100 text-accent-800',
            completed: 'bg-success-100 text-success-800',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between md:block hidden">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">Tasks</h1>
                    <p className="text-gray-600 mt-1">Complete tasks to earn money</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Available Tasks</p>
                    <p className="text-2xl font-bold text-primary-600">{filteredTasks.length}</p>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden">
                <div className="text-center mb-4">
                    <p className="text-sm text-gray-500">Available Tasks</p>
                    <p className="text-2xl font-bold text-primary-600">{filteredTasks.length}</p>
                </div>
            </div>

            {/* Tabs */}
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                <Tab.List className="flex space-x-1 bg-gray-100 p-1 rounded-xl md:rounded-2xl overflow-x-auto">
                    {tabs.map((tab, index) => (
                        <Tab
                            key={tab}
                            className={({ selected }) => `
                flex-1 min-w-0 rounded-lg md:rounded-xl py-2 md:py-2.5 text-xs md:text-sm font-medium leading-5 transition-all whitespace-nowrap
                ${selected
                                    ? 'bg-white text-primary-700 shadow'
                                    : 'text-gray-600 hover:bg-white/70 hover:text-gray-900'
                                }
              `}
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {filteredTasks.map((task, index) => {
                                const IconComponent = taskIcons[task.icon] || CheckSquare;

                                return (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card>
                                            <div className="p-4 md:p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-2 md:p-3 bg-primary-100 rounded-xl md:rounded-2xl">
                                                        <IconComponent size={20} className="text-primary-600 md:w-6 md:h-6" />
                                                    </div>
                                                    {getStatusBadge(task.status)}
                                                </div>

                                                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{task.title}</h3>
                                                <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2">
                                                    {task.description}
                                                </p>

                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center text-success-600 font-semibold">
                                                        <DollarSign size={16} className="mr-1" />
                                                        <span className="text-sm md:text-base">${task.reward.toFixed(2)}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                        {task.category}
                                                    </span>
                                                </div>

                                                {task.deadline && (
                                                    <div className="flex items-center text-accent-600 text-xs md:text-sm mb-4">
                                                        <Clock size={16} className="mr-2" />
                                                        Deadline: {task.deadline}
                                                    </div>
                                                )}

                                                <Button
                                                    variant={task.status === 'completed' ? 'ghost' : 'primary'}
                                                    className="w-full text-sm md:text-base py-2 md:py-3"
                                                    disabled={task.status === 'completed'}
                                                    onClick={() => handleCompleteTask(task)}
                                                >
                                                    {task.status === 'completed' ? 'Completed' :
                                                        task.status === 'in_progress' ? 'Submit Proof' :
                                                            'Start Task'}
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            {/* Submit Proof Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Submit Task Proof"
                size="md"
            >
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-1">
                            {selectedTask?.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                            {selectedTask?.description}
                        </p>
                        <div className="flex items-center text-success-600 font-semibold">
                            <DollarSign size={16} className="mr-1" />
                            ${selectedTask?.reward.toFixed(2)}
                        </div>
                    </div>

                    <Input
                        label="Proof of Completion"
                        placeholder="Provide details about how you completed the task..."
                        value={proof}
                        onChange={(e) => setProof(e.target.value)}
                        icon={<Upload size={20} className="text-gray-400" />}
                    />

                    <div className="flex space-x-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={handleSubmitProof}
                        >
                            Submit & Complete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};