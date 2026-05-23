import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { programs } from '../../data/programs';
import './ProgramsPage.css';

type SortOption = 'newest' | 'oldest' | 'raised' | 'goal' | 'progress';
type FilterTag = string | null;

export const ProgramsPage = () => {
    const [selectedTag, setSelectedTag] = useState<FilterTag>(null);
    const [showUrgent, setShowUrgent] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const programsPerPage = 9;

    
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        programs.forEach(p => p.tags.forEach(t => tags.add(t)));
        return Array.from(tags);
    }, []);

    
    const filteredAndSortedPrograms = useMemo(() => {
        let result = [...programs];

        
        if (selectedTag) {
            result = result.filter(p => p.tags.includes(selectedTag));
        }

        
        if (showUrgent) {
            result = result.filter(p => p.isUrgent);
        }

        
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
                break;
            case 'raised':
                result.sort((a, b) => b.raised - a.raised);
                break;
            case 'goal':
                result.sort((a, b) => b.goal - a.goal);
                break;
            case 'progress':
                result.sort((a, b) => b.progress - a.progress);
                break;
        }

        return result;
    }, [selectedTag, showUrgent, sortBy]);

    
    const totalPages = Math.ceil(filteredAndSortedPrograms.length / programsPerPage);
    const paginatedPrograms = filteredAndSortedPrograms.slice(
        (currentPage - 1) * programsPerPage,
        currentPage * programsPerPage
    );

    
    const handleFilterChange = (tag: FilterTag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const handleUrgentToggle = () => {
        setShowUrgent(!showUrgent);
        setCurrentPage(1);
    };

    const handleSortChange = (option: SortOption) => {
        setSortBy(option);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSelectedTag(null);
        setShowUrgent(false);
        setSortBy('newest');
        setCurrentPage(1);
    };
    
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <>
            <Header />
            <main className="programs-page">
                <div className="container">
                    <h1 className="page-title">Наши программы</h1>

                    <div className="programs-toolbar">
                        <div className="toolbar-left">
                            <button
                                className={`filter-icon-btn ${showUrgent ? 'active' : ''}`}
                                onClick={handleUrgentToggle}
                                title="Показать только срочные"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                </svg>
                            </button>

                            <div className="tags-filter">
                                <button
                                    className={`tag-btn ${selectedTag === null ? 'active' : ''}`}
                                    onClick={() => handleFilterChange(null)}
                                >
                                    Все
                                </button>
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                                        onClick={() => handleFilterChange(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="toolbar-right">
                            <span className="results-count">
                                Найдено: {filteredAndSortedPrograms.length}
                            </span>

                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                            >
                                <option value="newest">Сначала новые</option>
                                <option value="oldest">Сначала старые</option>
                                <option value="raised">По сумме сбора</option>
                                <option value="goal">По цели сбора</option>
                                <option value="progress">По прогрессу</option>
                            </select>
                        </div>
                    </div>

                    {(selectedTag || showUrgent || sortBy !== 'newest') && (
                        <div className="active-filters">
                            <span className="active-filters-label">Активные фильтры:</span>
                            {showUrgent && (
                                <button className="active-filter-tag" onClick={() => setShowUrgent(false)}>
                                    Срочные ×
                                </button>
                            )}
                            {selectedTag && (
                                <button className="active-filter-tag" onClick={() => handleFilterChange(null)}>
                                    {selectedTag} ×
                                </button>
                            )}
                            {sortBy !== 'newest' && (
                                <button className="active-filter-tag" onClick={() => setSortBy('newest')}>
                                    Сортировка: {sortBy === 'raised' ? 'По сумме' : sortBy === 'goal' ? 'По цели' : sortBy === 'progress' ? 'По прогрессу' : 'Старые'} ×
                                </button>
                            )}
                            <button className="reset-filters-btn" onClick={resetFilters}>
                                Сбросить все
                            </button>
                        </div>
                    )}

                    {paginatedPrograms.length > 0 ? (
                        <div className="programs-grid-full">
                            {paginatedPrograms.map(program => (
                                <Link to={`/program/${program.id}`} key={program.id} className="program-card-full-link">
                                    <div className="program-card-full">
                                        {program.isUrgent && (
                                            <span className="urgent-badge">Срочно</span>
                                        )}
                                        <img src={program.image} alt={program.title} className="program-image-full" />
                                        <div className="program-content-full">
                                            <span className="program-category-full">{program.tags[0]}</span>
                                            <h3>{program.title}</h3>
                                            <p>{program.description}</p>

                                            <div className="progress-bar-full">
                                                <div className="progress-bar__fill-full" style={{ width: `${program.progress}%` }} />
                                                <span className="progress-bar__text-full">{program.progress}%</span>
                                            </div>

                                            <div className="program-stats-full">
                                                <div>
                                                    <span className="label">Собрано:</span>
                                                    <span className="value">{program.raised.toLocaleString()} ₽</span>
                                                </div>
                                                <div>
                                                    <span className="label">Цель:</span>
                                                    <span className="value">{program.goal.toLocaleString()} ₽</span>
                                                </div>
                                            </div>

                                            <button className="program-btn-full">Помочь</button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="no-programs">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="1.5">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                            </svg>
                            <h3>Программы не найдены</h3>
                            <p>Попробуйте изменить параметры фильтрации</p>
                            <button className="btn-reset" onClick={resetFilters}>
                                Сбросить фильтры
                            </button>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn prev"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                ‹
                            </button>

                            {getPageNumbers().map((page, index) => (
                                typeof page === 'number' ? (
                                    <button
                                        key={index}
                                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={index} className="pagination-ellipsis">...</span>
                                )
                            ))}

                            <button
                                className="pagination-btn next"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};