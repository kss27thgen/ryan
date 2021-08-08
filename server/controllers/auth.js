const AWS = require("aws-sdk");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { registerEmailParams } = require("../helpers/email");
const shortId = require("shortid");
const expressJwt = require("express-jwt");

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.register = (req, res) => {
	const { name, email, password } = req.body;

	// Check if user exists in our db
	User.findOne({ email }).exec((error, user) => {
		if (user) {
			return res.status(400).json({
				error: "Email is already taken.",
			});
		}
		// generate toke with username email and password
		const token = jwt.sign(
			{ name, email, password },
			process.env.JWT_ACCOUNT_ACTIVATION,
			{ expiresIn: "10m" },
		);

		// send Email
		const params = registerEmailParams(email, token);

		const sendEmailOnRegister = ses.sendEmail(params).promise();

		sendEmailOnRegister
			.then((data) => {
				console.log("Email submitted to SES", data);
				res.json({
					message: `Email has been sent to ${email}, Follow the instruction to complete your registration`,
				});
			})
			.catch((error) => {
				console.log("SES email no register", error);
				res.json({
					message: `We could not verify your email. Plese try again.`,
				});
			});
	});
};

exports.registerActivate = (req, res) => {
	const { token } = req.body;
	console.log(token);
	jwt.verify(
		token,
		process.env.JWT_ACCOUNT_ACTIVATION,
		function (error, decoded) {
			if (error) {
				console.log(error);
				return res.status(401).json({
					error: "Expired link. Try again.",
				});
			}
			const { name, email, password } = jwt.decode(token);
			const username = shortId.generate();

			User.findOne({ email }).exec((error, user) => {
				if (user) {
					return res.status(401).json({ error: "Email is taken." });
				}
				// Register new user
				const newUser = new User({
					username,
					name,
					email,
					password,
				});
				newUser.save((error, result) => {
					if (error) {
						return res.status(401).json({
							error: "Error saving user in database. Try later.",
						});
					}
					return res.json({
						message: "Registration success. Please login.",
					});
				});
			});
		},
	);
};

exports.login = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }).exec((error, user) => {
		if (error || !user) {
			return res.status(400).json({
				error: "User with that email does not exist. Please register.",
			});
		}
		// authenticate
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Email and password do not match.",
			});
		}
		// generate token and send to client
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		const { _id, name, email, role } = user;

		return res.json({
			token,
			user: { _id, name, email, role },
		});
	});
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
});

exports.authMiddleware = (req, res, next) => {
	const authUserId = req.user._id;
	User.findOne({ _id: authUserId }).exec((error, user) => {
		if (error || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		req.profile = user;
		next();
	});
};

exports.adminMiddleware = (req, res, next) => {
	const adminUserId = req.user._id;
	User.findOne({ _id: adminUserId }).exec((error, user) => {
		if (error || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		if (user.role != "admin") {
			return res.status(400).json({
				error: "Admin resource. Access denied.",
			});
		}
		req.profile = user;
		next();
	});
};
