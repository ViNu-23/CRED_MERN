const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/tattoo")

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  url: String,
});

module.exports = mongoose.model("user", userSchema);

