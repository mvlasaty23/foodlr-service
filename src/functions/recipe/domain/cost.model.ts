import { ok as assertOk } from 'assert';

export enum CostType {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  EXPENSIVE = 'EXPENSIVE',
}

/**
 * Represents the cost of a menu not a specific currency.
 */
export class Cost {
  private constructor(public value: number) {}
  public static of(value: number): Cost {
    assertOk(!!value, 'Cost should not be empty');
    assertOk(value > 0, 'Cost should be greater 0');
    return new Cost(value);
  }

  public asCostType(): CostType {
    if (this.value <= 20) {
      return CostType.LOW;
    } else if (this.value <= 40) {
      return CostType.MODERATE;
    } else {
      return CostType.EXPENSIVE;
    }
  }
}

export const costs: { [k in keyof typeof CostType]: Cost } = {
  LOW: Cost.of(19),
  MODERATE: Cost.of(39),
  EXPENSIVE: Cost.of(41),
} as const;
