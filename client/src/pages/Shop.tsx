import BrandSidebar from "../components/BrandSidebar";
import CategorySidebar from "../components/CategorySidebar";
import WeaponList from "../components/WeaponList";

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