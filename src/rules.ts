import type {
  EstimateInput,
  EstimateResult,
  LetterHeightInput,
  LetterHeightResult,
  MountingHeightInput,
  MountingHeightResult,
  RuleWarning,
  SignFaceInput,
  SignFaceResult,
  VinylAreaInput,
  VinylAreaResult,
} from "./types.js";

const SQ_IN_PER_SQ_FT = 144;

function assertFiniteNumber(name: string, value: number): void {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number.`);
  }
}

function assertPositive(name: string, value: number): void {
  assertFiniteNumber(name, value);
  if (value <= 0) {
    throw new RangeError(`${name} must be greater than zero.`);
  }
}

function assertNonNegative(name: string, value: number): void {
  assertFiniteNumber(name, value);
  if (value < 0) {
    throw new RangeError(`${name} cannot be negative.`);
  }
}

function round(value: number, places = 2): number {
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function normalizedQuantity(quantity?: number): number {
  const resolved = quantity ?? 1;
  assertPositive("quantity", resolved);

  if (!Number.isInteger(resolved)) {
    throw new RangeError("quantity must be a whole number.");
  }

  return resolved;
}

export function calculateSignFace(input: SignFaceInput): SignFaceResult {
  assertPositive("widthIn", input.widthIn);
  assertPositive("heightIn", input.heightIn);

  const quantity = normalizedQuantity(input.quantity);
  const faceAreaSqFt = (input.widthIn * input.heightIn) / SQ_IN_PER_SQ_FT;
  const perimeterFtEach = (2 * (input.widthIn + input.heightIn)) / 12;

  return {
    quantity,
    faceAreaSqFt: round(faceAreaSqFt),
    totalFaceAreaSqFt: round(faceAreaSqFt * quantity),
    perimeterFtEach: round(perimeterFtEach),
    totalPerimeterFt: round(perimeterFtEach * quantity),
  };
}

export function calculateVinylArea(input: VinylAreaInput): VinylAreaResult {
  assertNonNegative("wastePercent", input.wastePercent);

  const base = calculateSignFace(input);
  const wasteMultiplier = 1 + input.wastePercent / 100;

  return {
    ...base,
    wastePercent: round(input.wastePercent),
    orderAreaSqFt: round(base.totalFaceAreaSqFt * wasteMultiplier),
  };
}

export function recommendLetterHeight(input: LetterHeightInput): LetterHeightResult {
  assertPositive("viewingDistanceFt", input.viewingDistanceFt);
  assertPositive("feetPerInch", input.feetPerInch);

  const roundingIncrementIn = input.roundingIncrementIn ?? 0.125;
  assertPositive("roundingIncrementIn", roundingIncrementIn);

  const rawHeightIn = input.viewingDistanceFt / input.feetPerInch;
  const recommendedHeightIn =
    Math.ceil(rawHeightIn / roundingIncrementIn) * roundingIncrementIn;

  return {
    rawHeightIn: round(rawHeightIn, 3),
    recommendedHeightIn: round(recommendedHeightIn, 3),
    assumptions: [
      `The caller supplied a readability ratio of ${input.feetPerInch} feet of viewing distance per inch of letter height.`,
      "This is preliminary guidance only; font width, contrast, illumination, speed, obstruction, and local criteria can materially change the result.",
    ],
  };
}

export function checkMountingHeight(input: MountingHeightInput): MountingHeightResult {
  assertNonNegative("baselineIn", input.baselineIn);
  assertNonNegative("minimumBaselineIn", input.minimumBaselineIn);
  assertNonNegative("maximumBaselineIn", input.maximumBaselineIn);

  if (input.minimumBaselineIn > input.maximumBaselineIn) {
    throw new RangeError(
      "minimumBaselineIn cannot be greater than maximumBaselineIn.",
    );
  }

  const toleranceIn = input.toleranceIn ?? 0;
  assertNonNegative("toleranceIn", toleranceIn);

  const effectiveMinimum = input.minimumBaselineIn - toleranceIn;
  const effectiveMaximum = input.maximumBaselineIn + toleranceIn;
  const warnings: RuleWarning[] = [];

  if (input.baselineIn < effectiveMinimum) {
    warnings.push({
      code: "MOUNTING_HEIGHT_BELOW_RANGE",
      severity: "blocker",
      message: `The entered baseline is ${round(
        effectiveMinimum - input.baselineIn,
      )} inches below the configured minimum.`,
    });
  }

  if (input.baselineIn > effectiveMaximum) {
    warnings.push({
      code: "MOUNTING_HEIGHT_ABOVE_RANGE",
      severity: "blocker",
      message: `The entered baseline is ${round(
        input.baselineIn - effectiveMaximum,
      )} inches above the configured maximum.`,
    });
  }

  if (warnings.length === 0) {
    warnings.push({
      code: "MOUNTING_HEIGHT_WITHIN_CONFIGURED_RANGE",
      severity: "info",
      message:
        "The entered baseline is within the configured range. Confirm the governing standard, measurement reference, floor condition, and sign type before release.",
    });
  }

  return {
    withinRange: warnings.every((warning) => warning.severity !== "blocker"),
    warnings,
  };
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  assertNonNegative("materialCost", input.materialCost);
  assertNonNegative("laborHours", input.laborHours);
  assertNonNegative("laborRate", input.laborRate);

  const otherDirectCosts = input.otherDirectCosts ?? 0;
  const materialWastePercent = input.materialWastePercent ?? 0;
  const markupPercent = input.markupPercent ?? 0;

  assertNonNegative("otherDirectCosts", otherDirectCosts);
  assertNonNegative("materialWastePercent", materialWastePercent);
  assertNonNegative("markupPercent", markupPercent);

  const adjustedMaterialCost =
    input.materialCost * (1 + materialWastePercent / 100);
  const laborCost = input.laborHours * input.laborRate;
  const directCost = adjustedMaterialCost + laborCost + otherDirectCosts;
  const sellingPrice = directCost * (1 + markupPercent / 100);
  const grossProfit = sellingPrice - directCost;
  const grossMarginPercent =
    sellingPrice === 0 ? 0 : (grossProfit / sellingPrice) * 100;

  return {
    adjustedMaterialCost: round(adjustedMaterialCost),
    laborCost: round(laborCost),
    otherDirectCosts: round(otherDirectCosts),
    directCost: round(directCost),
    markupPercent: round(markupPercent),
    sellingPrice: round(sellingPrice),
    grossProfit: round(grossProfit),
    grossMarginPercent: round(grossMarginPercent),
  };
}
