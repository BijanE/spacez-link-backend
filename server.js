// Import App
const app = require("./app");

// Import dotenv
require("dotenv").config();

const PORT = process.env.PORT;

// listen for requests
app.listen(PORT, () => console.log("Server running in port 3000"));
