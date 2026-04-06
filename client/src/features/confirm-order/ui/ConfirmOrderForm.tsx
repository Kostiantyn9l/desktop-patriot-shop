import { useState } from "react";
import { useStore } from "../../../shared/hooks/useStore";
import styles from "./ConfirmOrderForm.module.scss";

interface Props {
    orderId: number;
}

const ConfirmOrderForm = ({ orderId }: Props) => {
    const { order } = useStore();
    const [code, setCode] = useState("");

    const handleConfirm = async () => {
        await order.confirmOrder(orderId, code);
        setCode("");
    };

    const handleCancel = async () => {
        await order.cancelOrder(orderId);
        setCode("");
    };

    return (
        <div className={styles.confirmForm}>
            <p>Введіть код</p>

            <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="FG25D5"
            />

            <div className={styles.actions}>
                <button
                className={styles.confirm}
                onClick={handleConfirm}
                >
                Підтвердити
                </button>

                <button
                className={styles.cancel}
                onClick={handleCancel}
                >
                Скасувати
                </button>
            </div>
        </div>
    );
};

export default ConfirmOrderForm;