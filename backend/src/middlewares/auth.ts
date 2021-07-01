import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../common/env";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(Error("token not found"));
  }
  const [scheme, token] = authorization.split(" ");
  if (!scheme || !/^Bearer$/i.test(scheme) || !token) {
    return next(Error("malformed token"));
  }

  jwt.verify(token, JWT_SECRET, (err: any, payload) => {
    if (err) {
      return next(Error("invalid token"));
    }
    res.locals.userId = (<any>payload).id;
    return next();
  });
}
