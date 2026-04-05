import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/hooks/useStore";
import OrderList from "../../entities/order/ui/OrderList";
import styles from "./OrderPage.module.scss";

const OrdersPage = observer(() => {
    const { order } = useStore();

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
                <div className={styles.listWrapper}>
                <OrderList orders={order.orders} />
                </div>
            )}
        </div>
    );
});

export default OrdersPage;