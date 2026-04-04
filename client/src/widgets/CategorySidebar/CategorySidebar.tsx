import { observer } from "mobx-react-lite";
import { type FC } from "react";
import { useStore } from "../../shared/hooks/useStore";
import style from "./CategorySidebar.module.scss";

const CategorySidebar: FC = observer(() => {
    const { weapon } = useStore();

    return (
        <aside className={style.categorySidebar}>
            <h3>Категорії</h3>
            <ul className={style.categorySidebar__list}>
                {weapon.types.map((type) => {
                    const isActive = type.id === weapon.type?.id;

                    return (
                        <li key={type.id} className={style.categorySidebar__item}>
                            <button
                                className={`${style.categorySidebar__button} ${
                                isActive ? style.categorySidebar__buttonActive : ""
                            }`}
                                onClick={() => weapon.setSelectedType(type)}
                            >
                                {type.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
});

export default CategorySidebar;