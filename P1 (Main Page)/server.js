const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Temporary storage (you should replace this with a proper database)
let formData = {};

app.post("/submit-form", (req, res) => {
  const newFormData = req.body;

  // Store the new form data
  formData = newFormData;

  res.status(200).json({ message: "Form submitted successfully!" });
});

app.get("/retrieve-form", (req, res) => {
  // Respond with the stored form data
  res.status(200).json({ formData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
