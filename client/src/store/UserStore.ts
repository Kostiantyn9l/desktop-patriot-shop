import { makeAutoObservable } from "mobx";
import type { User } from "../types/types";

export default class UserStore {
    private _isAuth: boolean = false;
    private _user: User = {};

    constructor() {
        const savedIsAuth = localStorage.getItem("isAuth");
        const savedUser = localStorage.getItem("user");

        if (savedIsAuth !== null) {
            this._isAuth = savedIsAuth === "true";
        }

        if (savedUser) {
            try {
                this._user = JSON.parse(savedUser);
            } catch {
                this._user = {};
            }
        }

        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean): void {
        this._isAuth = bool;
        localStorage.setItem("isAuth", String(bool));
    }

    setUser(user: User): void {
        this._user = user;
        try {
            localStorage.setItem("user", JSON.stringify(user));
        } catch {
            localStorage.removeItem("user");
        }
    }

    clearAuth(): void {
        this._isAuth = false;
        this._user = {};
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    get user(): User {
        return this._user;
    }
}