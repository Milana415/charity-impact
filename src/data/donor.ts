import type { Donation, Subscription, DonorStats } from '../types/donor';

export const donorStats: DonorStats = {
    totalAmount: 130500,
    supportedPrograms: 15,
    totalDonations: 65,
    savedLives: 34,
};

export const donations: Donation[] = [
    {
        id: 1,
        date: '10.01.2026',
        program: 'Общая поддержка фонда',
        amount: 13000,
        status: 'Получено',
        receiptUrl: '#',
    },
    {
        id: 2,
        date: '31.12.2025',
        program: 'Программа «Здоровое сердце»',
        amount: 18500,
        status: 'Получено',
        receiptUrl: '#',
    },
    {
        id: 3,
        date: '12.12.2025',
        program: 'Общая поддержка фонда',
        amount: 25000,
        status: 'Получено',
        receiptUrl: '#',
    },
    {
        id: 4,
        date: '01.12.2025',
        program: 'Спорт без границ',
        amount: 5000,
        status: 'Получено',
        receiptUrl: '#',
    },
    {
        id: 5,
        date: '15.11.2025',
        program: 'Чистая вода в каждый дом',
        amount: 10000,
        status: 'Получено',
        receiptUrl: '#',
    },
];

export const subscriptions: Subscription[] = [
    {
        id: 1,
        programId: 1,
        programTitle: 'Они умеют любить, как никто другой.',
        category: 'Животные',
        description: 'Кошки из приюта — это самые преданные друзья, которые знают цену дому и уюту.',
        image: '/images/programs/cat.jpg',
        amount: 5000,
    },
    {
        id: 2,
        programId: 6,
        programTitle: '«Мир на ощупь»',
        category: 'Помощь детям',
        description: 'Закупка специальных учебников со шрифтом Брайля и обучающих гаджетов для слабовидящих детей.',
        image: '/images/programs/braille.jpg',
        amount: 3000,
    },
];