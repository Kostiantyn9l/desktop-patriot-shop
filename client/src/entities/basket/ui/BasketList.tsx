import { type FC } from "react";
import BasketItem from "./BasketItem";
import { type BasketWeapon } from "../../../shared/types/types";
import styles from "./BasketList.module.scss"

interface BasketListProps {
    items: BasketWeapon[];
}

const BasketList: FC<BasketListProps> = ({ items }) => {
    return (
        <div className={styles.basketList}>
            {items.map(item => (
                <BasketItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default BasketList;