const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  description: String,
  amount: Number,
  category: String,
  accountName: String,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
