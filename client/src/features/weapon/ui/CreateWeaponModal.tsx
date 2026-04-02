import { useState, useEffect } from "react";
import { useStore } from "../../../shared/hooks/useStore";
import { fetchBrands, fetchTypes, createWeapon } from "../api/weaponApi";
import { type WeaponInfo } from "../../../shared/types/types";

interface CreateWeaponProps {
    show: boolean;
    onClose: () => void;
}

const CreateWeapon: React.FC<CreateWeaponProps> = ({show, onClose}) => {
    const { weapon } = useStore();

    useEffect(() => { 
        if (weapon.types.length === 0) {
            fetchTypes().then(data => weapon.setTypes(data))
        }
        if (weapon.brands.length === 0) {
            fetchBrands().then(data => weapon.setBrands(data))
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
    const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
    const [info, setInfo] = useState<WeaponInfo[]>([]);

    if (!show) return null;
    
    const addInfo = () => {
        setInfo([
            ...info, 
            { id: Date.now(), title: "", description: "" }
        ]);
    };

    const changeInfo = (key: string, value: string, number: number) => {
        setInfo(info.map(i => 
            i.id === number 
                ? { ...i, [key]: value }
                : i
        ));
    };

    const removeInfo = (id: number) => {
        setInfo(info.filter(i => i.id !== id));
    }

    const preparedInfo = info
        .filter(i => i.title && i.description)
        .map(({ title, description }) => ({
            title,
            description
    }));

    const addWeapon = () => {
        if (!file || !selectedTypeId || !selectedBrandId || !name || !price) {
            return;
        }

        const weaponData = new FormData();

        weaponData.append('name', name);
        weaponData.append('price', price.toString());
        weaponData.append('img', file);
        weaponData.append('typeId', selectedTypeId.toString());
        weaponData.append('brandId', selectedBrandId.toString());
        weaponData.append('info', JSON.stringify(preparedInfo));

        createWeapon(weaponData).then(() => {
            setName('');
            setPrice(0);
            setFile(null);
            setSelectedTypeId(null);
            setSelectedBrandId(null);
            setInfo([]);

            onClose();
        });
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            name,
            price,
            file,
            selectedTypeId,
            selectedBrandId,
            preparedInfo
        });
        addWeapon();
    };

    return (
        <section>
            <h2>Додайте зброю</h2>
            {/* Додавання категорії / бренду */}
            <form onSubmit={handleSubmit}>
                {/* Категорія */}
                <select 
                    value={selectedTypeId ?? ""}
                    onChange={(e) => setSelectedTypeId(Number(e.target.value))}
                >
                    <option value="">Оберіть категорію</option>
                    {weapon.types.map(type => (
                        <option 
                            key={type.id}
                            value={type.id}
                        >
                            {type.name}
                        </option>
                    ))}
                </select>

                {/* Бренд */}
                <select
                    value={selectedBrandId ?? ""}
                    onChange={(e) => setSelectedBrandId(Number(e.target.value))}
                >
                    <option value="">Оберіть бренд</option>
                    {weapon.brands.map(brand => (
                        <option 
                            key={brand.id}
                            value={brand.id}
                        >
                            {brand.name}
                        </option>
                    ))}
                </select>
                
                {/* INPUTS */}
                <input 
                    type="text" 
                    placeholder="Назва зброї"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Ціна зброї"
                    value={price || ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <input 
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                />

                {/* Характеристики */}
                <button type="button" onClick={addInfo}>
                    Додайте характеристику
                </button>

                {info.map(i => (
                    <div key={i.id}>
                        <input 
                            type="text" 
                            placeholder="Назва характеристики" 
                            value={i.title}
                            onChange={(e) => changeInfo("title", e.target.value, i.id)}
                        />
                        <input 
                            type="text" 
                            placeholder="Опис характеристики" 
                            value={i.description}
                            onChange={(e) => changeInfo("description", e.target.value, i.id)}
                        />
                        <button
                            type={"button"}
                            onClick={() => removeInfo(i.id)}
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