import { useState } from "react";
import { registration } from "../api/authAPI";
import { useStore } from "../../../shared/hooks/useStore";

interface RegisterModalProps {
    onSwitchToLogin: () => void;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onSwitchToLogin, onClose }) => {
    const { user } = useStore();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const signIn = async () => {
        const response = await registration(name, email, password);
        console.log(response);
    }

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    <span>Email</span>
                    <input
                        name="email"
                        type="email"
                        placeholder="Введіть email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    <span>Пароль</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="Введіть пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit" onClick={signIn}>Зареєструватися</button>
            </form>

            <p>Вже є аккаунт? <button onClick={onSwitchToLogin}>Увійти</button></p>
        </div>
    );
};

export default RegisterModal;