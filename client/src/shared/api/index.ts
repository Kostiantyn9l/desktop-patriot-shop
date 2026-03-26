import axios, {type InternalAxiosRequestConfig, AxiosHeaders} from "axios";

const $host = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL
});

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
        config.headers = new AxiosHeaders();
    }
    config.headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost }