const Joi = require("joi");
const mongoose = require("mongoose");
const quote = require("./routers/quotes");
const express = require("express");
const app = express();
app.use(express.json());

const config = require("config");
const db = config.get("db");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/turnerscars", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() =>
//     console.log(`connected to the mongodb://localhost:27017/turnerscars.....`)
//   )
//   .catch((err) => console.error(`erros occured: ${err.message}`));

app.use("/api/quote", quote);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`listenting on port :${port}`);
});
module.exports = server;
