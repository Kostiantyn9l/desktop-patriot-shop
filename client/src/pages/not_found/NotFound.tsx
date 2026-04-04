import { Link } from "react-router-dom"
import { SHOP_ROUTE } from "../../shared/lib/consts"
import styles from "./NotFound.module.scss"

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <h2>Сторінка не знайдена</h2>

            <p>Сторінка, яку ви шукаєте, не існує.</p>

            <Link to={SHOP_ROUTE}>
                <button>Перейти на головну сторінку Patriot</button>
            </Link>
        </div>
    )
}

export default NotFound;