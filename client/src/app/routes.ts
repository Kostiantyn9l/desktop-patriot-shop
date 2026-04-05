import type { ComponentType } from "react"
import Admin from "../pages/admin/Admin"
import Shop from "../pages/shop/Shop"
import { ADMIN_ROUTE, NOT_FOUND_ROUTE, ORDERS_ROUTE, SHOP_ROUTE, WEAPON_PAGE_ROUTE } from "../shared/lib/consts"
import NotFound from "../pages/not_found/NotFound"
import WeaponPage from "../pages/weapon_page/WeaponPage"
import OrdersPage from "../pages/orders/OrderPage"

interface AppRoute {
    path: string,
    Component: ComponentType
}

export const adminRoutes: AppRoute[] = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
];

export const authRoutes: AppRoute[] = [
    {
        path: ORDERS_ROUTE,
        Component: OrdersPage
    }
];

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