import { AssertionError } from 'assert';
import { MealType } from './mealtype.model';

describe('MealType', () => {
  describe('of', () => {
    it('should create a MealType', () => {
      expect(MealType.of('meat')).toBeTruthy();
    });
    it('should validate inputs', () => {
      expect(() => MealType.of(null)).toThrow(AssertionError);
    });
  });
  describe('equals', () => {
    [
      { actual: MealType.of('meat'), that: null, expected: false },
      { actual: MealType.of('meat'), that: MealType.of('vegan'), expected: false },
      { actual: MealType.of('meat'), that: MealType.of('all'), expected: true },
      { actual: MealType.of('meat'), that: MealType.of('meat'), expected: true },
      { actual: MealType.of('all'), that: MealType.of('meat'), expected: false },
    ].forEach((testCase) => {
      it(`should return ${testCase.expected.toString()} for ${testCase.actual.value} == ${
        testCase.that ? testCase.that.value : 'null'
      }`, () => {
        expect(testCase.actual.equals(testCase.that)).toEqual(testCase.expected);
      });
    });
  });
});
