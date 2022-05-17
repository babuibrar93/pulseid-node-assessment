const mongoose = require("mongoose");

const getBudget = (budget) => {
  if (typeof budget !== "undefined") {
    return parseFloat(budget.toString());
  }
  return budget;
};

const rulesetSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    cashback: {
      type: mongoose.Decimal128,
      required: true,
      get: getBudget,
    },
    redemptionLimit: {
      type: Number,
      required: false,
    },
    minTransactions: {
      type: Number,
      required: false,
    },
    budget: {
      type: mongoose.Decimal128,
      required: false,
      get: getBudget,
    },
    id: false,
  },
  { toJSON: { getters: true } }
);

const Rules = mongoose.model("Rules", rulesetSchema);

module.exports = Rules;
