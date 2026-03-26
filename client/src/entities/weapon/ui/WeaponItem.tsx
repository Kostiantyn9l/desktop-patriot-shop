import { type FC } from "react";
import type { Weapon } from "../../../shared/types/types";
import { useNavigate } from "react-router-dom";
import { WEAPON_PAGE_ROUTE } from "../../../shared/lib/consts";
import "./WeaponItem.scss";

interface WeaponItemProps {
    weapon: Weapon;
}

const WeaponItem: FC<WeaponItemProps> = ({ weapon }) => {
    const navigate = useNavigate();

    return (
        <article
            className="weapon-item"
            onClick={() => navigate(`${WEAPON_PAGE_ROUTE}/${weapon.id}`)}
        >
            <img 
                className="weapon-item__img" 
                src={weapon.img} 
                alt={weapon.name} 
            />
            <div className="weapon-item__info">
                <h3 className="weapon-item__name">{weapon.name}</h3>
                <p className="weapon-item__price">Price: {weapon.price}₴</p>
                <p className="weapon-item__rating">Rating: {weapon.rating}</p>
            </div>
        </article>
    );
};

export default WeaponItem;