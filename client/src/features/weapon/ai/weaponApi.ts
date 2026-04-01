import { $host, $authHost } from "../../../shared/api";

export const createType = async (type: string) => {
    const { data } = await $authHost.post('api/type/', { name: type });
    return data;
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type/');
    return data;
}

export const createBrand = async (brand: string) => {
    const { data } = await $authHost.post('api/brand/', { name: brand });
    return data;
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand/');
    return data;
}

export const createWeapon = async (weapon: string) => {
    const { data } = await $authHost.post('api/weapon/', { weapon });
    return data;
}

export const fetchWeapons = async () => {
    const { data } = await $host.get('api/weapon/');
    return data;
}
 
export const fetchOneWeapon = async (id: number) => {
    const { data } = await $host.get('api/weapon/' + id);
    return data;
}