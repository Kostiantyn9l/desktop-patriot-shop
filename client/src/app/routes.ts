import type { ComponentType } from "react"
import Admin from "../pages/Admin"
import Shop from "../pages/Shop"
import { ADMIN_ROUTE, NOT_FOUND_ROUTE, SHOP_ROUTE, WEAPON_PAGE_ROUTE } from "../shared/lib/consts"
import NotFound from "../pages/NotFound"
import WeaponPage from "../pages/WeaponPage"

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
    }, 
    {
        path: `${WEAPON_PAGE_ROUTE}/:id`,
        Component: WeaponPage
    }
]

export const errorRoutes: AppRoute[] = [
    {
        path: NOT_FOUND_ROUTE,
        Component: NotFound
    }
]