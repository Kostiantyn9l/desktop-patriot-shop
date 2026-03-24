import { useContext, type FC, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import AuthModal from "./modals/authModals/AuthModal";

const Header: FC = observer(() => {
    const context = useContext(Context);
    if(!context) {
        throw new Error("Context not provided");
    }

    const { user } = context;
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setIsAuthMode] = useState<'login' | 'register'>('login');

    const handleOpenAuth = (mode: 'login' | 'register') => {
        setIsAuthMode(mode);
        setShowAuthModal(true);
    }

    return (
        <header>
            <div>
                <Link to={SHOP_ROUTE}>Patriot</Link>
                {user.isAuth ?
                    <nav>
                        <Link to={ADMIN_ROUTE}>Admin</Link>
                        <button onClick={() => user.clearAuth()}>Вийти</button>
                    </nav>
                    :
                    <nav>
                        <button onClick={() => handleOpenAuth('login')}>Увійти</button>
                        <button onClick={() => handleOpenAuth('register')}>Зареєструватися</button>
                    </nav>
                }
            </div>

            <AuthModal 
                show={showAuthModal} 
                mode={authMode} 
                onClose={() => setShowAuthModal(false)} 
            />
        </header>
    );
});

export default Header;