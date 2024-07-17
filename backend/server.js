const path = require('path');
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/message', messageRoutes);

// Serve static files from the React app
const __dirname1 = path.resolve();
console.log("Starting to serve static files...");  // Added log
console.log("Static files directory:", path.join(__dirname1, 'frontend', 'build'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, 'frontend', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running successfully ..');
  });
}

// Middleware for error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.IO setup
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');

  socket.on('setup', (userData) => {
    socket.userData = userData;
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User joined room: ' + room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived);
    });
  });

  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED');
    if (socket.userData) {
      socket.leave(socket.userData._id);
    }
  });
});
