import { observer } from "mobx-react-lite";
import { type FC } from "react";
import WeaponItem from "./WeaponItem";
import { useStore } from "../../../shared/hooks/useStore";
import style from "./WeaponList.module.scss";

const WeaponList: FC = observer(() => {
    const { weapon } = useStore();

    return (
        <section className={style.weaponList}>
            <ul className={style.weaponList__grid}>
                {weapon.filteredWeapons.map((w) => (
                    <li key={w.id} className={style.weaponList__item}>
                        <WeaponItem weapon={w} />
                    </li>
                ))}
            </ul>
        </section>
    );
});

export default WeaponList;