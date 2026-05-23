import { stories } from '../../../data/stories';
import './StoriesSection.css';

export const StoriesSection = () => {
    return (
        <section className="stories">
            <div className="container">
                <h2 className="section-title">Истории перемен</h2>

                <div className="stories-grid">
                    {stories.map(story => (
                        <div key={story.id} className="story-card">
                            <div className="story-header">
                                <img src={story.image} alt={story.name} className="story-avatar" />
                                <div className="story-info">
                                    <h3>{story.name}, {story.age} лет</h3>
                                    <span className="story-role">{story.role}</span>
                                </div>
                            </div>

                            <p className="story-text">{story.text}</p>

                            <div className="story-result">
                                <strong>Результат:</strong> {story.result}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};