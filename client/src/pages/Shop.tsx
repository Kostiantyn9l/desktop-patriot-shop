import BrandSidebar from "../widgets/BrandSidebar/BrandSidebar";
import CategorySidebar from "../widgets/CategorySidebar/CategorySidebar";
import WeaponList from "../entities/weapon/ui/WeaponList";
import { observer } from "mobx-react-lite";
import { useStore } from "../shared/hooks/useStore";
import { useEffect } from "react";
import { fetchBrands, fetchTypes, fetchWeapons } from "../features/weapon/api/weaponApi";
import Pagination from "../shared/ui/pagination/Pagination";

const Shop = observer(() => {
    const { weapon } = useStore();

    useEffect(() => { 
        fetchTypes().then(data => weapon.setTypes(data))
        fetchBrands().then(data => weapon.setBrands(data))
        fetchWeapons().then(data => {
            weapon.setWeapons(data.row)
            weapon.setTotalCount(data.count)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        fetchWeapons(weapon.type?.id, weapon.brand?.id, weapon.page, weapon.limit)
        .then(data => {
            weapon.setWeapons(data.row)
            weapon.setTotalCount(data.count)
        })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weapon.page, weapon.type?.id, weapon.brand?.id])

    return (
        <div>
            <div>
                <CategorySidebar />
                <BrandSidebar />
            </div>
            <div>
                <WeaponList />
                <Pagination 
                    totalCount={weapon.totalCount}
                    limit={weapon.limit}
                    page={weapon.page}
                    onChange={(p) => weapon.setPage(p)}
                />
            </div>
        </div>
    )
});

export default Shop;