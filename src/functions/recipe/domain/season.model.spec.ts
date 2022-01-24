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
});
