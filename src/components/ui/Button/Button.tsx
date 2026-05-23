import './Button.css';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const Button = ({ variant = 'primary', children, onClick, className = '' }: ButtonProps) => {
    return (
        <button className={`btn btn--${variant} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};