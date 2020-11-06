const express = require("express");
const cron = require('./cron');
const app = express();
cron.init();
// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to APItoSQL application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});