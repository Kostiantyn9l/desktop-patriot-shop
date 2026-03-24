interface CreateBrandProps {
    show: boolean;
    onClose: () => void;
}

const CreateBrand: React.FC<CreateBrandProps> = ({show, onClose}) => {
    if (!show) return null;

    return (
        <section>
            <div>
                <div>
                    <h2>Додайте бренд</h2>
                </div>
                <form>
                    <input type="text" placeholder="Назва бренду" />
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

export default CreateBrand;