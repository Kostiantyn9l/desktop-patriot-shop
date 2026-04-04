import type { Weapon } from "../../shared/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneWeapon } from "../../features/weapon/api/weaponApi";
import { Spinner } from "../../shared/ui/Spinner/Spinner";
import styles from "./WeaponPage.module.scss";
import { useStore } from "../../shared/hooks/useStore";

const WeaponPage = () => {
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const { id } = useParams<{ id: string }>();
    const { basket } = useStore();

    useEffect(() => {
        if (!id) return;
        const weaponId = Number(id);
        fetchOneWeapon(weaponId).then(data =>  setWeapon(data))
    }, [id])

    const handleAddToBasket = async () => {
        if (!weapon) return;
        await basket.addToBasket(weapon.id);
    };

    if (!weapon) {
        return <Spinner />
    };

    return (
        <div className="container">
            <section className={styles.weaponPage}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={import.meta.env.VITE_REACT_APP_API_URL + weapon.img}
                                alt={weapon.name}
                            />
                        </div>
                    </div>

                    <div className={styles.right}>
                        <h2 className={styles.name}>{weapon.name}</h2>
                        <p className={styles.rating}>Рейтинг: {weapon.rating}</p>

                        <div className={styles.purchase}>
                            <h3 className={styles.price}>{weapon.price}₴</h3>
                            <button 
                                className={styles.addToCart}
                                onClick={handleAddToBasket}
                            >
                                Додати до кошика
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.infoTitle}>Характеристики</div>

                    <div className={styles.infoGrid}>
                        {weapon.info.map((item) => (
                        <div key={item.id} className={styles.infoItem}>
                            <span className={styles.infoName}>{item.title}</span>
                            <span className={styles.infoDesc}>{item.description}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WeaponPage;