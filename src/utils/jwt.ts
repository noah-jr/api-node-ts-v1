import jwt from "jsonwebtoken";
const JWT_SECRET: string = process.env.JWT_SECRET || "your_jwt_secret";

const signinToken = (payload: object, expiresIn: any = "1h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as any;
};

export { signinToken, verifyToken };
