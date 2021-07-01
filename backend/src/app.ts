import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import router from "./router";
import { ChatSocketHandler } from "./socket-handlers";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use(router);

  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", ChatSocketHandler);

  return server;
}
