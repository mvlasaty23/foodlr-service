import { MassMetric, MassMetricUnitOfMeasure, measureableOf, VolumeMetric } from './measurable';

describe('Measurable', () => {
  describe('measureableOf', () => {
    it('should create a MassMetric object', () => {
      const massMetric = measureableOf(1, 'g');
      expect(massMetric).toBeInstanceOf(MassMetric);
    });
    it('should create a VolumeMetric object', () => {
      const volumeMetric = measureableOf(1, 'l');
      expect(volumeMetric).toBeInstanceOf(VolumeMetric);
    });
    it('should throw on unknown uom', () => {
      expect(() => measureableOf(1, 'x' as MassMetricUnitOfMeasure)).toThrow(Error);
    });
  });
  describe('MassMetric', () => {
    it('should create', () => {
      expect(MassMetric.of(23, 'g')).toBeTruthy();
    });
    it('should have g as base unit', () => {
      expect(MassMetric.of(1, 'g').isBaseScale()).toBeTruthy();
      expect(MassMetric.of(1, 'kg').isBaseScale()).toBeFalsy();
      expect(MassMetric.of(1, 'kg').baseUnit()).toBe('g');
    });
    describe('add', () => {
      [
        {
          case: 'g and g',
          first: MassMetric.of(1, 'g'),
          second: MassMetric.of(1, 'g'),
          expected: MassMetric.of(2, 'g'),
        },
        {
          case: 'g and mg',
          first: MassMetric.of(1, 'g'),
          second: MassMetric.of(1000, 'mg'),
          expected: MassMetric.of(2, 'g'),
        },
        {
          case: 'mg and g',
          first: MassMetric.of(1000, 'mg'),
          second: MassMetric.of(1, 'g'),
          expected: MassMetric.of(2000, 'mg'),
        },
        {
          case: 'g and dg',
          first: MassMetric.of(10, 'g'),
          second: MassMetric.of(1, 'dg'),
          expected: MassMetric.of(20, 'g'),
        },
        {
          case: 'dg and g',
          first: MassMetric.of(1, 'dg'),
          second: MassMetric.of(10, 'g'),
          expected: MassMetric.of(2, 'dg'),
        },
        {
          case: 'g and kg',
          first: MassMetric.of(1000, 'g'),
          second: MassMetric.of(1, 'kg'),
          expected: MassMetric.of(2000, 'g'),
        },
        {
          case: 'kg and g',
          first: MassMetric.of(1, 'kg'),
          second: MassMetric.of(1000, 'g'),
          expected: MassMetric.of(2, 'kg'),
        },
      ].forEach((testCase) => {
        it(`should add ${testCase.case}`, () => {
          expect(testCase.first.add(testCase.second)).toStrictEqual(testCase.expected);
        });
      });
    });
    describe('substract', () => {
      [
        {
          case: 'g and g',
          first: MassMetric.of(1, 'g'),
          second: MassMetric.of(1, 'g'),
          expected: MassMetric.of(0, 'g'),
        },
        {
          case: 'g and mg',
          first: MassMetric.of(1, 'g'),
          second: MassMetric.of(1000, 'mg'),
          expected: MassMetric.of(0, 'g'),
        },
        {
          case: 'mg and g',
          first: MassMetric.of(1000, 'mg'),
          second: MassMetric.of(1, 'g'),
          expected: MassMetric.of(0, 'mg'),
        },
        {
          case: 'g and dg',
          first: MassMetric.of(10, 'g'),
          second: MassMetric.of(1, 'dg'),
          expected: MassMetric.of(0, 'g'),
        },
        {
          case: 'dg and g',
          first: MassMetric.of(1, 'dg'),
          second: MassMetric.of(10, 'g'),
          expected: MassMetric.of(0, 'dg'),
        },
        {
          case: 'g and kg',
          first: MassMetric.of(1000, 'g'),
          second: MassMetric.of(1, 'kg'),
          expected: MassMetric.of(0, 'g'),
        },
        {
          case: 'kg and g',
          first: MassMetric.of(1, 'kg'),
          second: MassMetric.of(1000, 'g'),
          expected: MassMetric.of(0, 'kg'),
        },
      ].forEach((testCase) => {
        it(`should substract ${testCase.case}`, () => {
          expect(testCase.first.substract(testCase.second)).toStrictEqual(testCase.expected);
        });
      });
    });
    describe('toScale', () => {
      [
        { case: 'g to g', actual: MassMetric.of(1, 'g'), scale: 'g', expected: MassMetric.of(1, 'g') },
        { case: 'g to mg', actual: MassMetric.of(1, 'g'), scale: 'mg', expected: MassMetric.of(1000, 'mg') },
        { case: 'mg to g', actual: MassMetric.of(1000, 'mg'), scale: 'g', expected: MassMetric.of(1, 'g') },
        { case: 'mg to dg', actual: MassMetric.of(10000, 'mg'), scale: 'dg', expected: MassMetric.of(1, 'dg') },
        { case: 'g to dg', actual: MassMetric.of(10, 'g'), scale: 'dg', expected: MassMetric.of(1, 'dg') },
        { case: 'dg to kg', actual: MassMetric.of(100, 'dg'), scale: 'kg', expected: MassMetric.of(1, 'kg') },
        { case: 'dg to g', actual: MassMetric.of(1, 'dg'), scale: 'g', expected: MassMetric.of(10, 'g') },
        { case: 'g to kg', actual: MassMetric.of(1000, 'g'), scale: 'kg', expected: MassMetric.of(1, 'kg') },
        { case: 'kg to g', actual: MassMetric.of(1, 'kg'), scale: 'g', expected: MassMetric.of(1000, 'g') },
      ].forEach((testCase) => {
        it(`should scale ${testCase.case}`, () => {
          expect(testCase.actual.toScale(testCase.scale as MassMetricUnitOfMeasure)).toStrictEqual(testCase.expected);
        });
      });
    });
  });
  describe('VolumeMetric', () => {
    it('should create', () => {
      expect(VolumeMetric.of(23, 'l')).toBeTruthy();
    });
    it('should have g as base unit', () => {
      expect(VolumeMetric.of(1, 'l').isBaseScale()).toBeTruthy();
      expect(VolumeMetric.of(1, 'ml').isBaseScale()).toBeFalsy();
      expect(VolumeMetric.of(1, 'ml').baseUnit()).toBe('l');
    });
    describe('add', () => {
      [
        {
          case: 'l and l',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(2, 'l'),
        },
        {
          case: 'l and ml',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(1000, 'ml'),
          expected: VolumeMetric.of(2, 'l'),
        },
        {
          case: 'ml and l',
          first: VolumeMetric.of(1000, 'ml'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(2000, 'ml'),
        },
        {
          case: 'l and cl',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(100, 'cl'),
          expected: VolumeMetric.of(2, 'l'),
        },
        {
          case: 'cl and l',
          first: VolumeMetric.of(100, 'cl'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(200, 'cl'),
        },
        {
          case: 'l and dl',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(10, 'dl'),
          expected: VolumeMetric.of(2, 'l'),
        },
        {
          case: 'dl and l',
          first: VolumeMetric.of(10, 'dl'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(20, 'dl'),
        },
      ].forEach((testCase) => {
        it(`should add ${testCase.case}`, () => {
          expect(testCase.first.add(testCase.second)).toStrictEqual(testCase.expected);
        });
      });
    });
    describe('substract', () => {
      [
        {
          case: 'l and l',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(0, 'l'),
        },
        {
          case: 'l and ml',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(1000, 'ml'),
          expected: VolumeMetric.of(0, 'l'),
        },
        {
          case: 'ml and l',
          first: VolumeMetric.of(1000, 'ml'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(0, 'ml'),
        },
        {
          case: 'l and cl',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(100, 'cl'),
          expected: VolumeMetric.of(0, 'l'),
        },
        {
          case: 'cl and l',
          first: VolumeMetric.of(100, 'cl'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(0, 'cl'),
        },
        {
          case: 'l and dl',
          first: VolumeMetric.of(1, 'l'),
          second: VolumeMetric.of(10, 'dl'),
          expected: VolumeMetric.of(0, 'l'),
        },
        {
          case: 'dl and l',
          first: VolumeMetric.of(10, 'dl'),
          second: VolumeMetric.of(1, 'l'),
          expected: VolumeMetric.of(0, 'dl'),
        },
      ].forEach((testCase) => {
        it(`should add ${testCase.case}`, () => {
          expect(testCase.first.substract(testCase.second)).toStrictEqual(testCase.expected);
        });
      });
    });
  });
});
