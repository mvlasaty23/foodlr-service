import { ok as assertOk } from 'assert';

export type SeasonKeys = 'spring' | 'summer' | 'autumn' | 'winter' | 'all';

export class Season {
  private constructor(public value: SeasonKeys) {}
  public static of(value: SeasonKeys): Season {
    assertOk(!!value, 'Season should not be null');
    return new Season(value);
  }
  public static from(day: Date): Season {
    function isAfterOrSame(date: Date, monthDay: number, month: number): boolean {
      return date.getMonth() + 1 > month || (date.getMonth() + 1 === month && date.getDate() >= monthDay);
    }
    function isBefore(date: Date, monthDay: number, month: number): boolean {
      return date.getMonth() + 1 < month || (date.getMonth() + 1 === month && date.getDate() < monthDay);
    }
    if (isAfterOrSame(day, 21, 12) || isBefore(day, 20, 3)) {
      return Season.of('winter');
    } else if (isAfterOrSame(day, 22, 9)) {
      return Season.of('autumn');
    } else if (isAfterOrSame(day, 21, 6)) {
      return Season.of('summer');
    } else {
      return Season.of('spring');
    }
  }

  public equals(that: Season): boolean {
    if (!that || !that.value) {
      return false;
    }
    if (that.value === 'all') {
      return true;
    }
    return this.value === that.value;
  }
}

export const seasons: { [k in SeasonKeys]: Season } = {
  spring: Season.of('spring'),
  summer: Season.of('summer'),
  autumn: Season.of('autumn'),
  winter: Season.of('winter'),
  all: Season.of('all'),
} as const;
