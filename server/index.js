const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

require("dotenv").config();
require("./utils/mongo.utils.js")();
const app = express();

const corsOption = {
	origin: [
		"http://localhost:3000",
		"http://localhost:5000",
		"https://notes-for-me-omega.vercel.app/",
	],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/auth.routes.js"));
app.use("/api/notes", require("./routes/notes.routes.js"));

app.listen(PORT, () => console.log(`Served on PORT ${PORT}`));
