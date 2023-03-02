const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  carValue: {
    type: Number,
    required: false,
  },
  claimHistory: { type: String, required: true },
  ristRating: { type: Number, required: false },
  monthlyPremium: {
    type: Number,
  },
  yearlyPremium: {
    type: Number,
  },
});

const Quote = mongoose.model("Quote", schema);

exports.Quote = Quote;
exports.schema = schema;
