const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb+srv://clownlaugh100:thapa@cluster0.n5c2z6n.mongodb.net/myDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
};

module.exports = connectDB;
