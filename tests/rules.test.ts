import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateEstimate,
  calculateSignFace,
  calculateVinylArea,
  checkMountingHeight,
  recommendLetterHeight,
} from "../src/index.js";

test("calculates sign face area and perimeter", () => {
  const result = calculateSignFace({ widthIn: 120, heightIn: 36, quantity: 2 });

  assert.equal(result.faceAreaSqFt, 30);
  assert.equal(result.totalFaceAreaSqFt, 60);
  assert.equal(result.perimeterFtEach, 26);
  assert.equal(result.totalPerimeterFt, 52);
});

test("adds vinyl waste allowance", () => {
  const result = calculateVinylArea({
    widthIn: 48,
    heightIn: 24,
    quantity: 2,
    wastePercent: 10,
  });

  assert.equal(result.totalFaceAreaSqFt, 16);
  assert.equal(result.orderAreaSqFt, 17.6);
});

test("rounds letter height upward to the selected increment", () => {
  const result = recommendLetterHeight({
    viewingDistanceFt: 160,
    feetPerInch: 25,
    roundingIncrementIn: 0.25,
  });

  assert.equal(result.rawHeightIn, 6.4);
  assert.equal(result.recommendedHeightIn, 6.5);
});

test("flags mounting heights outside the configured range", () => {
  const result = checkMountingHeight({
    baselineIn: 63,
    minimumBaselineIn: 48,
    maximumBaselineIn: 60,
  });

  assert.equal(result.withinRange, false);
  assert.equal(result.warnings[0]?.code, "MOUNTING_HEIGHT_ABOVE_RANGE");
});

test("calculates markup and gross margin without confusing the two", () => {
  const result = calculateEstimate({
    materialCost: 500,
    materialWastePercent: 10,
    laborHours: 10,
    laborRate: 50,
    otherDirectCosts: 100,
    markupPercent: 25,
  });

  assert.equal(result.adjustedMaterialCost, 550);
  assert.equal(result.directCost, 1150);
  assert.equal(result.sellingPrice, 1437.5);
  assert.equal(result.grossProfit, 287.5);
  assert.equal(result.grossMarginPercent, 20);
});

test("rejects negative costs", () => {
  assert.throws(
    () =>
      calculateEstimate({
        materialCost: -1,
        laborHours: 1,
        laborRate: 1,
      }),
    /materialCost cannot be negative/,
  );
});
