import brandRepository from "./brandRepository.js";

class BrandService {
  async create(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error("Name is required");
    }

    return brandRepository.create(name);
  }

  async getAll() {
    return brandRepository.findAll();
  }
}

export default new BrandService();