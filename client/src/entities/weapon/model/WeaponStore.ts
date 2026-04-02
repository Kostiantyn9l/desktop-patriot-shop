import { makeAutoObservable } from "mobx";
import type { Brand, Type, Weapon } from "../../../shared/types/types";

export default class WeaponStore {
    private _types: Type[] = [];
    private _brands: Brand[] = [];
    private _weapons: Weapon[] = [];
    private _selectedType: Type | null = null;
    private _selectedBrand: Brand | null = null;
    private _page: number = 1;
    private _totalCount: number = 0;
    private _limit: number = 2;

    constructor() {
        makeAutoObservable(this);
    }

    // Setters
    setTypes(types: Type[]): void{ this._types = types}
    setBrands(brands: Brand[]): void { this._brands = brands }
    setSelectedType(type: Type | null): void {
        this._selectedType = type;
        this._page = 1;
    }
    setSelectedBrand(brand: Brand | null): void {
        this._selectedBrand = brand;
        this._page = 1;
    }
    setWeapons(weapons: Weapon[]): void { this._weapons = weapons }
    setPage(page: number) { this._page = page }
    setTotalCount(totalCount: number) { this._totalCount = totalCount }
    setLimit(limit: number) { this._limit = limit; }

    resetFilters(): void {
        this._selectedBrand = null;
        this._selectedType = null;
        this._page = 1;
    }

    // Getters
    get types(): Type[] { return this._types; }
    get brands(): Brand[] { return this._brands; }
    get weapons(): Weapon[] { return this._weapons; }
    get type(): Type | null { return this._selectedType; }
    get brand(): Brand | null { return this._selectedBrand; }
    get page(): number { return this._page; }
    get totalCount(): number { return this._totalCount; }
    get limit(): number { return this._limit; }

    // Computed values
    get filteredWeapons(): Weapon[] {
        return this._weapons.filter(weapon => {
            const matchesType = this._selectedType ? weapon.typeId === this._selectedType.id : true;
            const matchesBrand = this._selectedBrand ? weapon.brandId === this._selectedBrand.id : true;
            return matchesType && matchesBrand;
        });
    }
}