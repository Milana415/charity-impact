import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './DonationModal.css';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    programId?: number;
    programTitle?: string;
}

export const DonationModal = ({ isOpen, onClose, programId }: DonationModalProps) => {
    const { user } = useAuth();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(programId || 0);

    if (!isOpen) return null;

    const amounts = [500, 1000, 3000];

    const handleCustomAmountClick = () => {
        setSelectedAmount(null);
    };

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalAmount = selectedAmount || Number(customAmount);
        if (!finalAmount || finalAmount <= 0) {
            alert('Пожалуйста, выберите или введите сумму');
            return;
        }

        console.log({
            amount: finalAmount,
            email,
            isAnonymous,
            programId: selectedProgram,
        });

        alert(`Спасибо за пожертвование ${finalAmount} ₽!`);
        onClose();
    };

    return (
        <div className="donation-modal-overlay" onClick={onClose}>
            <div className="donation-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="donation-modal-close" onClick={onClose}>✕</button>

                <h2 className="donation-modal-title">Поддержите наш проект</h2>

                <form onSubmit={handleSubmit} className="donation-form">
                    <div className="form-group">
                        <label>Выберите программу:</label>
                        <select
                            className="program-select"
                            value={selectedProgram}
                            onChange={(e) => setSelectedProgram(Number(e.target.value))}
                        >
                            <option value={0}>Все программы</option>
                            <option value={1}>Помощь детям</option>
                            <option value={2}>Экология</option>
                            <option value={3}>Животные</option>
                        </select>
                    </div>

                    <div className="donation-amounts">
                        {amounts.map(amount => (
                            <button
                                key={amount}
                                type="button"
                                className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                                onClick={() => handleAmountSelect(amount)}
                            >
                                {amount} ₽
                            </button>
                        ))}
                        <button
                            type="button"
                            className={`amount-btn ${!selectedAmount && customAmount ? 'active' : ''}`}
                            onClick={handleCustomAmountClick}
                        >
                            Ввести
                        </button>
                    </div>

                    {!selectedAmount && customAmount !== '' && (
                        <div className="custom-amount-input">
                            <input
                                type="number"
                                placeholder="Сумма"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                min="1"
                            />
                            <span>₽</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required={!isAnonymous}
                        />
                    </div>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                        <span>Анонимно</span>
                    </label>

                    <button type="submit" className="donation-submit-btn">
                        Помочь
                    </button>
                </form>
            </div>
        </div>
    );
};