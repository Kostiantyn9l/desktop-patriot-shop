import { observer } from "mobx-react-lite";
import { type FC } from "react";
import { useStore } from "../../shared/hooks/useStore";
import style from "./BrandSidebar.module.scss";

const BrandSidebar: FC = observer(() => {
    const { weapon } = useStore();

    return (
        <aside className={style.brandSidebar}>
            <h3>Бренди</h3>
            <ul className={style.brandSidebar__list}>
                {weapon.brands.map((brand) => {
                    const isActive = brand.id === weapon.brand?.id;

                    return (
                        <li key={brand.id} className={style.brandSidebar__item}>
                            <button
                                className={`${style.brandSidebar__button} ${
                                isActive ? style.brandSidebar__buttonActive : ""
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