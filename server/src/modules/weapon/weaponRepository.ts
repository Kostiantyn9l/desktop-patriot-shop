import prisma from "../../common/lib/prisma.js";
import { Prisma } from "../../../prisma/generated/prisma/client.js";

class WeaponRepository {
  createWeapon(data: {
    name: string;
    price: number;
    img: string;
    typeId: number;
    brandId: number;
  }) {
    return prisma.weapon.create({ data });
  }

  createWeaponInfoMany(data: {
    title: string;
    description: string;
    weaponId: number;
  }[]) {
    return prisma.weaponInfo.createMany({ data });
  }

  findAll(where: Prisma.WeaponWhereInput, take: number, skip: number) {
    return prisma.weapon.findMany({
      where,
      orderBy: { id: "asc" },
      take,
      skip,
    });
  }

  count(where: Prisma.WeaponWhereInput) {
    return prisma.weapon.count({ where });
  }

  findById(id: number) {
    return prisma.weapon.findUnique({
      where: { id },
      include: { info: true },
    });
  }
}

export default new WeaponRepository();