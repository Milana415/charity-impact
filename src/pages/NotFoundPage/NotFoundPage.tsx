import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import './NotFoundPage.css';

export const NotFoundPage = () => {
    return (
        <>
            <Header />
            <main className="not-found-page">
                <div className="container">
                    <div className="not-found-content">
                        <div className="not-found-illustration">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="80" stroke="var(--accent)" strokeWidth="2" opacity="0.2" />
                                <circle cx="100" cy="100" r="60" stroke="var(--accent)" strokeWidth="2" opacity="0.4" />

                                <text x="100" y="90" textAnchor="middle" fontFamily="Geologica, sans-serif" fontSize="48" fontWeight="700" fill="var(--accent)">404</text>

                                <rect x="60" y="110" width="80" height="60" rx="8" stroke="var(--text-muted)" strokeWidth="2" fill="none" />
                                <line x1="70" y1="125" x2="130" y2="125" stroke="var(--text-muted)" strokeWidth="2" />
                                <line x1="70" y1="135" x2="120" y2="135" stroke="var(--text-muted)" strokeWidth="2" />
                                <line x1="70" y1="145" x2="110" y2="145" stroke="var(--text-muted)" strokeWidth="2" />

                                <circle cx="30" cy="40" r="4" fill="var(--accent)" opacity="0.6" />
                                <circle cx="170" cy="60" r="3" fill="var(--accent)" opacity="0.4" />
                                <circle cx="50" cy="170" r="5" fill="var(--accent)" opacity="0.5" />
                                <circle cx="160" cy="160" r="3" fill="var(--accent)" opacity="0.3" />
                            </svg>
                        </div>

                        <h1 className="not-found-title">Страница не найдена</h1>
                        <p className="not-found-description">
                            К сожалению, страница, которую вы ищете, не существует или была перемещена.
                        </p>

                        <div className="not-found-actions">
                            <Link to="/" className="btn-primary">
                                Вернуться на главную
                            </Link>
                            <Link to="/programs" className="btn-secondary">
                                Посмотреть программы
                            </Link>
                        </div>

                        <div className="not-found-suggestions">
                            <p>Возможно, вас заинтересует:</p>
                            <ul className="suggestions-list">
                                <li><Link to="/">Главная страница</Link></li>
                                <li><Link to="/about">О проекте</Link></li>
                                <li><Link to="/programs">Все программы</Link></li>
                                <li><Link to="/dashboard">Личный кабинет</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};