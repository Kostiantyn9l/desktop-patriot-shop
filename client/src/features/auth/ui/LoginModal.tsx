import { useState } from "react";
import { useStore } from "../../../shared/hooks/useStore";
import { login } from "../api/authAPI";
import { observer } from "mobx-react-lite";
import axios from "axios";
import styles from "./AuthModal.module.scss"

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
            <form className={styles["auth-form"]} onSubmit={handleSubmit}>
                <label>
                    <span>Email</span>
                    <input
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    <span>Пароль</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit">Увійти</button>
            </form>

            <div className={styles["switch-container"]}>
                <span>Немає аккаунта?</span>
                <button 
                    className={styles["switch-button"]} 
                    onClick={onSwitchToRegister}
                >
                    Зареєструватися
                </button>
            </div>
        </div>
    );
});

export default LoginModal;