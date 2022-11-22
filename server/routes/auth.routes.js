const bcrypt = require("bcrypt");
const router = require("express").Router();

const User = require("../models/user.models.js");
const protect = require("../middleware/auth.middleware.js");
const generateToken = require("../utils/token.utils.js");

router.post("/register", async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			res.status(400).send("Please fill all the inputs");
		}

		const findUser = await User.findOne({ email });
		if (findUser) {
			res.status(400).send("User with this email already exists");
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			email,
			password: hashPassword,
			createdAt: new Date(),
		});

		await newUser.save();

		res.status(201).json({
			message: "User created",
			data: {
				name: newUser.name,
				email: newUser.email,
				createdAt: newUser.createdAt,
			},
			token: generateToken(newUser._id),
		});
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).send("Please fill all the inputs");
		}

		const findUser = await User.findOne({ email });

		if (!findUser) {
			res.status(404).send("User not found");
		}

		const comparePassword = await bcrypt.compare(password, findUser.password);

		if (!comparePassword) {
			res.status(401).send("Password did not match");
		}

		res.status(200).json({
			message: "User authenticated",
			data: {
				name: findUser.name,
				email: findUser.email,
				createdAt: findUser.createdAt,
			},
			token: generateToken(findUser._id),
		});
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

router.get("/getMe", protect, async (req, res, next) => {
	try {
		res.status(200).json({ message: "User authenticated", data: req.user });
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

module.exports = router;
