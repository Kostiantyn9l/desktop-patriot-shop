import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, errorRoutes, publicRoutes } from "../routes";
import { useContext, type FC } from "react";
import { Context } from "../main";
import Layout from "./Layout";
import { observer } from "mobx-react-lite";

const AppRouter: FC = observer(() => {
    const context = useContext(Context);
    if(!context) {
        throw new Error("Context not provided");
    }

    const { user } = context;
    console.log(user);

    const routes = [
        ...(user.isAuth ? authRoutes : []),
        ...publicRoutes,
        ...errorRoutes
    ]

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