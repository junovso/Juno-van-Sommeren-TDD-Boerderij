const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// de 2 gegeven producten

const corn = {
  name: "corn",
  yield: 30,
  price: 1,
  salePrice: 3,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      low: -10,
      medium: 10,
      high: 40,
    },
    temp: {
      low: -20,
      medium: 10,
      high: 30,
    },
  },
};

const pumpkin = {
  name: "pumpkin",
  yield: 20,
  price: 1,
  salePrice: 4,
  factors: {
    sun: {
      low: -50,
      medium: 20,
      high: 50,
    },
    wind: {
      low: -20,
      medium: 30,
      high: 20,
    },
    temp: {
      low: -20,
      medium: 40,
      high: 20,
    },
  },
};
//gegeven tests
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});
//einde gegeven tests
// bereken de kosten
describe("getCostsForCrop", () => {
  test("Test kosten van 1 crop", () => {
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getCostsForCrop(input)).toBe(10);
  });
});
// bereken de inkomsten zonder omgevingsfactoren
describe("getRevenueForCrop", () => {
  test("Test de omzet van 1 crop", () => {
    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getRevenueForCrop(input)).toBe(900);
  });
});
//bereken de winst zonder omgevingsfactoren
describe("getProfitForCrop", () => {
  test("Test de winst van een crop", () => {
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getProfitForCrop(input)).toBe(890);
  });
});
// bereken de winst voor meerdere crops zonder omgevingsfactoren
describe("getTotalProfit", () => {
  test("Test de winst van alle crops samen", () => {
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 20 },
    ];
    expect(getTotalProfit({ crops })).toBe(0);
  });
});
// neem omgevingsfactoren mee in het berekenen van de opbrengst (in kilo's) van een plant: getYieldForPlant
test("Test de yield met 1 omgevingsfactor", () => {
  const environmentFactors = {
    wind: "low",
  };
  expect(getYieldForPlant(corn, environmentFactors)).toBe(27);
});
//doe deze berekening met meerdere omgevingsfactoren
test("Test yield van plant met 2 omgevingsfactors", () => {
  const environmentFactors = {
    sun: "low",
    temp: "high",
  };
  expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(12);
});
//bereken de opbrengst in kilo's van een crop getYieldForCrop, neem omgevingsfactoren mee in je berekening
test("Test yield van een crop met 3 omgevingsfactors", () => {
  const input = {
    crop: pumpkin,
    numCrops: 50,
  };
  const environmentFactors = {
    sun: "low",
    wind: "medium",
    temp: "low",
  };
  expect(getYieldForCrop(input, environmentFactors)).toBe(520);
});
//bereken de inkomsten van een crop getRevenueForCrop, neem omgevingsfactoren mee in je berekening
test("Test het inkomen van 1 crop met 3 omgevingsfactoren", () => {
  const input = {
    crop: pumpkin,
    numCrops: 50,
  };
  const environmentFactors = {
    sun: "high",
    wind: "low",
    temp: "high",
  };
  expect(getRevenueForCrop(input, environmentFactors)).toBe(5760.000000000001);
});
// bereken de winst van 1 crop getprofitForCrop, neem omgevingsfactoren mee in je berekening
test("Test de winst van 2 crops + 3 omgevingsfactoren", () => {
  const input = {
    crop: pumpkin,
    numCrops: 20,
  };
  const environmentFactors = {
    sun: "low",
    wind: "medium",
    temp: "low",
  };
  expect(getTotalProfit(input, environmentFactors)).toBe(0);
});
// bereken de winst van 2 crops getProfitForCrop, neem omgevingsfactoren mee in je berekening
test("Test de winst van 2 crops + 3 omgevingsfactoren", () => {
  const crops = [
    { crop: corn, numCrops: 10 },
    { crop: pumpkin, numCrops: 20 },
  ];
  const environmentFactors = {
    sun: "low",
    wind: "medium",
    temp: "low",
  };
  expect(getTotalProfit(crops, environmentFactors)).toBe(1198);
});
