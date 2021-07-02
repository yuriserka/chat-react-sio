import { Router as createRouter } from "express";
import authMiddleware from "./middlewares/auth";
import { getToken } from "./services/auth.services";
import { findRoomById, findRoomsByUserId } from "./services/room.services";
import {
  findOrCreateUser,
  findUserById,
  findUserByUsername,
} from "./services/user.services";

const router = createRouter();

router.post("/login", async (req, res, next) => {
  const { username, password, ...rest } = req.body;

  const foundUser = await findUserByUsername(username);

  if (foundUser) {
    if (password !== foundUser.password) {
      return next(Error("invalid password"));
    }
    return res.status(200).json({
      ...foundUser,
      token: getToken(foundUser.id),
    });
  } else {
    const newUser = await findOrCreateUser({ username, password, ...rest });
    return res.status(201).json({
      ...newUser,
      token: getToken(newUser.id),
    });
  }
});

router.get("/users/me", authMiddleware, async (_, res) => {
  const user = await findUserById(res.locals.userId);
  res.status(200).json(user);
});

router.get("/rooms/me", authMiddleware, async (_, res) => {
  const rooms = await findRoomsByUserId(res.locals.userId);
  res.status(200).json(rooms);
});

router.get("/", (_, res) => {
  res.json({
    ok: true,
    date: new Date().toLocaleString(),
  });
});

export default router;
