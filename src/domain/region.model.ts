import { ok as assertOk } from 'assert';

export type RegionKeys = 'eu-central';

export const regions: { [k in RegionKeys]: k } = {
  'eu-central': 'eu-central',
};

export class Region {
  private constructor(public value: RegionKeys) {}

  public static of(value: RegionKeys): Region {
    assertOk(!!value, 'Region should not be null');
    return new Region(value);
  }
  public static EU_CENTRAL = Region.of(regions['eu-central']);
}
