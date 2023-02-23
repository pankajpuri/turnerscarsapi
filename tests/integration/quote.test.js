const car = require("../../utilities/carvalue");
describe("Check Carvalue:", () => {
  it("should return car value:", () => {
    const value = car.getCarValue(["c", "i", "v", "i", "c"], 2014);
    expect(value).toBe(6614);
  });

  it("should return the risk rating:", () => {
    const riskfactor = car.getRiskRating(
      "My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes"
    );
    expect(riskfactor).toBe(2);
  });
});
