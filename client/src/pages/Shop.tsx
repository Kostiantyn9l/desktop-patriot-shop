import BrandSidebar from "../widgets/BrandSidebar/BrandSidebar";
import CategorySidebar from "../widgets/CategorySidebar/CategorySidebar";
import WeaponList from "../entities/weapon/ui/WeaponList";
import { observer } from "mobx-react-lite";
import { useStore } from "../shared/hooks/useStore";
import { useEffect } from "react";
import { fetchBrands, fetchTypes, fetchWeapons } from "../features/weapon/ai/weaponApi";

const Shop = observer(() => {
    const { weapon } = useStore();

    useEffect(() => { 
        fetchTypes().then(data => weapon.setTypes(data))
        fetchBrands().then(data => weapon.setBrands(data))
        fetchWeapons().then(data => weapon.setWeapons(data.row))
    }, [weapon]);

    return (
        <div>
            <CategorySidebar />
            <BrandSidebar />
            <WeaponList />
        </div>
    )
});

export default Shop;