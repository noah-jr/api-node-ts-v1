import { Router } from "express";
import { auth } from "@/controllers/auth.controller";
import { message } from "@/controllers/message.controller";

export const routes = Router();

routes.use("/auth", auth);
routes.use("/messages", message);
