import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("", (_: Request, res: Response) => {
  res.status(200).json({ message: "Hello World, from API RestFull V1" });
});
app.use("/api/v1", routes);
app.use((_: Request, res: Response) => {
  res.status(200).json({ message: "Route not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
