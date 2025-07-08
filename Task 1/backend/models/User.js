const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: true },
  sessionToken: {
  type: String,
  default: null
}


});


module.exports = mongoose.model('User', userSchema);
