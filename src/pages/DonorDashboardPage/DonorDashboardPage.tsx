import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSubscriptions } from '../../context/SubscriptionsContext';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { ProfileSettingsModal } from '../../components/modals/ProfileSettingsModal/ProfileSettingsModal';
import { donorStats, donations } from '../../data/donor';
import './DonorDashboardPage.css';

export const DonorDashboardPage = () => {
    const { user, logout } = useAuth();
    const { getUserSubscriptions, cancelSubscription } = useSubscriptions();
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
                            <p>Чтобы увидеть историю пожертвований и подписок, необходимо авторизоваться</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const userSubscriptions = getUserSubscriptions(user.id);
    const visibleDonations = showAllDonations ? donations : donations.slice(0, 3);

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
                            <button className="btn-logout" onClick={logout}>
                                Выйти
                            </button>
                            <button className="btn-settings" onClick={() => setIsSettingsOpen(true)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                Настройки
                            </button>
                        </div>
                    </div>

                    {/* Статистика */}
                    <section className="stats-section">
                        <h2 className="section-title">Общая статистика</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">общая сумма</span>
                                <span className="stat-value">{donorStats.totalAmount.toLocaleString()} ₽</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">поддержанных программ</span>
                                <span className="stat-value">{donorStats.supportedPrograms}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">пожертвований</span>
                                <span className="stat-value">{donorStats.totalDonations}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">спасенных жизней</span>
                                <span className="stat-value">{donorStats.savedLives}</span>
                            </div>
                        </div>
                    </section>

                    {/* История пожертвований */}
                    <section className="donations-section">
                        <h2 className="section-title">История пожертвований</h2>
                        <div className="donations-table-wrapper">
                            <table className="donations-table">
                                <thead>
                                    <tr>
                                        <th>Дата</th>
                                        <th>Программа</th>
                                        <th>Сумма</th>
                                        <th>Статус</th>
                                        <th>Документы</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleDonations.map(donation => (
                                        <tr key={donation.id}>
                                            <td className="date-cell">{donation.date}</td>
                                            <td className="program-cell">{donation.program}</td>
                                            <td className="amount-cell">{donation.amount.toLocaleString()} ₽</td>
                                            <td>
                                                <span className="status-badge">{donation.status}</span>
                                            </td>
                                            <td>
                                                {donation.receiptUrl && (
                                                    <a href={donation.receiptUrl} className="receipt-link">
                                                        Квитанция
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {donations.length > 3 && (
                            <button className="btn-show-more" onClick={() => setShowAllDonations(!showAllDonations)}>
                                {showAllDonations ? 'Скрыть ↑' : 'Смотреть больше ↓'} 
                            </button>
                        )}
                    </section>

                    {/* Регулярные подписки */}
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
                                                <button className="btn-details">Подробнее</button>
                                                <button
                                                    className="btn-cancel"
                                                    onClick={() => cancelSubscription(subscription.id)}
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