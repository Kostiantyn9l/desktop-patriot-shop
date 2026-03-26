import { useState } from "react";
import { useStore } from "../../../shared/hooks/useStore";

interface CreateWeaponProps {
    show: boolean;
    onClose: () => void;
}

interface WeaponInfo {
    title: string;
    description: string;
    number: number;
}

const CreateWeapon: React.FC<CreateWeaponProps> = ({show, onClose}) => {
    const { weapon } = useStore();

    const [info, setInfo] = useState<WeaponInfo[]>([]);
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");

    if (!show) return null;
    
    const addInfo = () => {
        setInfo([
            ...info, 
            { title: "", description: "", number: Date.now() }
        ]);
    };

    const changeInfo = (key: string, value: string, number: number) => {
        setInfo(info.map(i => 
            i.number === number 
                ? { ...i, [key]: value }
                : i
        ));
    };

    const removeInfo = (number: number) => {
        setInfo(info.filter(i => i.number !== number));
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            selectedType,
            selectedBrand,
            info
        });
    };

    return (
        <section>
            <h2>Додайте зброю</h2>

            <form onSubmit={handleSubmit}>
                {/* Категорія */}
                <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">Оберіть Категорію</option>
                    {weapon.types.map(type => (
                        <option 
                            key={type.id}
                            value={type.name}
                        >
                            {type.name}
                        </option>
                    ))}
                </select>

                {/* Бренд */}
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">Оберіть Бренд</option>
                    {weapon.brands.map(brand => (
                        <option 
                            key={brand.id} 
                            value={brand.name}
                        >
                            {brand.name}
                        </option>
                    ))}
                </select>

                <input type="text" placeholder="Назва зброї" />
                <input type="number" placeholder="Ціна зброї" />
                <input type="file" />
                
                {/* Характеристики */}
                <button type="button" onClick={addInfo}>
                    Додайте характеристику
                </button>

                {info.map(i => (
                    <div key={i.number}>
                        <input 
                            type="text" 
                            placeholder="Назва характеристики" 
                            value={i.title}
                            onChange={(e) => changeInfo("title", e.target.value, i.number)}
                        />
                        <input 
                            type="text" 
                            placeholder="Опис характеристики" 
                            value={i.description}
                            onChange={(e) => changeInfo("description", e.target.value, i.number)}
                        />
                        <button
                            type={"button"}
                            onClick={() => removeInfo(i.number)}
                        >
                            Видалити
                        </button>
                    </div>
                ))}

                <button type="button" onClick={onClose}>Закрити</button>
                <button type="submit">Додати</button>
            </form>
        </section>
    );
}

export default CreateWeapon;