import { ok as assertOk } from 'assert';

export type SeasonKeys = 'spring' | 'summer' | 'autumn' | 'winter';

export class Season {
  private constructor(public value: SeasonKeys) {}
  public static of(value: SeasonKeys): Season {
    assertOk(!!value);
    return new Season(value);
  }
}

export const seasons: { [k in SeasonKeys]: Season } = {
  spring: Season.of('spring'),
  summer: Season.of('summer'),
  autumn: Season.of('autumn'),
  winter: Season.of('winter'),
} as const;
