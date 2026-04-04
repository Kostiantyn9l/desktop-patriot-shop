import { type FC } from "react";
import { useStore } from "../../../shared/hooks/useStore";
import { type BasketWeapon } from "../../../shared/types/types";

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
        <div>
            <img
                src={import.meta.env.VITE_REACT_APP_API_URL + item.weapon.img}
            />
            <span>{item.weapon.name}</span>
            <span> x {item.quantity}</span>
            <span>₴{item.weapon.price * item.quantity}</span>
            <div>
                <button onClick={handleAdd}>+</button>
                <button onClick={handleRemoveOne}>-</button>
                <button onClick={handleRemoveAll}>Видалити</button>
            </div>
        </div>
    );
};

export default BasketItem;