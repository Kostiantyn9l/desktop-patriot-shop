import basketRepository from "./basketRepository.js";

class BasketService {
  async add(userId: number, weaponId: number) {
    let basket = await basketRepository.findByUserId(userId);

    if (!basket) {
      basket = await basketRepository.create(userId);
    }

    const item = await basketRepository.findItem(basket.id, weaponId);

    if (item) {
      return basketRepository.updateItemQuantity(
        item.id,
        item.quantity + 1
      );
    }

    return basketRepository.createItem(basket.id, weaponId);
  }

  async get(userId: number) {
    const basket = await basketRepository.getFullBasket(userId);

    return basket ?? {
      id: null,
      userId,
      basketWeapons: [],
    };
  }

  async removeOne(userId: number, weaponId: number) {
    const basket = await basketRepository.findByUserId(userId);

    if (!basket) {
      throw new Error("Basket not found");
    }

    const item = await basketRepository.findItem(basket.id, weaponId);

    if (!item) {
      throw new Error("Item not found");
    }

    if (item.quantity > 1) {
      return basketRepository.updateItemQuantity(
        item.id,
        item.quantity - 1
      );
    }

    return basketRepository.deleteItem(item.id);
  }

  async remove(userId: number, weaponId: number) {
    const basket = await basketRepository.findByUserId(userId);

    if (!basket) {
      throw new Error("Basket not found");
    }

    return basketRepository.deleteMany(basket.id, weaponId);
  }
}

export default new BasketService();