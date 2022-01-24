// Impoert express
const express = require("express");
const cors = require("cors");

// Import dotenv
require("dotenv").config();

const app = express();

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "https://www.spacez.link",
    "https://spacez-link.herokuapp.com",
  ],
  credentials: true,
  withCredentials: true,
};

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

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

const PORT = process.env.PORT;

// define a root route
app.get("/", (req, res) => {
  res.send("This Backend Is Working...");
});

// Routers
const emailRouter = require("./src/router/email.router");
app.use("/api/submit", emailRouter);

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
