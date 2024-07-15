require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Connect to the database
connectDB();

app.use(express.json());

// User routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/message', messageRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
