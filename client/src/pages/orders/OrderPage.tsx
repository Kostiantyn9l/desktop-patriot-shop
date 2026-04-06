import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/hooks/useStore";
import OrderList from "../../entities/order/ui/OrderList";
import styles from "./OrderPage.module.scss";

const OrdersPage = observer(() => {
    const { order } = useStore();

    const pendingOrders = order.orders.filter(o => o.status === "PENDING");
    const confirmedOrders = order.orders.filter(o => o.status === "COMPLETED");
    const cancelledOrders = order.orders.filter(o => o.status === "CANCELLED");

    useEffect(() => {
        order.fetchOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`${styles.orderPage} container`}>
            <h1 className={styles.title}>Мої замовлення</h1>

            {order.orders.length === 0 ? (
                <p className={styles.empty}>Замовлень немає</p>
            ) : (

                <div className={styles.ordersWrapper}>
                    <div className={styles.ordersColumn}>
                        <h2>Очікують підтвердження</h2>
                        <OrderList orders={pendingOrders} />
                    </div>

                    <div className={styles.ordersColumn}>
                        <h2>Підтверджені</h2>
                        <OrderList orders={confirmedOrders} />
                    </div>

                    <div className={styles.ordersColumn}>
                        <h2>Скасовані</h2>
                        <OrderList orders={cancelledOrders} />
                    </div>
                </div>
            )}
        </div>
    );
});

export default OrdersPage;