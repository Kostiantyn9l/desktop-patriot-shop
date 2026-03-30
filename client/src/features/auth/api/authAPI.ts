import { $host, $authHost } from "../../../shared/api";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: number,
    role: string
}

export const registration = async (name: string, email: string, password: string) => {
    const { data } = await $host.post('api/user/registration', { name, email, password });
    localStorage.setItem('token', data.token);
    return { 
        ...data, 
        decodedToken: jwtDecode<JwtPayload>(data.token)
    };
}

export const login = async (email: string, password: string) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return { 
        ...data, 
        decodedToken: jwtDecode<JwtPayload>(data.token)
    };
}

export const checkAuth = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return { 
        ...data, 
        decodedToken: jwtDecode<JwtPayload>(data.token)
    };
}