export interface Donation {
    id: number;
    date: string;
    program: string;
    amount: number;
    status: 'Получено' | 'В обработке' | 'Отклонено';
    receiptUrl?: string;
}

export interface Subscription {
    id: number;
    programId: number;
    programTitle: string;
    category: string;
    description: string;
    image: string;
    amount: number;
}

export interface DonorStats {
    totalAmount: number;
    supportedPrograms: number;
    totalDonations: number;
    savedLives: number;
}