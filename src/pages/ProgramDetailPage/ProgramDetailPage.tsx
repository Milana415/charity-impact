import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSubscriptions } from '../../context/SubscriptionsContext';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { DonationModal } from '../../components/modals/DonationModal/DonationModal';
import { programs } from '../../data/programs';
import './ProgramDetailPage.css';

export const ProgramDetailPage = () => {
    const { id } = useParams();
    const program = programs.find(p => p.id === Number(id));

    const { user } = useAuth();
    const { addSubscription } = useSubscriptions();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [isMonthly, setIsMonthly] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);

    // Состояния для тултипа и модального окна
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);

    // Автослайд
    useEffect(() => {
        if (!program || program.images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % program.images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [program]);

    if (!program) {
        return (
            <>
                <Header />
                <main className="program-detail-page">
                    <div className="container">
                        <div className="not-found">
                            <h1>Программа не найдена</h1>
                            <Link to="/programs" className="btn-back">← Вернуться к программам</Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % program.images.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + program.images.length) % program.images.length);

    // Логика наведения на сердце
    const handleHeartHover = () => {
        if (!showTooltip) { // Не перезаписывать сообщение об успехе
            setTooltipMessage('Оформить ежемесячную подписку');
            setShowTooltip(true);
        }
    };

    const handleHeartLeave = () => {
        if (!showTooltip) {
            setShowTooltip(false);
        }
    };

    // Логика клика на сердце
    const handleSubscribe = () => {
        if (!user) {
            alert('Пожалуйста, войдите в систему для оформления подписки');
            return;
        }

        const success = addSubscription({
            programId: program.id,
            programTitle: program.title,
            category: program.category,
            description: program.description,
            image: program.images[0] || program.image,
            amount: 1000,
        });

        if (success) {
            setTooltipMessage(`Вы оформили подписку на «${program.title}»`);
            setShowTooltip(true);

            setTimeout(() => {
                setShowTooltip(false);
                setTooltipMessage('');
            }, 3000);
        } else {
            alert('У вас уже есть активная подписка на эту программу.');
        }
    };

    return (
        <>
            <Header />
            <main className="program-detail-page">
                <div className="container">
                    {/* Карусель */}
                    {program.images.length > 1 && (
                        <div className="program-carousel">
                            <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
                            <div className="carousel-track">
                                <img src={program.images[currentSlide]} alt={program.title} className="carousel-image" />
                            </div>
                            <button className="carousel-btn next" onClick={nextSlide}>›</button>
                            <div className="carousel-dots">
                                {program.images.map((_, index) => (
                                    <button key={index} className={`dot ${currentSlide === index ? 'active' : ''}`} onClick={() => setCurrentSlide(index)} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Хлебные крошки */}
                    <div className="breadcrumbs">
                        <Link to="/">Главная</Link> <span>/</span>
                        <Link to="/programs">Программы</Link> <span>/</span>
                        <span className="current">{program.title}</span>
                    </div>

                    <h1 className="program-title">{program.title}</h1>

                    <div className="program-layout">
                        {/* Левая колонка: Описание */}
                        <div className="program-content">
                            <p className="program-intro">{program.fullDescription.split('\n')[0]}</p>
                            {program.fullDescription.split('\n').slice(1).join('\n').split('\n\n').map((paragraph, index) => (
                                <p key={index} className="program-text">{paragraph}</p>
                            ))}
                            <h3 className="section-heading">Для кого?</h3>
                            <p className="program-text">{program.forWhom}</p>
                            <h3 className="section-heading">Как будут использованы средства?</h3>
                            <div className="fund-allocation">
                                {program.fundAllocation.map((item, index) => (
                                    <div key={index} className="allocation-item">
                                        <div className="allocation-percentage">{item.percentage}%</div>
                                        <div className="allocation-info"><h4>{item.label}</h4><p>{item.detail}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Правая колонка: Форма (Новый дизайн) */}
                        <aside className="donation-sidebar">
                            <div className="donation-card">
                                {/* Прогресс */}
                                <div className="donation-progress">
                                    <div className="progress-bar-wrapper">
                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill" style={{ width: `${program.progress}%` }} />
                                        </div>
                                        <span className="progress-percent">{program.progress}%</span>
                                    </div>
                                    <div className="progress-stats">
                                        <span className="label">Собрано: <strong>{program.raised.toLocaleString()} ₽</strong></span>
                                        <span className="divider">/</span>
                                        <span className="label">Цель: <strong>{program.goal.toLocaleString()} ₽</strong></span>
                                    </div>
                                </div>

                                <div className="donors-count">Доноров: <strong>{program.donors}</strong></div>
                                <div className="divider-line" />

                                {/* Выбор суммы */}
                                <div className="donation-section">
                                    <p className="donation-label">Выберите сумму для пожертвования:</p>
                                    <div className="amount-buttons">
                                        {[500, 1000, 3000].map(amount => (
                                            <button
                                                key={amount}
                                                className={`amount-pill ${selectedAmount === amount ? 'active' : ''}`}
                                                onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                                            >
                                                {amount} ₽
                                            </button>
                                        ))}
                                    </div>

                                    <div className="custom-amount-row">
                                        <span className="custom-label">Или введите свою:</span>
                                        <div className="custom-input-wrapper">
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={customAmount}
                                                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                                            />
                                            <span className="currency">₽</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Тип пожертвования */}
                                <div className="donation-type">
                                    <label className="radio-option">
                                        <input type="radio" name="donationType" checked={!isMonthly} onChange={() => setIsMonthly(false)} />
                                        <span>Разовое</span>
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio" name="donationType" checked={isMonthly} onChange={() => setIsMonthly(true)} />
                                        <span>Ежемесячное</span>
                                    </label>
                                </div>

                                <label className="checkbox-option">
                                    <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                                    <span>Анонимно</span>
                                </label>

                                {/* Кнопки действий */}
                                <div className="action-row">
                                    <button className="btn-donate-now" onClick={() => setIsDonationModalOpen(true)}>
                                        Помочь сейчас
                                    </button>

                                    <div
                                        className="heart-wrapper"
                                        onMouseEnter={handleHeartHover}
                                        onMouseLeave={handleHeartLeave}
                                    >
                                        <button className="btn-heart" onClick={handleSubscribe}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E53E3E" stroke="#E53E3E" strokeWidth="2">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </button>

                                        {/* Тултип */}
                                        {showTooltip && tooltipMessage && (
                                            <div className="tooltip">
                                                {tooltipMessage}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Истории */}
                    {program.stories.length > 0 && (
                        <section className="stories-section">
                            <h2 className="section-title">Наши истории</h2>
                            <div className="stories-grid">
                                {program.stories.map(story => (
                                    <div key={story.id} className="story-card-detail">
                                        <div className="story-header">
                                            <img src={story.image} alt={story.name} className="story-avatar" />
                                            <div className="story-info">
                                                <h3>{story.name}, {story.age} {story.age === 1 ? 'год' : story.age < 5 ? 'года' : 'лет'}</h3>
                                                <span className="story-role">{story.role}</span>
                                            </div>
                                        </div>
                                        <p className="story-text">{story.text}</p>
                                        <div className="story-result"><strong>Результат:</strong> {story.result}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
            <DonationModal isOpen={isDonationModalOpen} onClose={() => setIsDonationModalOpen(false)} programId={program.id} />
        </>
    );
};