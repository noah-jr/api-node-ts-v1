import { Router, type Request, type Response } from "express";
import { auth, type userDTO } from "./auth.controller.js";
import {
  authMiddleware,
  type AuthRequest,
} from "@/middleware/auth.middleware.js";
import { PrismaClient } from "@/lib/prisma";

const prisma = new PrismaClient();

const message = Router();

interface messageDTO {
  user?: Omit<userDTO, "password">;
  text: string;
  createdAt?: Date;
  userId?: string;
}

message.post("", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { text }: messageDTO = req.body;

  if (!text) return res.status(400).json({ message: "Required fields" });

  const userId = req.user.id;

  const message = await prisma.message.create({ data: { text, userId } });

  res
    .status(201)
    .json({ message: "Register with success", object: { message } });
});

message.get("", authMiddleware, async (_: AuthRequest, res: Response) => {
  const messages = await prisma.message.findMany({
    include: { user: { select: { id: true, email: true, username: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({ message: null, object: { messages } });
});



export {message}