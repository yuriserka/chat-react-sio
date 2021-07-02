import { config } from "dotenv-safe";
import { v4 as uuid } from "uuid";
config();

export const JWT_SECRET = process.env.JWT_SECRET!;

export const adminId = uuid();
