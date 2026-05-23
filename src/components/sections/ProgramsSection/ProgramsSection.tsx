import { Link } from 'react-router-dom';
import { programs } from '../../../data/programs';
import './ProgramsSection.css';

export const ProgramsSection = () => {
    return (
        <section className="programs">
            <div className="container">
                <h2 className="section-title">Поддержите нас</h2>

                <div className="programs-grid">
                    {programs.slice(0, 6).map(program => (
                        <Link key={program.id} to={`/program/${program.id}`} className="program-card-link">
                            <div className="program-card">
                                <img src={program.image} alt={program.title} className="program-image" />
                                <div className="program-content">
                                    <span className="program-category">{program.category}</span>
                                    <h3>{program.title}</h3>
                                    <p>{program.description}</p>

                                    <div className="progress-bar">
                                        <div className="progress-bar__fill" style={{ width: `${program.progress}%` }} />
                                        <span className="progress-bar__text">{program.progress}%</span>
                                    </div>

                                    <div className="program-stats">
                                        <div>
                                            <span className="label">Собрано:</span>
                                            <span className="value">{program.raised.toLocaleString()} ₽</span>
                                        </div>
                                        <div>
                                            <span className="label">Цель:</span>
                                            <span className="value">{program.goal.toLocaleString()} ₽</span>
                                        </div>
                                    </div>

                                    <button className="program-btn">Помочь</button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="programs-footer">
                    <Link to="/programs" className="link-all">
                        Все программы →
                    </Link>
                </div>
            </div>
        </section>
    );
};