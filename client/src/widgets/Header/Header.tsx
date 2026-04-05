import { type FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE, ORDERS_ROUTE, SHOP_ROUTE } from "../../shared/lib/consts";
import AuthModal from "../../features/auth/ui/AuthModal";
import { useStore } from "../../shared/hooks/useStore";
import styles from "./Header.module.scss"
import BasketModal from "../../entities/basket/ui/BasketModal"

const Header: FC = observer(() => {
    const { user } = useStore();
    
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setIsAuthMode] = useState<'login' | 'register'>('login');
    const [isBasketOpen, setIsBasketOpen] = useState(false);

    const handleOpenAuth = (mode: 'login' | 'register') => {
        setIsAuthMode(mode);
        setIsAuthOpen(true);
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    
                    <Link to={SHOP_ROUTE} className={styles.logo}>
                        Patriot
                    </Link>

                    {user.isAuth ? (
                        <nav className={styles.nav}>
                            {user.user?.role === 'ADMIN' && (
                                <>
                                    <Link to={ADMIN_ROUTE} className={styles.link}>
                                        Admin
                                    </Link>
                                </>
                            )}

                            <Link to={ORDERS_ROUTE} className={styles.link}>
                                Замовлення
                            </Link>

                            <button
                                className={styles.buttonPrimary}
                                onClick={() => setIsBasketOpen(true)}
                            >
                                Кошик
                            </button>

                            <button 
                                className={styles.buttonEscape}
                                onClick={() => user.clearAuth()}
                            >
                                Вийти
                            </button>
                        </nav>
                    ) : (
                        <nav className={styles.nav}>
                            <button 
                                className={styles.button}
                                onClick={() => handleOpenAuth('login')}
                            >
                                Увійти
                            </button>

                            <button 
                                className={styles.buttonPrimary}
                                onClick={() => handleOpenAuth('register')}
                            >
                                Зареєструватися
                            </button>
                        </nav>
                    )}

                </div>
            </div>

            <AuthModal 
                show={isAuthOpen} 
                mode={authMode} 
                onClose={() => setIsAuthOpen(false)} 
            />
            <BasketModal
                show={isBasketOpen}
                onClose={() => setIsBasketOpen(false)}
            />
        </header>
    );
});

export default Header;