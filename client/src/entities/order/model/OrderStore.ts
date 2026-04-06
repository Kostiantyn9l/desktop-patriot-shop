import { makeAutoObservable, runInAction } from "mobx";
import * as api from "../api/orderApi";
import type { Order } from "../../../shared/types/types";

export default class OrderStore {
    private _orders: Order[] = [];
    private _lastOrderCode: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Setters
    setOrders(orders: Order[]) { this._orders = orders; }
    setLastOrderCode(code: string | null) { this._lastOrderCode = code; }

    clearLastOrderCode() {
        this._lastOrderCode = null;
    }

    // Getters
    get orders(): Order[] { return this._orders; }
    get lastOrderCode(): string | null { return this._lastOrderCode; }

    createOrder = async (): Promise<string | null> => {
        try {
            const data = await api.createOrder();

            runInAction(() => {
                this.setLastOrderCode(data.code);
            });

            await this.fetchOrders();

            return data.code;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    fetchOrders = async () => {
        try {
            const data = await api.getUserOrders();

            runInAction(() => {
                this.setOrders(data);
            });
        } catch (e) {
            console.error(e);
        }
    };

    fetchAllOrders = async () => {
        try {
            const data = await api.getAllOrders();

            runInAction(() => {
                this.setOrders(data);
            });
        } catch (e) {
            console.error(e);
        }
    };

    confirmOrder = async (orderId: number, code: string) => {
        try {
            await api.confirmOrder(orderId, code);
            await this.fetchOrders();
        } catch (e) {
            console.error(e);
        }
    };

    cancelOrder = async (orderId: number) => {
        try {
            await api.cancelOrder(orderId);
            await this.fetchOrders();
        } catch (e) {
            console.error(e);
        }
    }
}