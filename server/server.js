const express = require('express');
const path = require('path');
const itemRouter = require('./routes/itemsRouter.js');
const userRouter = require('./routes/userRouter.js');
const filterRouter = require('./routes/filterRouter.js');
const http = require('http')
const socket = require('socket.io')
// require dotenv to hide server uri
require('dotenv').config();

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = socket(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// Handle Parsing of Request Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", socket => {
  console.log('new socket connection!', socket.id)
  socket.on('join', ({ name, room }, callback) => {
    // name is user's name, room is the other user's name
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room); // joins suer to room
    socket.emit('message', { user: 'admin', text: `Hi, ${user.name}, you are now chatting with ${user.room}!` })
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    // SEND ROOMDATA TO ROOM ON CONNECTION
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  })

  socket.on('disconnect', () => {
    console.log('socket disconnected')
    const user = removeUser(socket.id);

    if (user) {

      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
    ;
  })
})
// from client, send message to scoket when room is created

// Handle Requests for Static Files
app.use('/', express.static(path.resolve(__dirname, '../')));

// Define Route Handlers
app.use('/item', itemRouter);
app.use('/user', userRouter);
app.use('/filter', filterRouter);

// Get Home Route
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

app.get('/profile', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));
app.get('/signup', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));
app.get('/chat', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));
app.get('/messages', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));
app.get('/item/category/Appliances', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../index.html'))
);
app.get('/item/category/Kitchen', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../index.html'))
);
app.get('/item/category/Sports', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../index.html'))
);
app.get('/item/category/Clothing', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../index.html'))
);
app.get('/logIn', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

// Catch-All to handle unknown routes
app.use('*', (req, res) => {
  res.status(404).send('Bad Request');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log('Global error handler: ', err);
  res.status(500).send(err);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
// Start Server
// app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
