import { observer } from "mobx-react-lite";
import { type FC } from "react";
import { useStore } from "../../shared/hooks/useStore";
import "./BrandSidebar.scss";

const BrandSidebar: FC = observer(() => {
    const { weapon } = useStore();

    return (
        <aside className="brand-sidebar">
            <ul className="brand-sidebar__list">
                { weapon.brands.map((brand) => {
                    const isActive = brand.id === weapon.brand?.id;

                    return (
                        <li key={brand.id} className="brand-sidebar__item">
                            <button
                                className={`brand-sidebar__button ${
                                    isActive ? "brand-sidebar__button--active" : ""
                                }`}
                                onClick={() => weapon.setSelectedBrand(brand)} 
                            >
                                {brand.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
});

export default BrandSidebar;