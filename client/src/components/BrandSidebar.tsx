import { observer } from "mobx-react-lite";
import { useContext, type FC } from "react";
import { Context } from "../main";

const ProductList: FC = observer(() => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not provided");
    }

    const { weapon } = context;

    return (
        <section>
            <ul>
                {
                    weapon.brands.map(brand =>
                        <li>
                            <button
                                onClick={() => weapon.setSelectedBrand(brand)}
                                key={brand.id}
                            >
                                {brand.name}
                            </button>
                        </li>
                    )
                }
            </ul>
        </section>
    );
});

export default ProductList;