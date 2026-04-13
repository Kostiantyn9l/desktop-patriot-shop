import prisma from "../../common/lib/prisma.js";

class BrandRepository {
  create(name: string) {
    return prisma.brand.create({
      data: { name },
    });
  }

  findAll() {
    return prisma.brand.findMany();
  }
}

export default new BrandRepository();