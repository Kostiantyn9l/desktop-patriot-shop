import { useState } from "react";
import { registration } from "../api/authAPI";
import { useStore } from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";
import axios from "axios";
import styles from "./AuthModal.module.scss"

interface RegisterModalProps {
    onSwitchToLogin: () => void;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = observer(({ onSwitchToLogin, onClose }) => {
    const { user } = useStore();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            let data = null;
            data = await registration(name, email, password);

            user.setUser(data.user)
            user.setIsAuth(true);
            console.log(data);

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
                    <span>Ім'я користувача</span>
                    <input
                        name="username"
                        type="text"
                        placeholder="Данііл Волков"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

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

                <button type="submit">Зареєструватися</button>
            </form>

            <div className={styles["switch-container"]}>
                <span>Вже є аккаунт?</span>
                <button 
                    className={styles["switch-button"]} 
                    onClick={onSwitchToLogin}
                >
                    Увійти
                </button>
            </div>
        </div>
    );
});

export default RegisterModal;