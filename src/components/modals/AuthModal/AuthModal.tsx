import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './AuthModal.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });

    const { login, register } = useAuth();

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const success = await login(formData.phone, formData.password);
            if (success) {
                onClose();
                setFormData({ firstName: '', lastName: '', phone: '', email: '', password: '' });
            } else {
                setError('Неверный номер телефона или пароль');
            }
        } else {
            if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.password) {
                setError('Заполните все поля');
                return;
            }

            const success = await register(formData);
            if (success) {
                setIsLogin(true);
                setFormData({ ...formData, password: '' });
            } else {
                setError('Пользователь с таким номером телефона уже существует');
            }
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>✕</button>

                <h2 className="auth-modal-title">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Имя</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Александр"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Фамилия</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Иванов"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {isLogin ? (
                        <div className="form-row single">
                            <div className="form-group">
                                <label>Номер телефона</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+7 (900) 000-00-00"
                                />
                            </div>
                            <div className="form-group">
                                <label>Пароль</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Скрыть' : 'Показать'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Пароль</label>
                                    <div className="password-wrapper">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? 'Скрыть' : 'Показать'}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Номер телефона</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+7 (900) 000-00-00"
                                    />
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Почта</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="charityimpact@gmail.com"
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="auth-submit-btn">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className="auth-switch">
                    {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                    <button onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                        setFormData({ firstName: '', lastName: '', phone: '', email: '', password: '' });
                    }}>
                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </div>
            </div>
        </div>
    );
};