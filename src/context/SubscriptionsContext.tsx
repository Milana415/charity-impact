import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Subscription {
    id: number;
    userId: number;
    programId: number;
    programTitle: string;
    category: string;
    description: string;
    image: string;
    amount: number;
    isActive: boolean;
    startDate: string;
}

interface SubscriptionsContextType {
    subscriptions: Subscription[];
    addSubscription: (subscription: Omit<Subscription, 'id' | 'userId' | 'startDate' | 'isActive'>) => boolean;
    cancelSubscription: (id: number) => void;
    getUserSubscriptions: (userId: number) => Subscription[];
}

const SubscriptionsContext = createContext<SubscriptionsContextType | undefined>(undefined);

export const SubscriptionsProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    useEffect(() => {
        const savedSubscriptions = localStorage.getItem('subscriptions');
        if (savedSubscriptions) {
            setSubscriptions(JSON.parse(savedSubscriptions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }, [subscriptions]);

    const addSubscription = (subscription: Omit<Subscription, 'id' | 'userId' | 'startDate' | 'isActive'>): boolean => {
        if (!user) return false;

        const existingSubscription = subscriptions.find(
            sub => sub.programId === subscription.programId && sub.userId === user.id && sub.isActive
        );

        if (existingSubscription) {
            console.warn('Подписка на эту программу уже оформлена');
            return false;
        }

        const newSubscription: Subscription = {
            ...subscription,
            id: Date.now(),
            userId: user.id,
            startDate: new Date().toISOString(),
            isActive: true,
        };

        setSubscriptions(prev => [...prev, newSubscription]);
        return true;
    };

    const cancelSubscription = (id: number) => {
        setSubscriptions(prev =>
            prev.map(sub =>
                sub.id === id ? { ...sub, isActive: false } : sub
            )
        );
    };

    const getUserSubscriptions = (userId: number) => {
        return subscriptions.filter(sub => sub.userId === userId && sub.isActive);
    };

    return (
        <SubscriptionsContext.Provider value={{
            subscriptions,
            addSubscription,
            cancelSubscription,
            getUserSubscriptions
        }}>
            {children}
        </SubscriptionsContext.Provider>
    );
};

export const useSubscriptions = () => {
    const context = useContext(SubscriptionsContext);
    if (!context) {
        throw new Error('useSubscriptions must be used within a SubscriptionsProvider');
    }
    return context;
};