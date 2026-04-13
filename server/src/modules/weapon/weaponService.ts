import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

import weaponRepository from "./weaponRepository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type WeaponInfoInput = {
  title: string;
  description: string;
};

class WeaponService {
  async createWeapon(req: any) {
    const { name, price, brandId, typeId, info } = req.body;
    const img = req.files?.img;

    if (!img) {
      throw new Error("Image is required");
    }

    const fileName = uuidv4() + ".jpg";
    const filePath = path.resolve(__dirname, "..", "static", fileName);

    await img.mv(filePath);

    const weapon = await weaponRepository.createWeapon({
      name,
      price: Number(price),
      img: fileName,
      typeId: Number(typeId),
      brandId: Number(brandId),
    });

    if (info) {
      const parsedInfo: WeaponInfoInput[] = JSON.parse(info);

      await weaponRepository.createWeaponInfoMany(
        parsedInfo.map((i) => ({
          title: i.title,
          description: i.description,
          weaponId: weapon.id,
        }))
      );
    }

    return weapon;
  }

  async getAll(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 9;
    const offset = page * limit - limit;

    const where: any = {};

    if (query.brandId) where.brandId = Number(query.brandId);
    if (query.typeId) where.typeId = Number(query.typeId);

    const [weapons, count] = await Promise.all([
      weaponRepository.findAll(where, limit, offset),
      weaponRepository.count(where),
    ]);

    return {
      count,
      page,
      limit,
      row: weapons,
    };
  }

  async getOne(id: number) {
    return weaponRepository.findById(id);
  }
}

export default new WeaponService();