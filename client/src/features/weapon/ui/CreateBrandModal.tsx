import { useState } from "react";
import { createBrand } from "../api/weaponApi";
import Modal from "../../../shared/ui/modal/Modal";
import styles from "./CreateModal.module.scss"

interface CreateBrandProps {
    show: boolean;
    onClose: () => void;
}

const CreateBrand: React.FC<CreateBrandProps> = ({show, onClose}) => {
    const [brand, setBrand] = useState<string>('');
    
    if (!show) return null;

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!brand) return;

        createBrand(brand).then(() => {
            setBrand('');
            onClose();
        })
    }

    return (
        <Modal open={show} onClose={onClose} title="Додати бренд">
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="ARM Defence"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)} 
                />

                <div className={styles.actions}>
                    <button type="submit">Додати</button>
                    <button type="button" onClick={onClose}>Закрити</button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateBrand;