import './StatsSection.css';

const stats = [
    { value: '10+', label: 'лет помощи' },
    { value: '3 500+', label: 'поддержанных людей' },
    { value: '98%', label: 'пожертвований — на прямую помощь' },
];

export const StatsSection = () => {
    return (
        <section className="stats">
            <div className="container stats__container">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};