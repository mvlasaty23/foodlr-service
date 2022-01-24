import { AssertionError } from 'assert';
import { Uom } from './uom.model';

describe('Uom', () => {
  describe('of', () => {
    it('should create a Uom', () => {
      expect(Uom.of('cl')).toBeTruthy();
    });
    it('should validate inputs', () => {
      expect(() => Uom.of(null)).toThrow(AssertionError);
    });
  });
});
