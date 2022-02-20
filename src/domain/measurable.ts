export type MassMetricUnitOfMeasure = 'g' | 'mg' | 'dg' | 'kg';
export type VolumeMetricUnitOfMeasure = 'l' | 'ml' | 'cl' | 'dl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Measureable<TK extends MassMetricUnitOfMeasure | VolumeMetricUnitOfMeasure = any> {
  protected abstract baseFactors: { [k in TK]: number };
  constructor(public uom: TK, public value: number) {}

  public abstract add(that: Measureable<TK>): Measureable<TK>;
  public abstract substract(that: Measureable<TK>): Measureable<TK>;
  public abstract toScale(unit: TK): Measureable<TK>;

  public baseUnit(): TK {
    return Object.entries(this.baseFactors).find((factor) => factor[1] === 0)[0] as TK;
  }
  public isBaseScale(): boolean {
    return this.baseFactors[this.uom] === 0;
  }
  protected toBaseScale(): number {
    return this.value * Math.pow(10, this.baseFactors[this.uom]);
  }
  protected scaleTo(unit: TK): number {
    const baseFactor = this.baseFactors[`${unit.toString()}`] as number;
    return this.toBaseScale() * Math.pow(10, Math.sign(baseFactor) <= 0 ? Math.abs(baseFactor) : -Math.abs(baseFactor));
  }
}

export class MassMetric extends Measureable<MassMetricUnitOfMeasure> {
  protected override baseFactors = {
    mg: -3,
    g: 0,
    dg: 1,
    kg: 3,
  };

  private constructor(uom: MassMetricUnitOfMeasure, value: number) {
    super(uom, value);
  }

  public static of(value: number, uom: MassMetricUnitOfMeasure): MassMetric {
    return new MassMetric(uom, value);
  }

  public add(that: MassMetric): MassMetric {
    return MassMetric.of(this.toBaseScale() + that.toBaseScale(), this.baseUnit()).toScale(this.uom);
  }
  public substract(that: MassMetric): MassMetric {
    return MassMetric.of(Math.abs(this.toBaseScale() - that.toBaseScale()), this.baseUnit()).toScale(this.uom);
  }
  public toScale(unit: MassMetricUnitOfMeasure): MassMetric {
    return MassMetric.of(this.scaleTo(unit), unit);
  }
}

export class VolumeMetric extends Measureable<VolumeMetricUnitOfMeasure> {
  protected override baseFactors = {
    ml: -3,
    cl: -2,
    dl: -1,
    l: 0,
  };

  private constructor(uom: VolumeMetricUnitOfMeasure, value: number) {
    super(uom, value);
  }

  public static of(value: number, uom: VolumeMetricUnitOfMeasure): VolumeMetric {
    return new VolumeMetric(uom, value);
  }

  public add(that: VolumeMetric): VolumeMetric {
    return new VolumeMetric(this.baseUnit(), this.toBaseScale() + that.toBaseScale()).toScale(this.uom);
  }
  public substract(that: VolumeMetric): VolumeMetric {
    return new VolumeMetric(this.baseUnit(), Math.abs(this.toBaseScale() - that.toBaseScale())).toScale(this.uom);
  }
  public toScale(unit: VolumeMetricUnitOfMeasure): VolumeMetric {
    return VolumeMetric.of(this.scaleTo(unit), unit);
  }
}

export function measureableOf(
  value: number,
  uom: string,
): Measureable<MassMetricUnitOfMeasure> | Measureable<VolumeMetricUnitOfMeasure> {
  const massMetric: MassMetricUnitOfMeasure[] = ['dg', 'g', 'kg', 'mg'];
  const volumeMetric: VolumeMetricUnitOfMeasure[] = ['cl', 'dl', 'l', 'ml'];
  if (massMetric.findIndex((it) => it === uom) > -1) {
    return MassMetric.of(value, uom as MassMetricUnitOfMeasure);
  } else if (volumeMetric.findIndex((it) => it === uom) > -1) {
    return VolumeMetric.of(value, uom as VolumeMetricUnitOfMeasure);
  }
  throw new Error(`Unknown unit of measure ${uom}`);
}
