import { useState } from "react";
import { useStore } from "../../../shared/hooks/useStore";

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

    return (
        <div>
            <p>Введіть код</p>
            <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="FG25D5"
            />

            <button onClick={handleConfirm}>
                Підтвердити
            </button>
        </div>
    );
};

export default ConfirmOrderForm;