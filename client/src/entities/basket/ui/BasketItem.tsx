import { type FC } from "react";
import { useStore } from "../../../shared/hooks/useStore";
import { type BasketWeapon } from "../../../shared/types/types";
import styles from "./BasketItem.module.scss"

interface BasketItemProps {
    item: BasketWeapon;
}

const BasketItem: FC<BasketItemProps> = ({ item }) => {
    const { basket } = useStore();

    const handleAdd = () => {
        basket.addToBasket(item.weapon.id);
    };

    const handleRemoveOne = () => {
        basket.removeOneFromBasket(item.weapon.id);
    };

    const handleRemoveAll = () => {
        basket.removeFromBasket(item.weapon.id);
    };

    return (
        <div className={styles.basketItem}>
            <img
                className={styles.image}
                src={import.meta.env.VITE_REACT_APP_API_URL + item.weapon.img}
            />

            <div className={styles.info}>
                <span className={styles.name}>{item.weapon.name}</span>

                <div className={styles.meta}>
                <span>x {item.quantity}</span>
                <span>₴{item.weapon.price * item.quantity}</span>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.iconButton} onClick={handleAdd}>+</button>
                <button className={styles.iconButton} onClick={handleRemoveOne}>-</button>

                <button className={styles.removeButton} onClick={handleRemoveAll}>
                Видалити
                </button>
            </div>
        </div>
    );
};

export default BasketItem;