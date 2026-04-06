import { useState, useEffect } from "react";
import CreateBrand from "../../features/weapon/ui/CreateBrandModal";
import CreateCategory from "../../features/weapon/ui/CreateCategoryModal";
import CreateWeapon from "../../features/weapon/ui/CreateWeaponModal";
import styles from "./Admin.module.scss"
import OrderList from "../../entities/order/ui/OrderList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/hooks/useStore";

const Admin = observer(() => {
    const { order } = useStore();
    
    const [categoryShow, setCategoryShow] = useState(false);
    const [brandShow, setBrandShow] = useState(false);
    const [weaponShow, setWeaponShow] = useState(false);

    const pendingOrders = order.orders.filter(o => o.status === "PENDING");
    const confirmedOrders = order.orders.filter(o => o.status === "COMPLETED");
    const cancelledOrders = order.orders.filter(o => o.status === "CANCELLED");

    useEffect(() => {
        order.fetchAllOrders();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <h1 className={styles.title}>Адміністрування</h1>
            <section className={styles.admin}>

                <div className={styles.actions}>
                    <h1>Панель керування</h1>

                    <button onClick={() => setCategoryShow(true)}>Додати Категорію</button>
                    <button onClick={() => setBrandShow(true)}>Додати бренд</button>
                    <button onClick={() => setWeaponShow(true)}>Додати Озброєння</button>
                </div>

                <div className={styles.ordersWrapper}>
                    <div className={styles.ordersColumn}>
                        <h2>Очікують підтвердження</h2>
                        <OrderList orders={pendingOrders} />
                    </div>

                    <div className={styles.ordersColumn}>
                        <h2>Історія підтверджених замовлень</h2>
                        <OrderList orders={confirmedOrders} />
                    </div>

                    <div className={styles.ordersColumn}>
                        <h2>Історія скасованих замовлень</h2>
                        <OrderList orders={cancelledOrders} />
                    </div>
                </div>

                <CreateCategory show={categoryShow} onClose={() => setCategoryShow(false)}/>
                <CreateBrand show={brandShow} onClose={() => setBrandShow(false)}/>
                <CreateWeapon show={weaponShow} onClose={() => setWeaponShow(false)}/>
            </section>
        </div>
    )
})

export default Admin;