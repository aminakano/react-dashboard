const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const proxy = require("http-proxy-middleware");

// Environment variables in .env file
require("dotenv").config();

// Express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // allows us to parse JSON

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
// once the server is conneced to the database it logs
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
