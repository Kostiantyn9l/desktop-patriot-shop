import { observer } from "mobx-react-lite";
import { type FC } from "react";
import WeaponItem from "./WeaponItem";
import { useStore } from "../../../shared/hooks/useStore";
import "./WeaponList.scss";

const WeaponList: FC = observer(() => {
    const { weapon } = useStore();

    return (
        <section className="weapon-list">
            <ul className="weapon-list__item">
                { weapon.filteredWeapons.map(w => (
                    <li key={w.id} className="weapon-list__item">
                        <WeaponItem weapon={w}/>
                    </li>
                ))}
            </ul>
        </section>
    );
});

export default WeaponList;