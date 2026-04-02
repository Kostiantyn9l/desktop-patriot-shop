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