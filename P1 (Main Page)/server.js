const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3050;

app.use(bodyParser.json());

let serverData = null;

// Route to handle data upload
app.post("/upload", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).send("No data received.");
  }
  serverData = data;
  res.sendStatus(200);
});

// Route to handle data download
app.get("/download", (req, res) => {
  if (!serverData) {
    return res.status(404).send("No data available for download.");
  }
  res.send(serverData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
