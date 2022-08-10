const Router = require("express");
const router = new Router();
const tweetController = require("../controllers/tweetController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, tweetController.getAll);
router.get("/:id", authMiddleware, tweetController.getById);

router.post("/", authMiddleware, tweetController.createTweet);

router.delete("/:id", authMiddleware, tweetController.deleteById);

module.exports = router;
