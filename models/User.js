const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  photo: String,
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
