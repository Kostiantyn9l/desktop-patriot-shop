import { useContext } from "react";
import { Context } from "../../../main";

interface LoginModalProps {
    onSwitchToRegister: () => void;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSwitchToRegister, onClose }) => {
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
            <h2>Вхід</h2>

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
                    <span>Пароль</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="Введіть пароль"
                    />
                </label>

                <button type="submit" >Увійти</button>
            </form>

            <p>Немає аккаунта? <button onClick={onSwitchToRegister}>Зареєструватися</button></p>
        </div>
    );
};

export default LoginModal;