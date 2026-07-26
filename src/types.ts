export type WarningSeverity = "info" | "warning" | "blocker";

export interface RuleWarning {
  code: string;
  severity: WarningSeverity;
  message: string;
}

export interface SignFaceInput {
  widthIn: number;
  heightIn: number;
  quantity?: number;
}

export interface SignFaceResult {
  quantity: number;
  faceAreaSqFt: number;
  totalFaceAreaSqFt: number;
  perimeterFtEach: number;
  totalPerimeterFt: number;
}

export interface VinylAreaInput extends SignFaceInput {
  wastePercent: number;
}

export interface VinylAreaResult extends SignFaceResult {
  wastePercent: number;
  orderAreaSqFt: number;
}

export interface LetterHeightInput {
  viewingDistanceFt: number;
  feetPerInch: number;
  roundingIncrementIn?: number;
}

export interface LetterHeightResult {
  rawHeightIn: number;
  recommendedHeightIn: number;
  assumptions: string[];
}

export interface MountingHeightInput {
  baselineIn: number;
  minimumBaselineIn: number;
  maximumBaselineIn: number;
  toleranceIn?: number;
}

export interface MountingHeightResult {
  withinRange: boolean;
  warnings: RuleWarning[];
}

export interface EstimateInput {
  materialCost: number;
  laborHours: number;
  laborRate: number;
  otherDirectCosts?: number;
  materialWastePercent?: number;
  markupPercent?: number;
}

export interface EstimateResult {
  adjustedMaterialCost: number;
  laborCost: number;
  otherDirectCosts: number;
  directCost: number;
  markupPercent: number;
  sellingPrice: number;
  grossProfit: number;
  grossMarginPercent: number;
}
