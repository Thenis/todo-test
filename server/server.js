const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;

// Serve static assets from the build folder
app.use(express.static(path.join(__dirname, "..", "build")));

// Catch-all route to serve index.html for any requests not handled above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
