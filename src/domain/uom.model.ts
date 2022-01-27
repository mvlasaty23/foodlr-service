import { ok as assertOk } from 'assert';

export const solidUomBaseFactor = {
  mg: Math.pow(10, 2),
  g: 0,
  dg: Math.pow(10, -2),
  kg: Math.pow(10, -3),
} as const;

export const liquidUomBaseFactor = {
  ml: Math.pow(10, 3),
  cl: Math.pow(10, 2),
  dl: 10,
  l: 0,
} as const;

export type UomKey = keyof typeof solidUomBaseFactor | keyof typeof liquidUomBaseFactor;

/**
 * Represents a Unit of Measure.
 */
export class Uom {
  private constructor(public value: UomKey) {}
  public static of(uom: UomKey): Uom {
    assertOk(uom, 'Uom should not be null');
    return new Uom(uom);
  }
}
