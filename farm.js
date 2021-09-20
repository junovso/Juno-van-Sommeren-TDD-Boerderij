const getYieldForPlant = (plant, environmentFactors = {}) => {
  let totalFactor = 1;
  if (
    environmentFactors.hasOwnProperty("sun") &&
    plant.factors.hasOwnProperty("sun")
  ) {
    totalFactor *= (plant.factors.sun[environmentFactors.sun] + 100) / 100;
  }
  if (
    environmentFactors.hasOwnProperty("wind") &&
    plant.factors.hasOwnProperty("wind")
  ) {
    totalFactor *= (plant.factors.wind[environmentFactors.wind] + 100) / 100;
  }
  if (
    environmentFactors.hasOwnProperty("temp") &&
    plant.factors.hasOwnProperty("temp")
  ) {
    totalFactor *= (plant.factors.temp[environmentFactors.temp] + 100) / 100;
  }
  return plant.yield * totalFactor;
};

const getYieldForCrop = (input, environmentFactors) => {
  let plantYield = getYieldForPlant(input.crop, environmentFactors);
  return plantYield * input.numCrops;
};

const getTotalYield = ({ crops }, environmentFactors) => {
  let cropYield = 0;
  for (let i = 0; i < crops.length; i++) {
    cropYield += getYieldForCrop(crops[i], environmentFactors);
  }
  return cropYield;
};

const getCostsForCrop = (input) => {
  return input.numCrops * input.crop.price;
};

const getRevenueForCrop = (input, environmentFactors) => {
  return input.crop.salePrice * getYieldForCrop(input, environmentFactors);
};

const getProfitForCrop = (input, environmentFactors) => {
  return (
    getRevenueForCrop(input, environmentFactors) -
    getCostsForCrop(input, environmentFactors)
  );
};

const getTotalProfit = (crops, environmentFactors) => {
  let cropsProfit = 0;
  for (let i = 0; i < crops.length; i++) {
    cropsProfit += getProfitForCrop(crops[i], environmentFactors);
  }
  return cropsProfit;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
