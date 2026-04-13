import prisma from "../../common/lib/prisma.js";

class BasketRepository {
  findByUserId(userId: number) {
    return prisma.basket.findFirst({
      where: { userId },
    });
  }

  create(userId: number) {
    return prisma.basket.create({
      data: { userId },
    });
  }

  findItem(basketId: number, weaponId: number) {
    return prisma.basketWeapon.findFirst({
      where: { basketId, weaponId },
    });
  }

  createItem(basketId: number, weaponId: number) {
    return prisma.basketWeapon.create({
      data: { basketId, weaponId, quantity: 1 },
    });
  }

  updateItemQuantity(id: number, quantity: number) {
    return prisma.basketWeapon.update({
      where: { id },
      data: { quantity },
    });
  }

  deleteItem(id: number) {
    return prisma.basketWeapon.delete({
      where: { id },
    });
  }

  deleteMany(basketId: number, weaponId: number) {
    return prisma.basketWeapon.deleteMany({
      where: { basketId, weaponId },
    });
  }

  getFullBasket(userId: number) {
    return prisma.basket.findFirst({
      where: { userId },
      include: {
        basketWeapons: {
          include: { weapon: true },
        },
      },
    });
  }
}

export default new BasketRepository();