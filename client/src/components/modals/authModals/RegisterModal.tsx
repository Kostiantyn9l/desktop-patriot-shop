import { useContext } from "react";
import { Context } from "../../../main";

interface RegisterModalProps {
    onSwitchToLogin: () => void;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onSwitchToLogin, onClose }) => {
    const context = useContext(Context);
    if(!context) {
        throw new Error("Context not provided");
    }

    const { user } = context;

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        user.setIsAuth(true);
        onClose();
    };

    return (
        <div>
            <h2>Реєстрація</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                    <span>Ім'я користувача</span>
                    <input
                        name="username"
                        type="text"
                        placeholder="Введіть ім'я"
                    />
                </label>

                <label>
                    <span>Email</span>
                    <input
                        name="email"
                        type="email"
                        placeholder="Введіть email"
                    />
                </label>

                <label>
                    <span>Пароль</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="Введіть пароль"
                    />
                </label>

                <label>
                    <span>Повторіть пароль</span>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Повторіть пароль"
                    />
                </label>

                <button type="submit">Зареєструватися</button>
            </form>

            <p>Вже є аккаунт? <button onClick={onSwitchToLogin}>Увійти</button></p>
        </div>
    );
};

export default RegisterModal;