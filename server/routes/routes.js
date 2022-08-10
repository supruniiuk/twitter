const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const tweetRouter = require("./tweetRouter");

router.use("/users", userRouter);
router.use("/tweets", tweetRouter);

module.exports = router;
