import { type FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../../shared/ui/modal/Modal";
import BasketList from "./BasketList";
import { useStore } from "../../../shared/hooks/useStore";

interface BasketModalProps {
    show: boolean;
    onClose: () => void;
}

const BasketModal: FC<BasketModalProps> = observer(({ show, onClose }) => {
    const { basket } = useStore();

    useEffect(() => {
        if (show) {
            basket.fetchBasket();
        }
    }, [show, basket]);

    return (
        <Modal open={show} onClose={onClose} title='Кошик'>
            {basket.items.length === 0 ? (
                <p>Кошик пустий</p>
            ) : (
                <BasketList items={basket.items} />
            )}
        </Modal>
    );
});

export default BasketModal;