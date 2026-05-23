export interface Program {
    id: number;
    category: string;
    tags: string[];
    title: string;
    description: string;
    fullDescription: string;
    forWhom: string;
    image: string;
    images: string[];
    raised: number;
    goal: number;
    progress: number;
    donors: number;
    isUrgent: boolean;
    createdDate: string;
    fundAllocation: {
        percentage: number;
        label: string;
        detail: string;
    }[];
    stories: {
        id: number;
        name: string;
        age: number;
        role: string;
        image: string;
        text: string;
        result: string;
    }[];
}