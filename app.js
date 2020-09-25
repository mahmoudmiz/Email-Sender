const express = require("express");
const app = express();
const db = require("./database");
const userRoutes = require("./routes/subscribe");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

const index = require("./index.js");

const PORT = process.env.PORT || 8080;
//checking connectin to the database
db.authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

db.sync({ force: true });
// routes
app.use("/subscribe", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("server is running"));
