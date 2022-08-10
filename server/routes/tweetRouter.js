const Router = require("express");
const router = new Router();
const tweetController = require("../controllers/tweetController");
const authMiddleware = require("../middleware/authMiddleware");
const idMiddleware = require("../middleware/idMiddleware");

const { tweetValidation } = require("../middleware/validationMiddleware");

router.get("/", authMiddleware, tweetController.getAll);
router.get("/:id", [authMiddleware, idMiddleware], tweetController.getById);

router.post("/", authMiddleware, tweetValidation, tweetController.createTweet);

router.delete(
  "/:id",
  [authMiddleware, idMiddleware],
  tweetController.deleteById
);

module.exports = router;
