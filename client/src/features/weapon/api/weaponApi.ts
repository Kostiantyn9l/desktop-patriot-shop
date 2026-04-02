import { $host, $authHost } from "../../../shared/api";
import { type FetchWeaponsParams } from "../../../shared/types/types";

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

export const createWeapon = async (weaponData: FormData) => {
    const { data } = await $authHost.post('api/weapon/', weaponData);
    return data;
}

export const fetchWeapons = async (
    typeId?: number, 
    brandId?: number, 
    page: number = 1, 
    limit: number = 3, 
) => {
    const params: FetchWeaponsParams = { page, limit }

    if (typeId !== undefined) params.typeId = typeId;
    if (brandId !== undefined) params.brandId = brandId;

    const { data } = await $host.get('api/weapon/', { params });
    return data;
}
 
export const fetchOneWeapon = async (id: number) => {
    const { data } = await $host.get('api/weapon/' + id);
    return data;
}