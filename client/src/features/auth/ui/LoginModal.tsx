import { useState } from "react";
import { useStore } from "../../../shared/hooks/useStore";
import { login } from "../api/authAPI";
import { observer } from "mobx-react-lite";
import axios from "axios";

interface LoginModalProps {
    onSwitchToRegister: () => void;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = observer(({ onSwitchToRegister, onClose }) => {
    const { user } = useStore();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        try { 
            e.preventDefault();

            const data = await login(email, password);
            console.log(data);

            user.setUser(data.user)
            user.setIsAuth(true);
            onClose();
        } catch (err) { 
            if (axios.isAxiosError(err)) {
                alert(err.response?.data.message || "Помилка");
            }
        }
    };

    return (
        <div>
            <h2>Вхід</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
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

                <button type="submit">Увійти</button>
            </form>

            <p>Немає аккаунта? <button onClick={onSwitchToRegister}>Зареєструватися</button></p>
        </div>
    );
});

export default LoginModal;