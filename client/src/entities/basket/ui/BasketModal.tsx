import { type FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../../shared/ui/modal/Modal";
import BasketList from "./BasketList";
import { useStore } from "../../../shared/hooks/useStore";
import styles from "./BasketModal.module.scss";

interface BasketModalProps {
    show: boolean;
    onClose: () => void;
}

const BasketModal: FC<BasketModalProps> = observer(({ show, onClose }) => {
    const { basket, order } = useStore();

    useEffect(() => {
        if (show) {
            basket.fetchBasket();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const handleCreateOrder = async () => {
        await order.createOrder();
        await basket.fetchBasket();
    };

    return (
        <Modal open={show} onClose={onClose} title="Кошик">
            <div className={styles.basketModal}>
                {order.lastOrderCode ? (
                    <div className={styles.orderSuccess}>
                        <p>Ваш код замовлення:</p>
                        <strong className={styles.orderCode}>
                        {order.lastOrderCode}
                        </strong>

                        <button
                        className={styles.secondaryButton}
                        onClick={() => {
                            order.clearLastOrderCode();
                            onClose();
                        }}
                        >
                        Закрити
                        </button>
                    </div>
                ) : basket.items.length === 0 ? (
                    <p className={styles.empty}>Кошик пустий</p>
                ) : (
                    <>
                        <BasketList items={basket.items} />

                        <div className={styles.actions}>
                        <button
                            className={styles.primaryButton}
                            onClick={handleCreateOrder}
                        >
                            Оформити замовлення
                        </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
});

export default BasketModal;