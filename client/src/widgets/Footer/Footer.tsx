import { type FC } from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { ORDERS_ROUTE, SHOP_ROUTE } from "../../shared/lib/consts";

const Footer: FC = () => {
    return (
        <div className={styles.footerWrapper}>
            <div className="container">
                <footer className={styles.footer}>
                    <div>
                        <div>
                            <h3>Patriot</h3>
                            <p>We strive to be the best for our customers.</p>
                        </div>

                        <div>
                            <h4>Навігація</h4>
                            <ul>
                                <Link to={SHOP_ROUTE}>Головна</Link>
                                <Link to={ORDERS_ROUTE}>Замовлення</Link>
                            </ul>
                        </div>

                        <div className={styles.footer__social}>
                            <h4>Ми у соцмережах</h4>
                            <ul>
                                <li><a href="https://t.me/" target="_blank">Telegram</a></li>
                                <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
                                <li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.footer__bottom}>
                        <p>&copy; 2023 Patriot. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;