const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3050;

app.use(bodyParser.json());

let serverData = "";

app.post("/upload", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).send("no data reciecved");
  }
  console.log(data);
  serverData = data;
  res.sendStatus(200);
});

app.get("/download", (req, res) => {
  if (serverData) {
    res.send(serverData);
  } else {
    res.status(404).send("No data available for download.");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
