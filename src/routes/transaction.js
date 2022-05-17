const { Router } = require("express");
const moment = require("moment");
const router = Router();

const asyncHandler = require("../middlewares/handler");

const validator = require("../utils/validator");
const CustomErorr = require("../utils/Error");

const Transaction = require("../Model/transaction");
const RuleSet = require("../Model/rules");
const Cashback = require("../Model/cashback");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { date, id, customerId } = req.body;

    const errors = validator(req.body, ["date", "id", "customerId"]);
    if (errors.length > 0)
      return res.status(500).send({ success: false, errors });

    if (!moment(date, "YYYY-mm-dd").isValid())
      return next(new CustomErorr("Invalid date formate.", 500));

    const transaction = new Transaction({
      date,
      id,
      customerId,
    });
    await transaction.save();

    const transactionsDoneByCustomer = await Transaction.count({
      customerId,
    }); //Count the customers transactions

    const availablecashback = RuleSet.find({
      $and: [{ startDate: { $gte: date } }, { endDate: { $lte: date } }],
      budget: { $gt: 0 },
      minTransactions: { $gt: transactionsDoneByCustomer },
      isAvailable: true,
    });

    if (availablecashback && availablecashback.length > 0) {
      const highestCashback = findMaxByProperty(availablecashback, "cashback"); //Finding the max cashback value from the available rulessets
      if (highestCashback) {
        const cashback = new Cashback({
          transactionId: id,
          amount: parseFloat(highestCashback.cashback),
        });
        await cashback.save();

        await RuleSet.findByIdAndUpdate(
          highestCashback._id,
          {
            $set: { budget: highestCashback.budget },
            $inc: { appliedcashback: 1 },
          },
          { new: true }
        );
      }
    }
    return res.status(201).send("Ok"); // Returning the response with "Ok"
  })
);

module.exports = router;
