const jwt = require("jsonwebtoken");
const User = require("../models/user.models.js");

const protect = async (req, res, next) => {
	if (
		!req.headers ||
		!req.headers["authorization"] ||
		req.headers["authorization"].length < 2
	) {
		return res.status(401).send("Unauthorized access");
	}
	const token = req.headers["authorization"].split(" ")[1];
	if (token && token !== "undefined" && token !== "null") {
		const decode = jwt.verify(token, process.env.KEY);
		req.user = await User.findById(decode.id).select("-password");
		next();
	} else {
		res.status(401).send("Unauthorized access");
	}
};

module.exports = protect;
