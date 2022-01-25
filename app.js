// Impoert express
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

// Import dotenv
require("dotenv").config();

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/logs.log"),
  { flags: "a" }
);

app.use(morgan("dev", { stream: accessLogStream }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1",
      "https://www.spacez.link",
      "https://spacez-link.herokuapp.com",
    ],
    credentials: true,
    withCredentials: true,
  })
);

// parse requests of content-type - application/x-www-form-urlencoded , Json
app.use(express.urlencoded({ extended: true }), express.json());

// Define
app.get("/", (req, res) => {
  res.send("This Backend Is Working...");
});

// Routers
const emailRouter = require("./src/router/email.router");
app.use("/api/submit", emailRouter);

// Exporting
module.exports = app;
