import { createType } from "../api/weaponApi";
import { useState } from "react";
import Modal from "../../../shared/ui/modal/Modal";
import styles from "./CreateModal.module.scss"

interface CreateCategoryProps {
    show: boolean;
    onClose: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({show, onClose}) => {
    const [type, setType] = useState<string>('');
    
    if (!show) return null;

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!type) return;

        createType(type).then(() => {
            setType('');
            onClose();
        })
    }

    return (
        <Modal open={show} onClose={onClose} title="Додати категорію">
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Вогнепальна Зброя"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <div className={styles.actions}>
                    <button type="submit">Додати</button>
                    <button type="button" onClick={onClose}>Закрити</button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateCategory;