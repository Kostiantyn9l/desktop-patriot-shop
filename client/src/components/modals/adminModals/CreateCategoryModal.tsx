interface CreateCategoryProps {
    show: boolean;
    onClose: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({show, onClose}) => {
    if (!show) return null;

    return (
        <section>
            <div>
                <div>
                    <h2>Додайте категорію</h2>
                </div>
                <form>
                    <input type="text" placeholder="Назва категорії" />
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

export default CreateCategory;