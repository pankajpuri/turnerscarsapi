module.exports.getCarValue = function (carmodel, year) {
  let model = [...carmodel];
  let modelValue = 0;
  model.map((m) => {
    modelValue += m.toLowerCase().charCodeAt(0) - 97 + 1;
  });
  return modelValue * 100 + year;
};

module.exports.getRiskRating = function (history) {
  let totalRating = 0;
  const text = history.split(" ");
  const riskData = ["collide", "crash", "scratch", "bump", "smash"];
  text.forEach((txt) => {
    riskData.forEach((riskdata) => {
      if (txt === riskdata) {
        totalRating += 1;
      }
    });
  });
  return totalRating;
};

module.exports.getYearlyPremium = function (carValue, ratingValue) {
  return (carValue * ratingValue) / 100;
};
