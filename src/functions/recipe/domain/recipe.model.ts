import { v4 as uuid } from 'uuid';

// Object Values
export class RecipeId {
  private constructor(public value: string) {}
  public static create(): RecipeId {
    return new RecipeId(uuid());
  }
  public static of(id: string): RecipeId {
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
  public static of(servingsCount: number): Servings {
    return new Servings(servingsCount);
  }
}
export class PreparationMethod {
  private constructor(public value: string) {}
  public static of(preperation: string): PreparationMethod {
    return new PreparationMethod(preperation);
  }
}
export class UomId {
  private constructor(public value: string) {}
  public static of(uomId: string): UomId {
    return new UomId(uomId);
  }
}
export class Quantity {
  private constructor(public value: number) {}
  public static of(quantityId: number): Quantity {
    return new Quantity(quantityId);
  }
}
export class IngredientId {
  private constructor(public value: string) {}
  public static of(id: string): IngredientId {
    return new IngredientId(id);
  }
}
export class PreparedIngredient {
  private constructor(
    public id: IngredientId,
    public preparation: PreparationMethod,
    public uom: UomId,
    public quantity: Quantity,
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
  private constructor(public value: string) {}
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

  public static create(name: string, servings: number): Recipe {
    return new Recipe(RecipeId.create(), Name.of(name), Servings.of(servings), [], []);
  }
  public static of(id: string, name: string, servings: number): Recipe {
    return new Recipe(RecipeId.of(id), Name.of(name), Servings.of(servings), [], []);
  }
}

export interface SearchModel {
  recipeName: string;
  season: string;
  region: string;
  expensivness: string;
  preparationTime: string;
}
