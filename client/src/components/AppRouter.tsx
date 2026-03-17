import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, errorRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
    const isAuth = false;

    const routes = [
        ...(isAuth ? authRoutes : []),
        ...publicRoutes,
        ...errorRoutes
    ]

    return (
        <Routes>
            {routes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            <Route path="*" element={<Navigate to={'/404'} />}/>
        </Routes>
    );
};

export default AppRouter;