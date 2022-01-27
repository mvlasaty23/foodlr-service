import { AssertionError } from 'assert';
import { Duration, DurationType } from './duration.model';

describe('Duration', () => {
  describe('of', () => {
    it('should create a Duration', () => {
      expect(Duration.of(2)).toBeTruthy();
    });
    it('should validate inputs', () => {
      expect(() => Duration.of(null)).toThrow(AssertionError);
      expect(() => Duration.of(0)).toThrow(AssertionError);
    });
  });
  describe('asDurationType', () => {
    [
      { actual: Duration.of(12), expected: DurationType.FAST },
      { actual: Duration.of(45), expected: DurationType.MODERATE },
      { actual: Duration.of(120), expected: DurationType.ELABORATE },
      { actual: Duration.of(121), expected: DurationType.LONGJOB },
    ].forEach((testCase) =>
      it(`should return ${testCase.expected}`, () => {
        expect(testCase.actual.asDurationType()).toEqual(testCase.expected);
      }),
    );
  });
});
