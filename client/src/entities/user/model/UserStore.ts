import { makeAutoObservable } from "mobx";
import type { User } from "../../../shared/types/types";

export default class UserStore {
    private _isAuth: boolean = false;
    private _user: User | null = null;

    constructor() {
        makeAutoObservable(this);

        const savedIsAuth = localStorage.getItem("isAuth");
        const savedUser = localStorage.getItem("user");

        if (savedIsAuth !== null) {
            this._isAuth = savedIsAuth === "true";
        }

        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                this._user = parsed as User;
            } catch {
                this._user = null;
            }
        }
    }

    setIsAuth(bool: boolean): void {
        this._isAuth = bool;
        localStorage.setItem("isAuth", String(bool));
    }

    setUser(user: User | null): void {
        this._user = user;
        if (user) {
            try {
                localStorage.setItem("user", JSON.stringify(user));
            } catch {
                localStorage.removeItem("user");
            }
        } else {
            localStorage.removeItem("user");
        }
    }

    clearAuth(): void {
        this._isAuth = false;
        this._user = null;
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    get user(): User | null {
        return this._user;
    }
}