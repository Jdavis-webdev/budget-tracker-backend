const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  linkedAccounts: [
    {
      institution: String,
      accountName: String,
      balance: Number,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
