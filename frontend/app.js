// app.js (backend)
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public"))); // where index.html lives
console.log("Serving static files from:", path.join(__dirname, "..", "frontend"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ...your API routes here...

app.listen(3000, () => console.log("Server running on port 3000"));