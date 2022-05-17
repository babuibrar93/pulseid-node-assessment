const mongoose = require("mongoose");

const getAmount = (amount) => {
  if (typeof amount !== "undefined") {
    return parseFloat(amount.toString());
  }
  return amount;
};

const cashbackSchema = new mongoose.Schema(
  {
    transactionId: {
      type: Number,
      required: true,
    },
    amount: {
      type: mongoose.Decimal128,
      required: true,
      get: getAmount,
    },
    id: false,
  },
  { toJSON: { getters: true } }
);

const Cashback = mongoose.model("Cashback", cashbackSchema);

module.exports = Cashback ;
