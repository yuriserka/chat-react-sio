const lastIndexOf = (array, cb) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (cb(array[i])) return i;
  }
  return -1;
};

export function takeLastMessage(messages) {
  if (!messages) return null;

  const idx = lastIndexOf(messages, (m) => m.author.nickname !== "admin");

  return idx < 0 ? null : messages[idx];
}
