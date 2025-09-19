import { verifyToken } from "@/utils/jwt.js";
import type { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: "Not Authorized" });
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not Authorized" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized" });
  }
};
