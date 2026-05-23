import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Donation {
    id: number;
    userId: number;
    programId: number;
    programName: string;
    amount: number;
    date: string;
    status: 'Получено' | 'В обработке' | 'Отклонено';
    isMonthly: boolean;
    isAnonymous: boolean;
    receiptUrl?: string;
}

interface DonationContextType {
    donations: Donation[];
    addDonation: (donation: Omit<Donation, 'id' | 'date' | 'status' | 'userId'>) => boolean;
    getUserDonations: (userId: number) => Donation[];
    getTotalDonated: (userId: number) => number;
    getSupportedProgramsCount: (userId: number) => number;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
        const savedDonations = localStorage.getItem('donations');
        if (savedDonations) {
            setDonations(JSON.parse(savedDonations));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('donations', JSON.stringify(donations));
    }, [donations]);

    const addDonation = (donation: Omit<Donation, 'id' | 'date' | 'status' | 'userId'>): boolean => {
        if (!user) return false;

        const newDonation: Donation = {
            ...donation,
            id: Date.now(),
            userId: user.id,
            date: new Date().toISOString(),
            status: 'Получено',
        };

        setDonations(prev => [...prev, newDonation]);
        return true;
    };

    const getUserDonations = (userId: number) => {
        return donations.filter(d => d.userId === userId).sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    };

    const getTotalDonated = (userId: number) => {
        return getUserDonations(userId).reduce((sum, d) => sum + d.amount, 0);
    };

    const getSupportedProgramsCount = (userId: number) => {
        const uniquePrograms = new Set(getUserDonations(userId).map(d => d.programId));
        return uniquePrograms.size;
    };

    return (
        <DonationContext.Provider value={{
            donations,
            addDonation,
            getUserDonations,
            getTotalDonated,
            getSupportedProgramsCount
        }}>
            {children}
        </DonationContext.Provider>
    );
};

export const useDonations = () => {
    const context = useContext(DonationContext);
    if (!context) {
        throw new Error('useDonations must be used within a DonationProvider');
    }
    return context;
};