const { Schema, model, Types } = require("mongoose");

const Notes = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: "user" },
	title: { type: String, required: true },
	instrumental: { type: String, default: "" },
	content: { type: String, required: true },
	createdAt: { type: Date, default: new Date() },
});

module.exports = model("notes", Notes);
