import type { Weapon } from "../shared/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneWeapon } from "../features/weapon/ai/weaponApi";
import { Spinner } from "../shared/ui/Spinner/Spinner";

const WeaponPage = () => {
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        const weaponId = Number(id);
        fetchOneWeapon(weaponId).then(data =>  setWeapon(data))
    }, [id])

    if (!weapon) {
        return <Spinner />
    };

    return (
        <section>
            <div>
                <img src={import.meta.env.VITE_REACT_APP_API_URL + weapon.img} alt={weapon.name} />
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
                {weapon.info.map((info, index: number) =>
                    <ul key={info.id} style={index % 2 === 0 ? { backgroundColor: "lightgray" } : { backgroundColor: "darkgray" }}>
                        <li>{info.title}: {info.description}</li>
                    </ul>
                )}
            </div>
        </section>
    );
}

export default WeaponPage;