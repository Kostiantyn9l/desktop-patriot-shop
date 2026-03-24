import { observer } from "mobx-react-lite";
import { useContext, type FC } from "react";
import { Context } from "../main";

const CategorySidebar: FC = observer(() => {
    const context = useContext(Context);
    if(!context) {
        throw new Error("Context not provided");
    }

    const { weapon } = context;

    return (
        <section>
            <ul>
                {weapon.types.map(type =>
                    <li>
                        <button
                            onClick={() => weapon.setSelectedType(type)} 
                            key={type.id}
                        >
                            {type.name}
                        </button>
                    </li>
                )}
            </ul>
        </section>
    );
});

export default CategorySidebar;