const { check } = require("express-validator");

exports.userRegisterValidator = [
	check("name").not().isEmpty().withMessage("Name is registerd"),
	check("email").isEmail().withMessage("Must be a valid email address"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

exports.userLoginValidator = [
	check("email").isEmail().withMessage("Must be a valid email address"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
