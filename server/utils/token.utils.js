const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.KEY, { expiresIn: "7d" });
};

module.exports = generateToken;
