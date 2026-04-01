import { createType } from "../ai/weaponApi";
import { useState } from "react";

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
        <section>
            <div>
                <div>
                    <h2>Додайте категорію</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Назва категорії" 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <button type="submit">Додати</button>
                </form>
            </div>
            <div>
                <button onClick={onClose}>Закрити</button>
            </div>
        </section>
    );
}

export default CreateCategory;