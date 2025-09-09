const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle all routes by serving index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle thank you page
app.get("/thankYou.html", (req, res) => {
  res.sendFile(path.join(__dirname, "thankYou.html"));
});

// Handle any other routes by redirecting to home
app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`WanderWay server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
