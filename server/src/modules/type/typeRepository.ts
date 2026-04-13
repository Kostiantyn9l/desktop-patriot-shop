import prisma from "../../common/lib/prisma.js";

class TypeRepository {
  create(name: string) {
    return prisma.type.create({
      data: { name },
    });
  }

  findAll() {
    return prisma.type.findMany();
  }
}

export default new TypeRepository();