import { $authHost } from "../../../shared/api";
import type { BasketWeapon } from "../../../shared/types/types";

const API_URL = "/api/basket";

export const getBasket = async (): Promise<{ basketWeapons: BasketWeapon[] }> => {
    const { data } = await $authHost.get(`${API_URL}`);
    return data;
};

export const addToBasket = async (weaponId: number) => {
    const { data } = await $authHost.post(`${API_URL}/add`, { weaponId });
    return data;
};

export const removeOneFromBasket = async (weaponId: number) => {
    const { data } = await $authHost.put(`${API_URL}/${weaponId}`);
    return data;
};

export const removeFromBasket = async (weaponId: number) => {
    const { data } = await $authHost.delete(`${API_URL}/${weaponId}`);
    return data;
};