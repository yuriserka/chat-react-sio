import { createServer } from "./app";
require("util").inspect.defaultOptions.depth = null;

createServer()
  .listen(3131, () => console.log("server running"))
  .on("error", (err) => console.log({ err }));
