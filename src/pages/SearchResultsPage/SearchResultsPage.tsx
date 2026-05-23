import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import './SearchResultsPage.css';

export const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleSearch, searchResults } = useSearch();
    const [query, setQuery] = useState('');

    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
            handleSearch(q);
        } else {
            navigate('/');
        }
    }, [searchParams]);

    return (
        <>
            <Header />
            <main className="search-results-page">
                <div className="container">
                    <div className="search-header">
                        <h1 className="search-title">
                            Результаты поиска{query && `: "${query}"`}
                        </h1>
                        <p className="search-count">
                            Найдено программ: {searchResults.length}
                        </p>
                    </div>

                    {searchResults.length > 0 ? (
                        <div className="search-results-grid">
                            {searchResults.map(program => (
                                <Link
                                    to={`/program/${program.id}`}
                                    key={program.id}
                                    className="search-result-card"
                                >
                                    <img src={program.image} alt={program.title} className="result-image" />
                                    <div className="result-content">
                                        <span className="result-category">{program.category}</span>
                                        <h3 className="result-title">{program.title}</h3>
                                        <p className="result-description">{program.description}</p>
                                        <div className="result-progress">
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${program.progress}%` }} />
                                            </div>
                                            <span className="progress-text">{program.progress}%</span>
                                        </div>
                                        <div className="result-stats">
                                            <span>Собрано: {program.raised.toLocaleString()} ₽</span>
                                            <span>Цель: {program.goal.toLocaleString()} ₽</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <h2>Ничего не найдено</h2>
                            <p>По запросу "{query}" не найдено программ</p>
                            <p className="no-results-hint">Попробуйте:</p>
                            <ul>
                                <li>Изменить поисковый запрос</li>
                                <li>Использовать более общие ключевые слова</li>
                                <li>Проверить правильность написания</li>
                            </ul>
                            <Link to="/programs" className="btn-back">
                                Перейти к каталогу программ
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};