import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthModal } from '../../modals/AuthModal/AuthModal';
import { useTheme } from '../../../context/ThemeContext';
import './Header.css';

export const Header = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleSupportClick = () => {
        navigate('/programs');
    };

    return (
        <>
            <header className="header">
                <div className="container header__container">
                    <Link to="/" className="logo">
                        <img src="/logo.svg" alt="Charity Impact" />
                    </Link>

                    <nav className="nav">
                        <Link to="/">Главная</Link>
                        <Link to="/about">О проекте</Link>
                        <Link to="/programs">Программы</Link>
                        <Link to="/contacts">Контакты</Link>
                    </nav>

                    <div className="header-actions">
                        {user ? (
                            <Link to="/dashboard" className="icon-btn" aria-label="Личный кабинет">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M20 21a8 8 0 1 0-16 0" />
                                </svg>
                            </Link>
                        ) : (
                            <button
                                className="btn-login"
                                onClick={() => setIsAuthModalOpen(true)}
                            >
                                Войти
                            </button>
                        )}

                        <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Переключить тему">
                            {theme === 'light' ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="search-bar">
                    <div className="container">
                        <form className="search-bar__content" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Поиск по сайту"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </button>
                            <button type="button" className="btn-donate" onClick={handleSupportClick}>
                                Поддержать
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};