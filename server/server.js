const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// import routes
const authRoutes = require("./routes/auth");

// middlewares
app.use("/api", authRoutes);

// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());

// run the server
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});
