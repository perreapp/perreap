const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  photo: {
<<<<<<< HEAD
    type: String,
    default: "https://media.giphy.com/media/LXtjHzZjC5WLu/giphy.gif"
=======
    type: String,
    default: "https://media.giphy.com/media/LXtjHzZjC5WLu/giphy.gif"
  },
  birthDate: String,
  group: { 
    type: String,
    default: "webmad0419" //provisional
>>>>>>> 1eb734e81f47aacea8bbcc471240a139c0c2bd07
  },
  birthDate: String,
  group: String,

  palitos: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "student"
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
