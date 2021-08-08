const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// DB
mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connected"))
	.catch((error) => console.log(error));

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);

// run the server
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});
