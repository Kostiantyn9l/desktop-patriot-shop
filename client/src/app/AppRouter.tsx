import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, errorRoutes, publicRoutes, adminRoutes } from "./routes";
import { useMemo, type FC } from "react";
import Layout from "../widgets/Layout/Layout";
import { observer } from "mobx-react-lite";
import { useStore } from "../shared/hooks/useStore";

const AppRouter: FC = observer(() => {
    const { user } = useStore();

    const routes = useMemo(() => [    
        ...publicRoutes,
        ...(user.isAuth ? authRoutes : []),
        ...(user.user?.role === "ADMIN" ? adminRoutes : []),
        ...errorRoutes
    ], [user.isAuth, user.user?.role]);

    return (
        <Routes>
            <Route element={<Layout />}>
                {routes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>

            <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
    );
});

export default AppRouter;