import { makeAutoObservable } from "mobx";

export default class UserStore {
    _isAuth: boolean;
    _user: Record<string>;

    constructor() {
        this._isAuth = false;
        this._user = {}
        makeAutoObservable(this);
    }

    setIsAuth(boolean) {
        this._isAuth = boolean
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
}