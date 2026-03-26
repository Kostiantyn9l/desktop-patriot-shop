import { observer } from "mobx-react-lite";
import { type FC } from "react";
import { useStore } from "../../shared/hooks/useStore";
import "./CategorySidebar.scss";

const CategorySidebar: FC = observer(() => {
    const { weapon } = useStore();

    return (
        <aside className="category-sidebar">
            <ul className="category-sidebar__list">
                {weapon.types.map((type) => {
                    const isActive = type.id === weapon.type?.id;

                    return(
                        <li key={type.id} className="category-sidebar__item">
                            <button
                                className={`category-sidebar__button ${
                                    isActive ? "category-sidebar__button--active" : ""
                                }`}
                                onClick={() => weapon.setSelectedType(type)}
                            >
                                {type.name}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </aside>
    );
});

export default CategorySidebar;