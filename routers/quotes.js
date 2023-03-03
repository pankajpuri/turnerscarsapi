const Joi = require("joi");
const { Quote } = require("../models/quote");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const evaluateCar = require("../utilities/carvalue");

router.get("/", async (req, res) => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/turnerscars", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() =>
      console.log(`connected to the mongodb://localhost:27017/turnerscars.....`)
    )
    .catch((err) => console.error(`erros occured: ${err.message}`));

  let quote = await mongoose.model("Quote").find().sort("model");
  if (quote === null) return res.send("There are no records in the database");

  res.send(quote);
});

router.post("/", async (req, res) => {
  const { error } = checkValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const model = await req.body.model;
  const year = await req.body.year;
  const carValue = evaluateCar.getCarValue(model, year);

  const history = await req.body.claimHistory;
  const ratingValue = evaluateCar.getRiskRating(history);

  const total_months = 12;
  const yearlyPremium = evaluateCar.getYearlyPremium(carValue, ratingValue);
  const monthlyPremium = yearlyPremium / total_months;

  let quote = await new Quote({
    model: req.body.model,
    year: req.body.year,
    carValue: carValue,
    claimHistory: req.body.claimHistory,
    ristRating: ratingValue,
    monthlyPremium: monthlyPremium,
    yearlyPremium: yearlyPremium,
  });

  await quote.save();
  res.send(quote);
});

router.put("/:id", async (req, res) => {
  let quote = await Quote.findById(req.params.id);
  if (!quote) return res.status(404).send("Quote with given id is not found!");

  const { error } = checkValidation(req.body);
  if (error) return res.status(400).send(`errors: ${error.details[0].message}`);

  const history = await req.body.claimHistory;
  const ratingValue = evaluateCar.getRiskRating(history);

  const model = await req.body.model;
  const year = await req.body.year;
  const carValue = evaluateCar.getCarValue(model, year);
  const total_months = 12;
  const yearlyPremium = evaluateCar.getYearlyPremium(carValue, ratingValue);
  const monthlyPremium = yearlyPremium / total_months;

  quote = await new Quote({
    model: req.body.model,
    year: req.body.year,
    carValue: carValue,
    claimHistory: req.body.claimHistory,
    ristRating: ratingValue,
    monthlyPremium: monthlyPremium,
    yearlyPremium: yearlyPremium,
  });

  res.send(quote);
});

router.delete("/:id", async (req, res) => {
  let quote = await Quote.findById(req.params.id);
  if (!quote) return res.status(404).send("Quote with given id is not found!");

  quote = await Quote.findByIdAndRemove(req.params.id);
  res.send(quote);
});

router.get("/:id", async (req, res) => {
  let quote = await Quote.findById(req.params.id);
  if (!quote) return res.status(404).send("Quote with given id is not found!");
  res.send(quote);
});

function checkValidation(quote) {
  const schema = {
    model: Joi.string()
      .regex(/[a-z|A-Z][^0-9]/)
      .required(),
    year: Joi.number()
      .integer()
      .required("Please enter the year")
      .min(1900)
      .max(2023),
    claimHistory: Joi.string().required(),
  };
  return Joi.validate(quote, schema);
}
module.exports = router;
