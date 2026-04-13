import typeRepository from "./typeRepository.js";

class TypeService {
  async create(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error("Name is required");
    }

    return typeRepository.create(name);
  }

  async getAll() {
    return typeRepository.findAll();
  }
}

export default new TypeService();