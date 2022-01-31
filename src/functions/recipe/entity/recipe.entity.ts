import { MealTypes } from '@domain/mealtype.model';
import { Recipe } from '@domain/recipe.model';
import { RegionKeys } from '@domain/region.model';
import { SeasonKeys } from '@domain/season.model';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';
interface IIngredient {
  name: string;
  quantity: number;
  uom: string;
}
interface IPreparationTime {
  value: number;
}

/**
 * GPI ById
 */
export interface Identifieable {
  identity: string;
  name: string;
}

/**
 * GSI ByRegion
 */
export interface Localizable {
  region: string;
}
export class RecipeEntity implements Identifieable, Localizable {
  private constructor(
    public identity: string,
    public name: string,
    public servings: number,
    public ingredients: IIngredient[],
    public preparationTime: IPreparationTime,
    public season: string,
    public costs: number,
    public region: string,
    public type: string,
  ) {}

  public static from(recipe: Recipe): RecipeEntity {
    return new RecipeEntity(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      recipe.identity.orElse(uuid()),
      recipe.name.value,
      recipe.servings.value,
      recipe.ingredients.map((it) => ({ name: it.name.value, quantity: it.quantity.value, uom: it.uom.value })),
      { value: recipe.preparationTime.value },
      recipe.season.value,
      recipe.costs.value,
      recipe.region.value,
      recipe.type.value,
    );
  }
  public static of(attributes: DocumentClient.AttributeMap): RecipeEntity {
    return new RecipeEntity(
      attributes['identity'] as string,
      attributes['name'] as string,
      attributes['servings'] as number,
      attributes['ingredients'] as IIngredient[],
      attributes['preparationTime'] as IPreparationTime,
      attributes['season'] as string,
      attributes['costs'] as number,
      attributes['region'] as string,
      attributes['type'] as string,
    );
  }

  public toDomain(): Recipe {
    return Recipe.of({
      identity: this.identity,
      name: this.name,
      servings: this.servings,
      ingredients: this.ingredients,
      prepTime: this.preparationTime.value,
      season: this.season as SeasonKeys,
      costs: this.costs,
      region: this.region as RegionKeys,
      type: this.type as MealTypes,
    });
  }
}
