const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  customerId: {
    type: Number,
    required: false,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
