import { AssertionError } from 'assert';
import { Cost, CostType } from './cost.model';

describe('Cost', () => {
  describe('of', () => {
    it('should create a Cost', () => {
      expect(Cost.of(12)).toBeTruthy();
    });
    it('should validate inputs', () => {
      expect(() => Cost.of(null)).toThrow(AssertionError);
      expect(() => Cost.of(0)).toThrow(AssertionError);
    });
  });
  describe('asCostType', () => {
    [
      { actual: Cost.of(20), expected: CostType.LOW },
      { actual: Cost.of(40), expected: CostType.MODERATE },
      { actual: Cost.of(41), expected: CostType.EXPENSIVE },
    ].forEach((testCase) =>
      it(`should return ${testCase.expected}`, () => {
        expect(testCase.actual.asCostType()).toEqual(testCase.expected);
      }),
    );
  });
});
