import { useState } from "react";
import CreateBrand from "../../features/weapon/ui/CreateBrandModal";
import CreateCategory from "../../features/weapon/ui/CreateCategoryModal";
import CreateWeapon from "../../features/weapon/ui/CreateWeaponModal";
import styles from "./Admin.module.scss"

const Admin = () => {
    const [categoryShow, setCategoryShow] = useState(false);
    const [brandShow, setBrandShow] = useState(false);
    const [weaponShow, setWeaponShow] = useState(false);

    return (
        <section className={styles.admin}>
            <h1 className={styles.title}>Адміністрування</h1>

            <div className={styles.actions}>
                <button onClick={() => setCategoryShow(true)}>Додати Категорію</button>
                <button onClick={() => setBrandShow(true)}>Додати бренд</button>
                <button onClick={() => setWeaponShow(true)}>Додати Озброєння</button>
            </div>

            <CreateCategory show={categoryShow} onClose={() => setCategoryShow(false)}/>
            <CreateBrand show={brandShow} onClose={() => setBrandShow(false)}/>
            <CreateWeapon show={weaponShow} onClose={() => setWeaponShow(false)}/>
        </section>
    )
}

export default Admin;