import { useState } from "react";
import CreateBrand from "../components/modals/adminModals/CreateBrandModal";
import CreateCategory from "../components/modals/adminModals/CreateCategoryModal";
import CreateWeapon from "../components/modals/adminModals/CreateWeaponModal";

const Admin = () => {
    const [categoryShow, setCategoryShow] = useState(false);
    const [brandShow, setBrandShow] = useState(false);
    const [weaponShow, setWeaponShow] = useState(false);

    return (
        <section>
            <h1>Адміністрування</h1>
            <div>
                <button
                    onClick={() => setCategoryShow(true)}
                >
                    Додати Категорію
                </button>
                <button 
                    onClick={() => setBrandShow(true)}
                >
                    Додати бренд
                </button>
                <button 
                    onClick={() => setWeaponShow(true)}
                >
                    Додати Озброєння
                </button>
            </div>

            <CreateCategory show={categoryShow} onClose={() => setCategoryShow(false)}/>
            <CreateBrand show={brandShow} onClose={() => setBrandShow(false)}/>
            <CreateWeapon show={weaponShow} onClose={() => setWeaponShow(false)}/>
        </section>
    )
}

export default Admin;