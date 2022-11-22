const router = require("express").Router();
const Notes = require("../models/notes.models.js");

const protect = require("../middleware/auth.middleware.js");

router.get("/getAll", protect, async (req, res, next) => {
	try {
		const notes = await Notes.find({ owner: req.user.id });
		res.status(200).json({ message: "Fetched all the notes", data: notes });
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

router.get("/getOne/:id", protect, async (req, res, next) => {
	try {
		const oneNote = await Notes.findById(req.params.id);
		if (!oneNote) {
			res.status(404).send("Particular note does not exists.");
		}
		res.status(200).json({ message: "Note found", data: oneNote });
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

router.post("/createNote", protect, async (req, res, next) => {
	try {
		const { title, content, instrumental } = req.body;
		if (!title || !content) {
			res.status(400).send("Please fill all the inputs");
		}
		const newNote = new Notes({
			owner: req.user.id,
			title,
			content,
			instrumental: instrumental ? instrumental : "",
		});

		await newNote.save();

		res.status(201).json({
			message: "Note created successfully",
			data: newNote,
		});
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

router.put("/updateNote/:id", protect, async (req, res, next) => {
	try {
		const { title, content, instrumental } = req.body;
		if (!title && !content && !instrumental) {
			res.status(403).send("Nothing to update");
		}

		const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		res.status(201).json({
			message: "Note updated successfully",
			data: updatedNote,
		});
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

router.delete("/deleteNote/:id", protect, async (req, res, next) => {
	try {
		const findNote = await Notes.findById(req.params.id);
		if (!findNote) {
			res.status(404).send("Particular note does not exists.");
		}
		await Notes.findByIdAndRemove(req.params.id);
		res.status(200).json({ message: "Note deleted succefully", data: {} });
	} catch (error) {
		res.status(500).send("Server error, please try later");
	}
});

module.exports = router;
