const app = require("express");
const router = app.Router();

router.use("/ruleset", require("./ruleset"));
router.use("/transaction", require("./transaction"));
router.use("/cashback", require("./cashback"));

module.exports = router;
