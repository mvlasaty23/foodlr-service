import { ok as assertOk } from 'assert';

export type MealTypesSearch = 'all';
export type MealTypes = 'meat' | 'pescetarian' | 'vegetarian' | 'vegan';
export const mealTypes: { [k in MealTypes | MealTypesSearch]: string } = {
  all: 'all',
  meat: 'meat',
  pescetarian: 'pescetarian',
  vegetarian: 'vegetarian',
  vegan: 'vegan',
};

export class MealType {
  private constructor(public value: MealTypes | MealTypesSearch) {}

  public static of(value: MealTypes | MealTypesSearch): MealType {
    assertOk(!!value);
    return new MealType(value);
  }

  public equals(that: MealType): boolean {
    if (!that) {
      return false;
    }
    if (that.value === mealTypes.all) {
      return true;
    }
    return this.value === that.value;
  }
}
