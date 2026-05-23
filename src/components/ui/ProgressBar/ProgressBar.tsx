import './ProgressBar.css';

interface ProgressBarProps {
    progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
            <span className="progress-bar__text">{progress}%</span>
        </div>
    );
};