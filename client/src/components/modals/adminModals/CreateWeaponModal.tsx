interface CreateWeaponProps {
    show: boolean;
    onClose: () => void;
}

const CreateWeapon: React.FC<CreateWeaponProps> = ({show, onClose}) => {
    if (!show) return null;

    return (
        <section>
            <div>
                <div>
                    <h2>Додайте зброю</h2>
                </div>
                <form>
                    <input type="text" placeholder="Назва зброї" />
                    <button type="submit">Додати</button>
                </form>
            </div>
            <div>
                <button onClick={onClose}>Закрити</button>
                <button>Додати</button>
            </div>
        </section>
    );
}

export default CreateWeapon;