import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("", (_: Request, res: Response) => {
  res.status(200).json({ message: "Hello World, from API RestFull V1" });
});

app.get("*", (_: Request, res: Response) => {
  res.status(200).json({ message: "Route not found" });
});
