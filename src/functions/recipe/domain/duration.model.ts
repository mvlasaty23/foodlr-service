import { ok as assertOk } from 'assert';

export enum DurationType {
  FAST = 'FAST',
  MODERATE = 'MODERATE',
  ELABORATE = 'ELABORATE',
  LONGJOB = 'LONGJOB',
}

/**
 * Representation of a duration in minutes.
 */
export class Duration {
  private constructor(public value: number) {}
  public static of(value: number): Duration {
    assertOk(value && value > 0, 'Duration should not be empty or less than 1');
    return new Duration(value);
  }

  public asDurationType(): DurationType {
    if (this.value <= 12) {
      return DurationType.FAST;
    } else if (this.value <= 45) {
      return DurationType.MODERATE;
    } else if (this.value <= 120) {
      return DurationType.ELABORATE;
    } else {
      return DurationType.LONGJOB;
    }
  }
}
