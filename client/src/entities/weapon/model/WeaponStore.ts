import { makeAutoObservable } from "mobx";
import type { Brand, Type, Weapon } from "../../../shared/types/types";

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
    private _selectedType: Type | null = null;
    private _selectedBrand: Brand | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Setters
    setTypes(types: Type[]): void{ this._types = types}
    setBrands(brands: Brand[]): void { this._brands = brands }
    setSelectedType(type: Type | null): void { this._selectedType = type }
    setSelectedBrand(brand: Brand | null): void { this._selectedBrand = brand }
    setWeapons(weapons: Weapon[]): void { this._weapons = weapons }

    resetFilters(): void {
        this._selectedBrand = null;
        this._selectedType = null;
    }

    // Getters
    get types(): Type[] { return this._types; }
    get brands(): Brand[] { return this._brands; }
    get weapons(): Weapon[] { return this._weapons; }
    get type(): Type | null { return this._selectedType; }
    get brand(): Brand | null { return this._selectedBrand; }

    // Computed values
    get filteredWeapons(): Weapon[] {
        return this._weapons.filter(weapon => {
            const matchesType = this._selectedType ? weapon.id === this._selectedType.id : true;
            const matchesBrand = this._selectedBrand ? weapon.id === this._selectedBrand.id : true;
            return matchesType && matchesBrand;
        });
    }
}