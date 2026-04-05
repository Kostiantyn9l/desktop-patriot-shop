import { $authHost } from "../../../shared/api";
import type { Order } from "../../../shared/types/types";

export const createOrder = async () => {
    const { data } = await $authHost.post('/api/order');
    return data;
};

export const getUserOrders = async (): Promise<Order[]> => {
    const { data } = await $authHost.get('/api/order');
    return data;
};

export const getAllOrders = async (): Promise<Order[]> => {
    const { data } = await $authHost.get('/api/order/all');
    return data;
};

export const confirmOrder = async (orderId: number, code: string) => {
    const { data } = await $authHost.post('/api/order/confirm', { orderId, code });
    return data;
};