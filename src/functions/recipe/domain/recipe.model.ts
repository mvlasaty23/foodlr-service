import { v4 as uuid } from 'uuid';

// Object Values
export class RecipeId {
  private constructor(public value: string) {}
  public static create(): RecipeId {
    return new RecipeId(uuid());
  }
  public static from(id: string): RecipeId {
    return new RecipeId(id);
  }
}
export class Name {
  private constructor(public value: string) {}
  public static of(name: string): Name {
    return new Name(name);
  }
}
export class Servings {
  private constructor(public value: number) {}
  private static DEFAULT = 2;
  public static orDefault(servingsCount: number): Servings {
    return new Servings(servingsCount || Servings.DEFAULT);
  }
}
export class PreparationMethod {
  private constructor(private value: string) {}
  public static of(preperation: string): PreparationMethod {
    return new PreparationMethod(preperation);
  }
}
export class UomId {
  private constructor(private value: string) {}
  public static of(uomId: string): UomId {
    return new UomId(uomId);
  }
}
export class Quantity {
  private constructor(private value: number) {}
  public static of(quantityId: number): Quantity {
    return new Quantity(quantityId);
  }
}
export class IngredientId {
  private constructor(private value: string) {}
  public static of(id: string): IngredientId {
    return new IngredientId(id);
  }
}
export class PreparedIngredient {
  private constructor(
    private id: IngredientId,
    private preparation: PreparationMethod,
    private uom: UomId,
    private quantity: Quantity,
  ) {}
  public static of(
    id: IngredientId,
    preparation: PreparationMethod,
    uom: UomId,
    quantity: Quantity,
  ): PreparedIngredient {
    return new PreparedIngredient(id, preparation, uom, quantity);
  }
}
export class PreparationStep {
  private constructor(private step: string) {}
  public static of(step: string): PreparationStep {
    return new PreparationStep(step);
  }
}

// Aggregate
export class Recipe {
  constructor(
    public id: RecipeId,
    public name: Name,
    public servings: Servings,
    // Projection of ingredient
    public ingredients: PreparedIngredient[],
    public preparations: PreparationStep[],
  ) {}

  public static of(id: string, name: string, servings: number): Recipe {
    return new Recipe(RecipeId.from(id), Name.of(name), Servings.orDefault(servings), [], []);
  }
  public static from(name: string, servings: number): Recipe {
    return new Recipe(RecipeId.create(), Name.of(name), Servings.orDefault(servings), [], []);
  }
}

export interface SearchModel {
  recipeName: string;
  season: string;
  region: string;
  expensivness: string;
  preparationTime: string;
}
