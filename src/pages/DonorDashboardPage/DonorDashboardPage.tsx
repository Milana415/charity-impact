import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSubscriptions } from '../../context/SubscriptionsContext';
import { useDonations } from '../../context/DonationContext';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { ProfileSettingsModal } from '../../components/modals/ProfileSettingsModal/ProfileSettingsModal';
import './DonorDashboardPage.css';

export const DonorDashboardPage = () => {
    const { user, logout } = useAuth();
    const { getUserSubscriptions, cancelSubscription } = useSubscriptions();
    const { getUserDonations, getTotalDonated, getSupportedProgramsCount } = useDonations();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showAllDonations, setShowAllDonations] = useState(false);

    if (!user) {
        return (
            <>
                <Header />
                <main className="donor-dashboard">
                    <div className="container">
                        <div className="not-authenticated">
                            <h2>Пожалуйста, войдите в систему</h2>
                            <p>Чтобы увидеть историю пожертвований и управлять подписками, необходимо авторизоваться.</p>
                            <Link to="/" className="btn-back">Вернуться на главную</Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const userDonations = getUserDonations(user.id);
    const userSubscriptions = getUserSubscriptions(user.id);

    const totalDonated = getTotalDonated(user.id);
    const supportedPrograms = getSupportedProgramsCount(user.id);
    const livesSaved = Math.floor(userDonations.length / 2);

    const visibleDonations = showAllDonations ? userDonations : userDonations.slice(0, 3);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU');
    };

    return (
        <>
            <Header />
            <main className="donor-dashboard">
                <div className="container">
                    <div className="dashboard-header">
                        <div>
                            <h1 className="page-title">Личный кабинет донора</h1>
                            <p className="page-description">
                                Здесь вы можете увидеть историю пожертвований, настроить получение отчётов и обновить свои данные.
                            </p>
                        </div>
                        <div className="header-actions-right">
                            <button className="btn-logout" onClick={logout}>Выйти</button>
                            <button className="btn-settings" onClick={() => setIsSettingsOpen(true)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                Настройки
                            </button>
                        </div>
                    </div>

                    <section className="stats-section">
                        <h2 className="section-title">Общая статистика</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">ОБЩАЯ СУММА</span>
                                <span className="stat-value">{totalDonated.toLocaleString()} ₽</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">ПОДДЕРЖАННЫХ ПРОГРАММ</span>
                                <span className="stat-value">{supportedPrograms}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">ПОЖЕРТВОВАНИЙ</span>
                                <span className="stat-value">{userDonations.length}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">СПАСЕННЫХ ЖИЗНЕЙ</span>
                                <span className="stat-value">{livesSaved}</span>
                            </div>
                        </div>
                    </section>

                    <section className="donations-section">
                        <h2 className="section-title">История пожертвований</h2>

                        {userDonations.length > 0 ? (
                            <>
                                <div className="donations-table-wrapper">
                                    <table className="donations-table">
                                        <thead>
                                            <tr>
                                                <th>ДАТА</th>
                                                <th>ПРОГРАММА</th>
                                                <th>СУММА</th>
                                                <th>СТАТУС</th>
                                                <th>ДОКУМЕНТЫ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {visibleDonations.map(donation => (
                                                <tr key={donation.id}>
                                                    <td className="date-cell">{formatDate(donation.date)}</td>
                                                    <td className="program-cell">
                                                        {donation.programName}
                                                        {donation.isMonthly && <span className="monthly-badge"> (ежемесячно)</span>}
                                                    </td>
                                                    <td className="amount-cell">{donation.amount.toLocaleString()} ₽</td>
                                                    <td>
                                                        <span className={`status-badge ${donation.status.toLowerCase().replace(' ', '-')}`}>
                                                            {donation.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <a href="#" className="receipt-link" onClick={(e) => {
                                                            e.preventDefault();
                                                            alert('Квитанция будет сформирована и отправлена на вашу почту');
                                                        }}>
                                                            Квитанция
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {userDonations.length > 3 && (
                                    <button
                                        className="btn-show-more"
                                        onClick={() => setShowAllDonations(!showAllDonations)}
                                    >
                                        {showAllDonations ? 'Скрыть' : 'Смотреть больше'} ↓
                                    </button>
                                )}
                            </>
                        ) : (
                            <div className="no-donations">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="1.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <h3>У вас пока нет пожертвований</h3>
                                <p>Выберите программу помощи и сделайте первое пожертвование</p>
                                <Link to="/programs" className="btn-back">Перейти к программам</Link>
                            </div>
                        )}
                    </section>

                    {userSubscriptions.length > 0 && (
                        <section className="subscriptions-section">
                            <h2 className="section-title">Регулярные подписки</h2>
                            <div className="subscriptions-grid">
                                {userSubscriptions.map(subscription => (
                                    <div key={subscription.id} className="subscription-card">
                                        <img src={subscription.image} alt={subscription.programTitle} className="subscription-image" />
                                        <div className="subscription-content">
                                            <span className="subscription-category">{subscription.category}</span>
                                            <h3>{subscription.programTitle}</h3>
                                            <p>{subscription.description}</p>
                                            <div className="subscription-amount">
                                                Пожертвование: <strong>{subscription.amount.toLocaleString()} ₽</strong>
                                            </div>
                                            <div className="subscription-actions">
                                                <Link to={`/program/${subscription.programId}`} className="btn-details">Подробнее</Link>
                                                <button
                                                    className="btn-cancel"
                                                    onClick={() => {
                                                        if (confirm('Вы уверены, что хотите отменить подписку?')) {
                                                            cancelSubscription(subscription.id);
                                                        }
                                                    }}
                                                >
                                                    Отменить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
            <ProfileSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
};