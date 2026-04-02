import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Modal from "../../../shared/ui/modal/Modal";

interface AuthModalProps {
    show: boolean;
    mode: 'login' | 'register';
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, mode, onClose }) => {
    const [isAuthMode, setIsAuthMode] = useState<'login' | 'register'>(mode);

    useEffect(() => {
        setIsAuthMode(mode);
    }, [mode]);

    if (!show) return null;

    return (
        <Modal
            open={show}
            onClose={onClose}
            title={isAuthMode === 'login' ? 'Вхід' : 'Реєстрація'}
        >
            {isAuthMode === 'login' ? (
                <LoginModal
                    onSwitchToRegister={() => setIsAuthMode('register')}
                    onClose={onClose}
                />
            ) : (
                <RegisterModal
                    onSwitchToLogin={() => setIsAuthMode('login')}
                    onClose={onClose}
                />
            )}
        </Modal>
    );
};

export default AuthModal;