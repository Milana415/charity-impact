import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    register: (userData: RegisterData) => Promise<boolean>;
    login: (phone: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const register = async (userData: RegisterData): Promise<boolean> => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            const existingUser = users.find((u: any) => u.phone === userData.phone);
            if (existingUser) {
                return false;
            }

            const newUser = {
                id: Date.now(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const login = async (phone: string, password: string): Promise<boolean> => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            const foundUser = users.find((u: any) => u.phone === phone && u.password === password);

            if (foundUser) {
                const { password, ...userWithoutPassword } = foundUser;
                setUser(userWithoutPassword);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                return true;
            }

            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            register,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};