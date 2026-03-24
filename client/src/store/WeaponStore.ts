import { makeAutoObservable } from "mobx";
import type { Brand, Type, Weapon } from "../types/types";

export default class WeaponStore {
    private _types: Type[] = [
        {id: 1, name: 'Зброя та патрони'},
        {id: 2, name: 'Оптика та кріплення'},
        {id: 3, name: 'Ножі та інструменти'},
        {id: 4, name: 'Догляд та зберігання'},
        {id: 5, name: 'Екіпірування'},
        {id: 6, name: 'Самозахист'}
    ];
    private _brands: Brand[] = [
        {id: 1, name: 'A&F'},
        {id: 2, name: 'Air Pistol'}
    ];
    private _weapons: Weapon[] = [
        {id: 1, name: 'tratata', price: 25000, rating: 5, img: 'https'},
        {id: 2, name: 'boom', price: 25000, rating: 5, img: 'https'}
    ];
    private _selectedType: Type = {};
    private _selectedBrand: Brand = {};

    constructor() {
        makeAutoObservable(this);
    }

    setTypes(types: Type[]): void{
        this._types = types
    }

    setBrands(brands: Brand[]): void {
        this._brands = brands
    }

    setSelectedType(type: Type): void {
        this._selectedType = type
    }
    setSelectedBrand(brand: Brand): void {
        this._selectedBrand = brand
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

    get type(): Type {
        return this._selectedType;
    }

    get brand(): Brand {
        return this._selectedBrand;
    }
}