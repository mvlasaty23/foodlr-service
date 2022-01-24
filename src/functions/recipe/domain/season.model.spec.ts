import { AssertionError } from 'assert';
import { Season } from './season.model';

describe('Season', () => {
  describe('of', () => {
    it('should create a Season', () => {
      expect(Season.of('summer')).toBeTruthy();
    });
    it('should validate inputs', () => {
      expect(() => Season.of(null)).toThrow(AssertionError);
    });
  });
  describe('from', () => {
    [
      { day: new Date('2021-01-01'), expected: Season.of('winter') },
      { day: new Date('2021-01-31'), expected: Season.of('winter') },
      { day: new Date('2021-02-01'), expected: Season.of('winter') },
      { day: new Date('2021-02-28'), expected: Season.of('winter') },
      { day: new Date('2021-03-01'), expected: Season.of('winter') },
      { day: new Date('2021-03-19'), expected: Season.of('winter') },
      { day: new Date('2021-03-20'), expected: Season.of('spring') },
      { day: new Date('2021-03-30'), expected: Season.of('spring') },
      { day: new Date('2021-04-01'), expected: Season.of('spring') },
      { day: new Date('2021-04-31'), expected: Season.of('spring') },
      { day: new Date('2021-05-01'), expected: Season.of('spring') },
      { day: new Date('2021-05-30'), expected: Season.of('spring') },
      { day: new Date('2021-06-01'), expected: Season.of('spring') },
      { day: new Date('2021-06-20'), expected: Season.of('spring') },
      { day: new Date('2021-06-21'), expected: Season.of('summer') },
      { day: new Date('2021-06-31'), expected: Season.of('summer') },
      { day: new Date('2021-07-01'), expected: Season.of('summer') },
      { day: new Date('2021-07-30'), expected: Season.of('summer') },
      { day: new Date('2021-08-01'), expected: Season.of('summer') },
      { day: new Date('2021-08-31'), expected: Season.of('summer') },
      { day: new Date('2021-09-01'), expected: Season.of('summer') },
      { day: new Date('2021-09-21'), expected: Season.of('summer') },
      { day: new Date('2021-09-22'), expected: Season.of('autumn') },
      { day: new Date('2021-09-30'), expected: Season.of('autumn') },
      { day: new Date('2021-10-01'), expected: Season.of('autumn') },
      { day: new Date('2021-10-31'), expected: Season.of('autumn') },
      { day: new Date('2021-11-01'), expected: Season.of('autumn') },
      { day: new Date('2021-11-30'), expected: Season.of('autumn') },
      { day: new Date('2021-12-01'), expected: Season.of('autumn') },
      { day: new Date('2021-12-20'), expected: Season.of('autumn') },
      { day: new Date('2021-12-21'), expected: Season.of('winter') },
      { day: new Date('2021-12-31'), expected: Season.of('winter') },
    ].forEach((testCase) => {
      it(`should return ${testCase.expected.value} for ${testCase.day.toISOString()}`, () => {
        expect(Season.from(testCase.day)).toEqual(testCase.expected);
      });
    });
  });
  describe('equals', () => {
    [
      { actual: Season.of('autumn'), that: Season.of('autumn'), expected: true },
      { actual: Season.of('autumn'), that: Season.of('summer'), expected: false },
      { actual: Season.of('autumn'), that: null, expected: false },
      { actual: Season.of('autumn'), that: Season.of('all'), expected: true },
    ].forEach(({ actual, that, expected }) => {
      it(`should return ${expected.toString()} for ${actual.value} == ${that ? that.value : 'null'}`, () =>
        expect(actual.equals(that)).toEqual(expected));
    });
  });
});
