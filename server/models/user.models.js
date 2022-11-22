const { Schema, model, Types } = require("mongoose");

const User = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "user" },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: new Date() },
});

module.exports = model("user", User);
