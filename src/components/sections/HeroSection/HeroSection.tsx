import { Button } from '../../ui/Button/Button';
import './HeroSection.css';

export const HeroSection = () => {
    return (
        <section className="hero">
            <div className="container hero__container">
                <div className="hero-content">
                    <h1>Маленькие действия рождают большие перемены</h1>
                    <p>
                        Помогайте детям, поддерживая наши программы напрямую, или выбирайте вещи со смыслом в нашем магазине.
                    </p>
                    <p className="hero-tagline">Каждый ваш шаг важен.</p>
                    <div className="hero-buttons">
                        <Button variant="primary">Поддержать</Button>
                        <Button variant="outline">В каталог</Button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="/images/heroes/child.jpg" alt="Ребенок с игрушкой" />
                </div>
            </div>
        </section>
    );
};