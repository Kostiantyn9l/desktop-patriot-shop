import { useState } from "react";
import { createBrand } from "../ai/weaponApi";

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
        <section>
            <div>
                <div>
                    <h2>Додайте бренд</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Назва бренду"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)} 
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

export default CreateBrand;