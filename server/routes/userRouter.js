const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { registrationValidation, loginValidation } = require("../middleware/validationMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", registrationValidation, authController.register);
router.post("/login", loginValidation, authController.login);

router.get("/", authMiddleware, userController.getAll);
router.get("/:id", userController.getById);

router.delete("/:id", userController.deleteById);

module.exports = router;
