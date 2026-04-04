import { makeAutoObservable, runInAction } from "mobx";
import * as api from "./basketApi";
import type { BasketWeapon } from "../../../shared/types/types";

export default class BasketStore {
    private _items: BasketWeapon[] = [];
    private _loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Setters
    setItems(items: BasketWeapon[]) { this._items = items; }
    setLoading(bool: boolean) { this._loading = bool; }

    // Getters
    get items(): BasketWeapon[] { return this._items; }
    get loading(): boolean { return this._loading; }

    fetchBasket = async () => {
        this.setLoading(true);
        try {
            const data = await api.getBasket();
            runInAction(() => {
                this.setItems(data.basketWeapons || []);
            });
        } catch (err) {
            console.error(err);
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    addToBasket = async (weaponId: number) => {
        try {
            await api.addToBasket(weaponId);
            await this.fetchBasket();
        } catch (err) {
            console.error(err);
        }
    };

    removeOneFromBasket = async (weaponId: number) => {
        try {
            await api.removeOneFromBasket(weaponId);
            await this.fetchBasket();
        } catch (err) {
            console.error(err);
        }
    };

    removeFromBasket = async (weaponId: number) => {
        try {
            await api.removeFromBasket(weaponId);
            await this.fetchBasket();
        } catch (err) {
            console.error(err);
        }
    };
}