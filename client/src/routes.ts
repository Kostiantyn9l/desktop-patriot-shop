import type { ComponentType } from "react"
import Admin from "./pages/Admin"
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, NOT_FOUND_ROUTE, SHOP_ROUTE } from "./utils/consts"
import NotFound from "./pages/NotFound"

interface AppRoute {
    path: string,
    Component: ComponentType
}

export const authRoutes: AppRoute[] = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publicRoutes: AppRoute[] = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    }
]

export const errorRoutes: AppRoute[] = [
    {
        path: NOT_FOUND_ROUTE,
        Component: NotFound
    }
]