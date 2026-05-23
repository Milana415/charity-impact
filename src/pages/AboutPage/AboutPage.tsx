import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { programs } from '../../data/programs';
import './AboutPage.css';

export const AboutPage = () => {
    return (
        <>
            <Header />
            <main className="about-page">
                <div className="container">
                    <div className="about-layout">
                        {/* Левая колонка - основной контент */}
                        <div className="about-main">
                            <div className="about-hero-image">
                                <img src="/images/about/hands.jpg" alt="Руки держат бумажные фигурки людей" />
                            </div>

                            <div className="about-content">
                                <p className="about-intro">
                                    <strong>CharityImpact</strong> — это специализированное решение на базе платформы Webasyst, созданное для тех, кто меняет мир к лучшему. Мы разработали универсальную гибридную тему, которая объединяет классическую информационную среду сайта и мощный функционал интернет-магазина для сбора пожертвований.
                                </p>

                                <h3>Для кого создана платформа</h3>
                                <p>Наша тема разработана с учетом специфики самых разных организаций:</p>
                                <ul className="about-list">
                                    <li><strong>Благотворительные фонды:</strong> помощь детям, взрослым и защита животных.</li>
                                    <li><strong>Религиозные организации:</strong> приходы, храмы и миссионерские проекты.</li>
                                    <li><strong>Образование:</strong> школы и университеты, развивающие эндаумент-фонды и стипендиальные программы.</li>
                                    <li><strong>Культура и медиа:</strong> музеи, театры, независимые СМИ и краудфандинговые площадки.</li>
                                </ul>

                                <h3>Как это работает: Три грани CharityImpact</h3>
                                <p>Проект уникален своей модульной архитектурой, позволяющей мгновенно адаптироваться под ваши задачи:</p>

                                <ol className="features-list">
                                    <li>
                                        <div className="feature-number">1</div>
                                        <div className="feature-content">
                                            <strong>Donation Mode (Режим фонда)</strong>
                                            <p>Весь фокус направлен на сбор средств. Мы упростили путь донора: от выбора программы до моментального перевода, обеспечив полную прозрачность отчетности.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feature-number">2</div>
                                        <div className="feature-content">
                                            <strong>Store Mode (Режим магазина)</strong>
                                            <p>Полноценный e-commerce инструмент для продажи мерча, изделий мастерских или литературы. Каждая покупка здесь — это шаг в поддержку вашей организации.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feature-number">3</div>
                                        <div className="feature-content">
                                            <strong>Hybrid Mode (Смешанный режим)</strong>
                                            <p>Максимальная синергия: на одной странице вы можете принимать прямые пожертвования и предлагать товары с социальной миссией, превращая покупателей в благотворителей.</p>
                                        </div>
                                    </li>
                                </ol>

                                <div className="about-goal">
                                    <img src="/images/about/team.jpg" alt="Команда волонтёров" className="goal-image" />
                                    <div className="goal-content">
                                        <h3>Наша цель</h3>
                                        <p>Мы верим, что благотворительность должна быть профессиональной, прозрачной и технологичной.</p>
                                        <p>CharityImpact берет на себя технические сложности: интеграцию с платежными системами, мобильную адаптивность и удобство управления контентом, чтобы вы могли сосредоточиться на главном — вашей миссии.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка - сайдбар с программами */}
                        <aside className="about-sidebar">
                            <h2 className="sidebar-title">Поддержите нас</h2>
                            <div className="sidebar-programs">
                                {programs.slice(0, 4).map(program => (
                                    <Link key={program.id} to={`/program/${program.id}`} className="program-card-link">
                                        <div className="program-card-small">
                                            <img src={program.image} alt={program.title} className="program-image-small" />
                                            <div className="program-content-small">
                                                <span className="program-category-small">{program.category}</span>
                                                <h4>{program.title}</h4>
                                                <p>{program.description}</p>
                                                <div className="progress-bar-small">
                                                    <div className="progress-bar__fill-small" style={{ width: `${program.progress}%` }} />
                                                    <span className="progress-bar__text-small">{program.progress}%</span>
                                                </div>
                                                <div className="program-stats-small">
                                                    <div>
                                                        <span className="label">Собрано:</span>
                                                        <span className="value">{program.raised.toLocaleString()} ₽</span>
                                                    </div>
                                                    <div>
                                                        <span className="label">Цель:</span>
                                                        <span className="value">{program.goal.toLocaleString()} ₽</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Link to="/programs" className="link-all-programs">
                                Все программы →
                            </Link>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};