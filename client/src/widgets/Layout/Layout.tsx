import { type FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.scss";

const Layout: FC = () => {
    return (
        <div className="layout">
            <Header />
            <main className="layout__content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;