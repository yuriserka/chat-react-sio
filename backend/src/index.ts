import { createServer } from "./app";
require("util").inspect.defaultOptions.depth = null;

createServer()
  .listen(3131, () => console.log("server running"))
  .on("error", (err) => console.log({ err }));

// async function main() {
//   const user1 = await database.user.create({
//     data: {
//       nickname: "yuri",
//       password: "sadasd",
//       username: "yuriserka",
//       rooms: {
//         create: [
//           {
//             name: "linked-chat",
//           },
//         ],
//       },
//     },
//   });

//   const user2 = await database.user.create({
//     data: {
//       nickname: "eric",
//       password: "sadaasdasdsd",
//       username: "ericserka",
//       rooms: {
//         connectOrCreate: {
//           create: {
//             name: "linked-chat",
//           },
//           where: {
//             name: "linked-chat",
//           },
//         },
//       },
//     },
//   });

//   const soloRoom = await database.room.create({
//     data: {
//       name: "my-chat",
//       users: {
//         connect: [
//           {
//             id: user1.id,
//           },
//         ],
//       },
//     },
//   });

//   const sharedRoom = await database.room.findFirst({
//     where: {
//       name: "linked-chat",
//     },
//   });

//   await database.message.create({
//     data: {
//       content: "ola",
//       authorId: user1.id,
//       roomId: sharedRoom!.id,
//     },
//   });

//   const users = await database.user.findMany({
//     include: {
//       messages: true,
//       rooms: true,
//     },
//   });
//   const rooms = await database.room.findMany({
//     include: {
//       messages: true,
//     },
//   });

//   const messages = await database.message.findMany();

//   console.log({ users, rooms, messages });

//   await database.message.deleteMany();
//   await database.user.deleteMany();
//   await database.room.deleteMany();
// }

// main().catch((err) => console.error({ err }));
