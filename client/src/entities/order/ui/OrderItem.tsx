import { type FC } from "react";
import type { Order } from "../../../shared/types/types";
import { useStore } from "../../../shared/hooks/useStore";
import ConfirmOrderForm from "../../../features/confirm-order/ui/ConfirmOrderForm";
import styles from "./OrderItem.module.scss";

interface Props {
    order: Order;
}

const OrderItem: FC<Props> = ({ order }) => {
    const { user } = useStore();

    return (
        <div className={styles.orderItem}>
            <div className={styles.header}>
                <h3>Замовлення #{order.id}</h3>
                <p>Статус: {order.status}</p>
                <p>Сума: {order.total}₴</p>
                <p>Код: {order.code}</p>
            </div>

            <div className={styles.items}>
                <strong>Товари:</strong>
                {order.items.map(item => (
                <div key={item.id}>
                    {item.weapon.name} x {item.quantity}
                </div>
                ))}
            </div>

            {user.user?.role === "ADMIN" && order.status === "PENDING" && (
                <div className={styles.confirmForm}>
                <ConfirmOrderForm orderId={order.id} />
                </div>
            )}
        </div>
    );
};

export default OrderItem;