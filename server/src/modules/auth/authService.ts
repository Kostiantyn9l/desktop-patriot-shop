import prisma from "../../common/lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets.js";

type JWTpayload = {
  id: number;
  role: string;
};

const generateJWT = (payload: JWTpayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

class AuthService {
  async register(name: string, email: string, password: string) {
    const exists = await prisma.user.findFirst({ where: { email } });

    if (exists) {
      throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });

    await prisma.basket.create({
      data: { userId: user.id },
    });

    const token = generateJWT({ id: user.id, role: user.role });

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      throw new Error("Wrong password");
    }

    const token = generateJWT({ id: user.id, role: user.role });

    return { user, token };
  }

  refresh(user: any) {
    const token = generateJWT({
      id: user.id,
      role: user.role,
    });

    return { token };
  }
}

export default new AuthService();