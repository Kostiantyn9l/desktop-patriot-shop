import type { Weapon } from "../shared/types/types";
import { useParams } from "react-router-dom";

interface Description {
    id: number;
    title: string;
    description: string;
}

const WeaponPage = () => {
    const { id } = useParams<{ id: string }>();
    const weapon: Weapon = {id: parseInt(id || '1'), name: "AK-47", price: 1000, rating: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/AK-47_type_II_Part_DM-ST-89-01131.jpg/2560px-AK-47_type_II_Part_DM-ST-89-01131.jpg"};
    const description: Description[] = [
        {id: 1, title: "Магазин", description: "30 патронів"},
        {id: 2, title: "Калібр", description: "7.62 мм"},
        {id: 3, title: "Довжина", description: "870 мм"},
        {id: 4, title: "Вага", description: "3.47 кг"}
    ]

    return (
        <section>
            <div>
                <img src={weapon.img} alt={weapon.name} />
                <div>
                    <h2>{weapon.name}</h2>
                </div>
                <p>Рейтинг: {weapon.rating}</p>
            </div>

            <div>
                <h3>{weapon.price}</h3>
                <button>Додати до кошика</button>
            </div>

            <div>
                <h1>Характеристики</h1>
                {description.map((info, index: number) =>
                    <ul key={info.id} style={index % 2 === 0 ? { backgroundColor: "lightgray" } : { backgroundColor: "darkgray" }}>
                        <li>{info.title}: {info.description}</li>
                    </ul>
                )}
            </div>
        </section>
    );
}

export default WeaponPage;