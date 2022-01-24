import { AssertionError } from 'assert';
import { Region, RegionKeys } from './region.model';

describe('Region', () => {
  describe('of', () => {
    it('should create a Region', () => {
      expect(Region.of('eu-central')).toBeTruthy();
      expect(Region.EU_CENTRAL).toBeTruthy();
    });
    it('should validate inputs', () => {
      expect(() => Region.of(null)).toThrow(AssertionError);
      expect(() => Region.of('' as RegionKeys)).toThrow(AssertionError);
    });
  });
});
