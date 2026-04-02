import { type FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from './Layout.module.scss';

const Layout: FC = () => {
    return (
        <div className={styles.layout}>
            <Header />

            <main className={styles.content}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;