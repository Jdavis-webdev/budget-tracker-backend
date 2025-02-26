const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Get Transactions
router.get("/:userId", async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.userId });
  res.json(transactions);
});

// Add Transaction
router.post("/", async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.json(newTransaction);
});

// Delete Transaction
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted!" });
});

module.exports = router;
