import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, errorRoutes, publicRoutes } from "./routes";
import { useMemo, type FC } from "react";
import Layout from "../widgets/Layout/Layout";
import { observer } from "mobx-react-lite";
import { useStore } from "../shared/hooks/useStore";

const AppRouter: FC = observer(() => {
    const { user } = useStore();

    const routes = useMemo(() => [
        ...(user.isAuth ? authRoutes : []),
        ...publicRoutes,
        ...errorRoutes
    ], [user.isAuth]);

    return (
        <Routes>
            <Route element={<Layout />}>
                {routes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>

            <Route path="*" element={<Navigate to={'/404'} />}/>
        </Routes>
    );
});

export default AppRouter;