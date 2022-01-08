// Impoert express
const express = require("express");

// Import dotenv
require("dotenv").config();

const app = express();

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
