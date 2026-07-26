import {
  calculateEstimate,
  calculateSignFace,
  calculateVinylArea,
  checkMountingHeight,
  recommendLetterHeight,
} from "../src/index.js";

const cabinet = calculateSignFace({
  widthIn: 144,
  heightIn: 36,
  quantity: 1,
});

const vinyl = calculateVinylArea({
  widthIn: 72,
  heightIn: 18,
  quantity: 2,
  wastePercent: 12,
});

const letterHeight = recommendLetterHeight({
  viewingDistanceFt: 150,
  feetPerInch: 25,
  roundingIncrementIn: 0.25,
});

const mountingReview = checkMountingHeight({
  baselineIn: 54,
  minimumBaselineIn: 48,
  maximumBaselineIn: 60,
});

const estimate = calculateEstimate({
  materialCost: 850,
  materialWastePercent: 10,
  laborHours: 18,
  laborRate: 65,
  otherDirectCosts: 325,
  markupPercent: 35,
});

console.log(
  JSON.stringify(
    {
      project: "Example storefront survey",
      cabinet,
      vinyl,
      letterHeight,
      mountingReview,
      estimate,
    },
    null,
    2,
  ),
);
