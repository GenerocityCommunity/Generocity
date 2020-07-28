/*this file stores an array and methods that maintain message rooms, and the users in them*/ 
const users = [];

const addUser = ({id, name, room}) => {
  // const name = name;
  // const room = room;
  const user = { id, name, room };
  users.push(user);
  // console.log(users)
  return {user};
}

// to persist room connections, do we still need removeUser? idk
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

