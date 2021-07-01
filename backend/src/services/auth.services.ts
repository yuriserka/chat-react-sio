import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../common/env";

type JWTPayload = {
  id: string;
};

export function getToken(id: string) {
  return jwt.sign({ id }, JWT_SECRET);
}

export function validateAuth(token: string) {
  let userId: string | null;

  return jwt.verify(token, JWT_SECRET, (err: any, payload) => {
    userId = err ? null : (<JWTPayload>payload).id;
    return userId;
  });
}
