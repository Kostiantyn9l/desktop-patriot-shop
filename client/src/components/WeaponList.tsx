import { observer } from "mobx-react-lite";
import { useContext, type FC } from "react";
import { Context } from "../main";
import WeaponItem from "./WeaponItem";

const WeaponList: FC = observer(() => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not provided");
    }

    const { weapon } = context;

    return (
        <section>
            <ul>
                { weapon.weapons.map(weapon => (
                    <WeaponItem key={weapon.id} weapon={weapon}/>
                ))}
            </ul>
        </section>
    );
});

export default WeaponList;