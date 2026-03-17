import { Link } from "react-router-dom"
import { SHOP_ROUTE } from "../utils/consts"

const NotFound = () => {
    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>

            <p>The page you are looking for does not exist.</p>

            <Link to={SHOP_ROUTE}>
                <button>Go to Patriot Home</button>
            </Link>
        </div>
    )
}

export default NotFound;