// Object Values
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
export class Uom {
  private constructor(public value: string) {}
  public static of(uomId: string): Uom {
    return new Uom(uomId);
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
export class Ingredient {
  private constructor(public name: string, public uom: string, public quantity: number) {}
  public static of(name: string, uom: string, quantity: number): Ingredient {
    return new Ingredient(name, uom, quantity);
  }
}

export class Duration {
  private constructor(public value: number, public uom: string) {}

  public static of(value: number, uom: string): Duration {
    return new Duration(value, uom);
  }
}

export class Season {
  private constructor(public value: string) {}
  public static of(value: string): Season {
    return new Season(value);
  }
}

export class Cost {
  private constructor(public value: number) {}
  public static of(value: number): Cost {
    return new Cost(value);
  }
}

export class Region {
  private constructor(public value: string) {}
  public static of(value: string): Region {
    return new Region(value);
  }
}

// Aggregate
export class Recipe {
  private constructor(
    // TODO: slug for names
    public name: Name,
    public servings: Servings,
    public ingredients: Ingredient[],
    public preparationTime: Duration,
    public season: Season,
    public costs: Cost,
    public region: Region,
  ) {}

  public static of(
    name: string,
    servings: number,
    ingredients: { name: string; uom: string; quantity: number }[],
    prepTime: number,
    prepUom: string,
    season: string,
    costs: number,
    region: string,
  ): Recipe {
    return new Recipe(
      Name.of(name),
      Servings.of(servings),
      ingredients.map(({ name, quantity, uom }) => Ingredient.of(name, uom, quantity)),
      Duration.of(prepTime, prepUom),
      Season.of(season),
      Cost.of(costs),
      Region.of(region),
    );
  }
}
