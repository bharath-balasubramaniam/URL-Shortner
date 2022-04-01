const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const api = require("./api/routes");

//init express app
const app = express();
app.use(express.json());
app.use(cors());

//connect to mongoDB:
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  })
  .then(() => console.log("Connection to DB established!"))
  .catch((err) => {
    console.error("Error in connecting to DB", err);
    process.exit(-1);
  });
app.get("/", (req, res) => {
  res.status(200).send("hello from the server");
});
app.use("/api", api);

//configure port and run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port " + port));
