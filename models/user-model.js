var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  username: String,
  gofaId: String,
  thumbnail: String
});
var User = mongoose.model("user", userSchema);

module.exports = User;
