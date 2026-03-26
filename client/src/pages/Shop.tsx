import BrandSidebar from "../widgets/BrandSidebar/BrandSidebar";
import CategorySidebar from "../widgets/CategorySidebar/CategorySidebar";
import WeaponList from "../entities/weapon/ui/WeaponList";

const Shop = () => {
    return (
        <div>
            <CategorySidebar />
            <BrandSidebar />
            <WeaponList />
        </div>
    )
}

export default Shop;