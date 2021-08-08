const express = require("express");
const router = express.Router();

// import validators
const { runValidation } = require("../validators/index");
const {
	userRegisterValidator,
	userLoginValidator,
} = require("../validators/auth");

// import from controller
const {
	register,
	registerActivate,
	login,
	requireSignin,
} = require("../controllers/auth");

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLoginValidator, runValidation, login);
// router.get("/secret", requireSignin, (req, res) => {
// 	res.json({
// 		data: "this is secret page for logged in user only",
// 	});
// });

module.exports = router;
