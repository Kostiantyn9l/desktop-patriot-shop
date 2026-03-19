import { makeAutoObservable } from "mobx";
import type { User } from "../types/types";

export default class UserStore {
    private _isAuth: boolean = false;
    private _user: User = {};

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean): void {
        this._isAuth = bool;
    }
    setUser(user: User): void {
        this._user = user;
    }

    get isAuth(): boolean {
        return this._isAuth;
    }
    get user(): User {
        return this._user;
    }
}