import { $host, $authHost } from "../../../shared/api";

export const registration = async (name: string, email: string, password: string) => {
    const { data } = await $host.post('api/user/registration', { name, email, password });
    return data;
}

export const login = async (email: string, password: string) => {
    const { data } = await $host.post('api/user/login', { email, password });
    return data;
}

export const checkAuth = async () => {
    const { data } = await $authHost.get('api/user/auth');
    return data;
}