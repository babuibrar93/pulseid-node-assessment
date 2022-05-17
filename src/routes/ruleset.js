const { Router } = require("express");
const moment = require("moment");
const router = Router();

const asyncHandler = require("../middlewares/handler");

const validator = require("../utils/validator");
const CustomErorr = require("../utils/Error");

const Rules = require("../Model/rules");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const {
      startDate,
      endDate,
      cashback,
      redemptionLimit,
      minTransactions,
      budget,
    } = req.body;

    const errors = validator(req.body, [
      "startDate",
      "endDate",
      "cashback",
      "redemptionLimit",
      "minTransactions",
      "budget",
    ]); //Validating the incoming body for the ruleset route

    if (errors.length > 0)
      return res.status(500).send({ success: false, errors });

    // Validating if the startDate and endDate matches the required date formate which is "YYYY-mm-dd"◘
    if (!moment(startDate, "YYYY-mm-dd").isValid())
      return next(new CustomErorr("Invalid start date", 500));
    if (!moment(endDate, "YYYY-mm-dd").isValid())
      return next(new CustomErorr("Invalid endDate date", 500));

    const ruleset = new Rules({
      startDate,
      endDate,
      cashback,
      redemptionLimit,
      minTransactions,
      budget,
    });
    await ruleset.save(); // Saving the ruleset
    return res.status(201).send("OK"); // Returning the response with "Ok"
  })
);

module.exports = router;
