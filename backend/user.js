const users = [];

module.exports = {
  add: ({ id, username, room }) => {
    const sanitezedUsername = username.trim().toLowerCase();
    const sanitezedRoom = room.trim().toLowerCase();

    const userAlreadyExist = users.find(
      u => u.room === sanitezedRoom && u.name === sanitezedUsername
    );

    if (userAlreadyExist) {
      throw Error('username is already taken');
    }

    const size = users.push({
      id,
      name: sanitezedUsername,
      room: sanitezedRoom,
    });

    return users[size - 1];
  },
  remove: (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index > -1) {
      return users.splice(index, 1)[0];
    }
  },
  get: (id) => {
    return users.find(u => u.id === id);
  },
  getInRoom: (room) => {
    return users.filter(u => u.room === room);
  },
};
