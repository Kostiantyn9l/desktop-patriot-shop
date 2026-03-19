import { makeAutoObservable } from "mobx";
import type { Brand, Type, Weapon } from "../types/types";

export default class WeaponStore {
    private _types: Type[] = [
        {id: 1, name: 'Lox'},
        {id: 2, name: 'Popa'}
    ];
    private _brands: Brand[] = [
        {id: 1, name: 'ishowspeed'},
        {id: 2, name: 'ishowboobie'}
    ];
    private _weapons: Weapon[] = [
        {id: 1, name: 'tratata', price: 25000, rating: 5, img: 'https'},
        {id: 2, name: 'boom', price: 25000, rating: 5, img: 'https'}
    ];

    constructor() {
        makeAutoObservable(this);
    }

    setTypes(types: Type[]): void{
        this._types = types
    }
    setBrands(brands: Brand[]): void {
        this._brands = brands
    }
    setWeapons(weapons: Weapon[]): void {
        this._weapons = weapons
    }

    get types(): Type[] {
        return this._types;
    }
    get brands(): Brand[] {
        return this._brands;
    }
    get weapons(): Weapon[] {
        return this._weapons;
    }
}