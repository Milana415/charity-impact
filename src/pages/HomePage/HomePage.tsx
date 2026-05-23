import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { HeroSection } from '../../components/sections/HeroSection/HeroSection';
import { StatsSection } from '../../components/sections/StatsSection/StatsSection';
import { ProgramsSection } from '../../components/sections/ProgramsSection/ProgramsSection';
import { StoriesSection } from '../../components/sections/StoriesSection/StoriesSection';
import { PartnersSection } from '../../components/sections/PartnersSection/PartnersSection';
import './HomePage.css';

export const HomePage = () => {
    return (
        <>
            <Header />
            <main className="home-page">
                <HeroSection />
                <StatsSection />
                <ProgramsSection />
                <StoriesSection />
                <PartnersSection />
            </main>
            <Footer />
        </>
    );
};