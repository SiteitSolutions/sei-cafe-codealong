const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
// there's no need to mount express.urlencoded middleware
// why is that?
app.use(express.json());
// Allow cross-origin requests from the React frontend (Render Static Site)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  }),
);
// Serve React build only when it exists (local dev / single-dyno mode).
// In Render two-service mode the Static Site service serves the build
// independently, so build/ is not present on the Web Service.
const buildPath = path.join(__dirname, "build");
if (require("fs").existsSync(path.join(buildPath, "favicon.ico"))) {
  app.use(favicon(path.join(buildPath, "favicon.ico")));
}
if (require("fs").existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

// Check if token and create req.user
app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  if (require("fs").existsSync(path.join(buildPath, "index.html"))) {
    res.sendFile(path.join(buildPath, "index.html"));
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
