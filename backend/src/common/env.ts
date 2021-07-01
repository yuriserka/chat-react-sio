import { config } from "dotenv-safe";
config();

export const JWT_SECRET = process.env.JWT_SECRET!;
