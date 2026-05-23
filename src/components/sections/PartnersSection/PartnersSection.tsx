import { partners } from '../../../data/partners';
import './PartnersSection.css';

export const PartnersSection = () => {
    return (
        <section className="partners">
            <div className="container">
                <h2 className="section-title">Наши партнеры</h2>

                <div className="partners-grid">
                    {partners.map(partner => (
                        <a
                            key={partner.id}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="partner-item"
                        >
                            <img src={partner.logo} alt={partner.name} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};