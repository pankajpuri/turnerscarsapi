const Joi = require("joi");
const mongoose = require("mongoose");
const quote = require("./routers/quotes");
const config = require("config");
const db = config.get("db");
const express = require("express");
const app = express();
app.use(express.json());

async function createConnection() {
  await mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`connected to the ${db}.....`))
    .catch((err) => console.error(`erros occured: ${err.message}`));
}

createConnection();

app.use("/api/quote", quote);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listenting on port :${port}`);
});
module.exports = server;
