import { Router as createRouter } from "express";
import authMiddleware from "./middlewares/auth";
import { getToken } from "./services/auth.services";
import {
  createUser,
  findUserById,
  findUserByUsername,
} from "./services/user.services";

const router = createRouter();

router.post("/login", async (req, res, next) => {
  const { username, password, ...rest } = req.body;

  let user = await findUserByUsername(username);

  if (user) {
    if (password !== user.password) {
      return next(Error("invalid password"));
    }
  } else {
    user = await createUser({ username, password, ...rest });
  }
  return res.status(201).json({
    ...user,
    token: getToken(user.id),
  });
});

router.get("/users/me", authMiddleware, async (_, res) => {
  const user = await findUserById(res.locals.userId);
  res.status(200).json(user);
});

router.get("/", (_, res) => {
  res.json({
    ok: true,
    date: new Date().toLocaleString(),
  });
});

export default router;
