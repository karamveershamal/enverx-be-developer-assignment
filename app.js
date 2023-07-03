const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoute = require("./controller/BlogController");


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to Mongo!'))
  .catch((err) => console.log(err));

app.use("/api/blogs", blogRoute);

app.listen("3000", () => {
    console.log("Hi I am here");
});