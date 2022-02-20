import { ok as assertOk } from 'assert';
import { Cost } from './cost.model';
import { Duration } from './duration.model';
import { Ingredient } from './ingredient';
import { MealType, MealTypes } from './mealtype.model';
import { Region, RegionKeys } from './region.model';
import { Season, SeasonKeys } from './season.model';

// Object Values
export class Name {
  private constructor(public value: string) {}
  public static of(name: string): Name {
    assertOk(!!name, 'Name should not be null');
    return new Name(name);
  }
}
export class Servings {
  private constructor(public value: number) {}
  public static of(servingsCount: number): Servings {
    assertOk(servingsCount && servingsCount > 0, 'Servings should not be null or less than 1');
    return new Servings(servingsCount);
  }
}

export class RecipeId {
  private constructor(public value?: string) {}
  public static of(value?: string): RecipeId {
    return new RecipeId(value);
  }

  public orElse(defaultValue: string): string {
    return this.value ? this.value : defaultValue;
  }
}

// Aggregate
export interface IRecipe {
  identity: RecipeId;
  name: Name;
  servings: Servings;
  ingredients: Ingredient[];
  preparationTime: Duration;
  season: Season;
  costs: Cost;
  region: Region;
  type: MealType;
}
export interface IIngredient {
  name: string;
  uom: string;
  quantity: number;
}
export class Recipe implements IRecipe {
  private constructor(
    public identity: RecipeId,
    public name: Name,
    public servings: Servings,
    public ingredients: Ingredient[],
    public preparationTime: Duration,
    public season: Season,
    public costs: Cost,
    public region: Region,
    public type: MealType,
  ) {}

  public static of(options: {
    identity?: string;
    name: string;
    servings: number;
    ingredients: IIngredient[];
    prepTime: number;
    season: SeasonKeys;
    costs: number;
    region: RegionKeys;
    type: MealTypes;
  }): Recipe {
    return new Recipe(
      RecipeId.of(options.identity),
      Name.of(options.name),
      Servings.of(options.servings),
      options.ingredients.map(({ name, quantity, uom }) => Ingredient.of(name, quantity, uom)),
      Duration.of(options.prepTime),
      Season.of(options.season),
      Cost.of(options.costs),
      Region.of(options.region),
      MealType.of(options.type),
    );
  }
}
