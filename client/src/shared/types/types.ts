export interface Type {
    id: number;
    name: string;
}

export interface Brand {
    id: number;
    name: string;
}

export interface Weapon {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
    typeId: number;
    brandId: number;
    info: WeaponInfo[];
}

export interface WeaponInfo {
    id: number;
    title: string;
    description: string;
}

export interface User {
    id: number;
    email: string;
    role: string;
}

export type FetchWeaponsParams = {
    page: number;
    limit: number;
    typeId?: number;
    brandId?: number;
};

export interface BasketWeapon {
    id: number;
    quantity: number;
    weapon: {
        id: number;
        name: string;
        price: number;
        img: string;
    };
}

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    weapon: {
        id: number;
        name: string;
        price: number;
    };
}

export interface Order {
    id: number;
    code: string;
    status: OrderStatus;
    total: number;
    createdAt: string;
    items: OrderItem[];
    user: {
        name: string;
        email: string;
    };
}