import { type FC } from "react";
import type { Order } from "../../../shared/types/types";
import OrderItem from "./OrderItem";
import styles from "./OrderList.module.scss";

interface Props {
    orders: Order[];
}

const OrderList: FC<Props> = ({ orders }) => {
    return (
        <div className={styles.orderList}>
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
};

export default OrderList;