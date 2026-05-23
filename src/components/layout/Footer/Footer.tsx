import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
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
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer-top">
                    <div className="footer-logo">
                        <img src="/logo.svg" alt="Charity Impact" />
                    </div>

                    <form className="footer-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Поиск по сайту"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        <button type="button" className="btn-donate" onClick={handleSupportClick}>Поддержать</button>
                    </form>
                </div>

                <div className="footer-menu">
                    <div className="footer-nav">
                        <div className="footer-nav-column">
                            <Link to="/about">О проекте</Link>
                            <Link to="/programs">Программы</Link>
                        </div>
                        <div className="footer-nav-column">
                            <Link to="/dashboard">Личный кабинет</Link>
                            <Link to="/contacts">Контакты</Link>
                        </div>
                        <div className="footer-nav-column">
                        </div>
                    </div>

                    <div className="footer-social">
                        <p>Также можете нас найти:</p>
                        <div className="social-icons">
                            <a href="#" aria-label="VK" className="social-link">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.785 16.238s.285-.031.431-.192c.134-.147.13-.423.13-.423s-.02-1.295.581-1.485c.593-.187 1.356 1.25 2.17 1.804.614.422 1.08.33 1.08.33l2.177-.03s1.14-.072.598-.97c-.045-.074-.318-.657-1.637-1.858-1.378-1.254-1.19-1.052.465-3.228 1.01-1.323 1.413-2.133 1.288-2.483-.12-.334-.865-.246-.865-.246l-2.472.015s-.184-.026-.32.057c-.133.081-.22.268-.22.268s-.395 1.05-.923 1.945c-1.112 1.88-1.555 1.981-1.736 1.865-.423-.272-.318-1.09-.318-1.668c0-1.806.274-2.557-.533-2.747-.268-.063-.465-.105-1.153-.112-.883-.009-1.632.003-2.053.211-.281.139-.498.45-.366.468.163.022.533.1.73.363.256.337.247 1.094.247 1.094s.148 2.144-.345 2.41c-.339.184-.805-.192-1.805-1.872-.513-.86-.9-1.813-.9-1.813s-.075-.184-.21-.282c-.163-.12-.388-.158-.388-.158l-2.345.015s-.353.01-.483.163c-.117.137-.01.422-.01.422s1.835 4.275 3.916 6.43c1.905 1.974 4.078 1.845 4.078 1.845h.986z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Telegram" className="social-link">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>© 2026. CharityImpact. Все права защищены</p>
                    </div>

                    <div className="footer-legal">
                        <Link to="/privacy">Политика конфиденциальности</Link>
                        <Link to="/terms">Пользовательское соглашение</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};