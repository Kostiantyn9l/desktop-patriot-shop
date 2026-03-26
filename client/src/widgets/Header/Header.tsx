import { type FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE, SHOP_ROUTE } from "../../shared/lib/consts";
import AuthModal from "../../features/auth/ui/AuthModal";
import { useStore } from "../../shared/hooks/useStore";
import "./Header.scss";

const Header: FC = observer(() => {
    const { user } = useStore();
    
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setIsAuthMode] = useState<'login' | 'register'>('login');

    const handleOpenAuth = (mode: 'login' | 'register') => {
        setIsAuthMode(mode);
        setIsAuthOpen(true);
    }

    return (
        <header>
            <div>
                <Link to={SHOP_ROUTE}>Patriot</Link>
                {user.isAuth ?
                    <nav>
                        <Link to={ADMIN_ROUTE}>Admin</Link>
                        
                        <button onClick={() => user.clearAuth()}>
                            Вийти
                        </button>
                    </nav>
                    :
                    <nav>
                        <button onClick={() => handleOpenAuth('login')}>
                            Увійти
                        </button>

                        <button onClick={() => handleOpenAuth('register')}>
                            Зареєструватися
                        </button>
                    </nav>
                }
            </div>

            <AuthModal 
                show={isAuthOpen} 
                mode={authMode} 
                onClose={() => setIsAuthOpen(false)} 
            />
        </header>
    );
});

export default Header;