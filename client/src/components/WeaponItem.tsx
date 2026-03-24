import { type FC } from "react";
import type { Weapon } from "../types/types";
import { useNavigate } from "react-router-dom";
import { WEAPON_PAGE_ROUTE } from "../utils/consts";

interface WeaponItemProps {
    weapon: Weapon;
}

const WeaponItem: FC<WeaponItemProps> = ({ weapon }) => {
    const navigate = useNavigate();

    return (
        <section onClick={() => navigate(WEAPON_PAGE_ROUTE + "/" + weapon.id)}>
            <img src={weapon.img} alt={weapon.name} />
            <div>
                <h4>Samsung...</h4>
                <div>
                    <p>{weapon.rating}</p>
                </div>
            </div>
            <h3>{weapon.name}</h3>
            <p>{weapon.price}</p>
        </section>
    );
};

export default WeaponItem;