import { Measureable, measureableOf } from './measurable';
import { Name } from './recipe.model';

export class Ingredient {
  private constructor(public name: Name, public amount: Measureable) {}
  public static of(name: string, value: number, uom: string): Ingredient {
    return new Ingredient(Name.of(name), measureableOf(value, uom));
  }
}
