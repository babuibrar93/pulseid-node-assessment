const app = require("express");
const router = app.Router();

const asyncHandler = require("../middlewares/handler");
const Cashback = require("../Model/cashback");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const cashback = await Cashback.find();
    return res.send(cashback);
  })
);

module.exports = router;
