import { type FC } from "react";
import type { Weapon } from "../../../shared/types/types";
import { useNavigate } from "react-router-dom";
import { WEAPON_PAGE_ROUTE } from "../../../shared/lib/consts";
import styles from "./WeaponItem.module.scss"

interface WeaponItemProps {
    weapon: Weapon;
}

const WeaponItem: FC<WeaponItemProps> = ({ weapon }) => {
    const navigate = useNavigate();

    return (
        <article
            className={styles.weaponItem}
            onClick={() => navigate(`${WEAPON_PAGE_ROUTE}/${weapon.id}`)}
        >
            <div className={styles.weaponItem__imageWrapper}>
                <img
                    src={import.meta.env.VITE_REACT_APP_API_URL + weapon.img}
                    alt={weapon.name}
                    className={styles.weaponItem__image}
                />
            </div>

            <div className={styles.weaponItem__content}>
                <h3 className={styles.weaponItem__title}>{weapon.name}</h3>

                <p className={styles.weaponItem__rating}>
                    Рейтинг: {weapon.rating}
                </p>

                <p className={styles.weaponItem__price}>
                    {weapon.price}₴
                </p>
            </div>
        </article>
    );
};

export default WeaponItem;