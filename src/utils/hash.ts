import bcrypt from "bcrypt";
const SALT_PWD: string = process.env.SALT_PWD || "requireent";

const hashed = async (password: string): Promise<string> =>
  await bcrypt.hash(`${password}${SALT_PWD}`, 10);

const compare = async (textPlain: string, password: string): Promise<boolean> =>
  await bcrypt.compare(`${textPlain}${SALT_PWD}`, password);

export { hashed, compare };
