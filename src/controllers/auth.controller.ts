import { compare, hashed } from "@/utils/hash.js";
import { signinToken } from "@/utils/jwt.js";
import { PrismaClient } from "@/lib/prisma";
import { Router, type Request, type Response } from "express";

const auth = Router();

export interface userDTO {
  id?: string | number;
  email: string;
  password: string;
  username: string;
}

const prisma = new PrismaClient();
auth.post("/signup", async (req: Request, res: Response) => {
  let { email, password, username }: userDTO = req.body;
  if (!email || !password || !username)
    return res.status(400).json({ message: "Required fields" });

  password = await hashed(password);
  try {
    const user = await prisma.user.create({
      data: { email, password, username },
    });
    const token = signinToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    const { password: pwd, ...rest } = user;
    res
      .status(201)
      .json({ message: "Signup with success", object: { ...rest } });
  } catch (error) {
    res.status(400).json({ message: "Error to signup" });
  }
});

auth.post("/signin", async (req: Request, res: Response) => {
  const { email, password }: userDTO = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Required fiels" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await compare(password, user.password);

  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const { createdAt, password: pwd, ...rest } = user;
  const token = signinToken({ ...rest });

  res
    .status(200)
    .json({ message: "Signin with success ", object: { token, user: rest } });
});

export { auth };
