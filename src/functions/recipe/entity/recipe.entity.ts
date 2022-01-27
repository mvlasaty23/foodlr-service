import { Recipe } from '@domain/recipe.model';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

interface IIngredient {
  name: string;
  quantity: number;
  uom: string;
}
interface IPreparationTime {
  value: number;
}
export class RecipeEntity {
  private constructor(
    public name: string,
    public servings: number,
    public ingredients: IIngredient[],
    public preparationTime: IPreparationTime,
    public season: string,
    public costs: number,
    public region: string,
  ) {}

  public static from(recipe: Recipe): RecipeEntity {
    return new RecipeEntity(
      recipe.name.value,
      recipe.servings.value,
      recipe.ingredients.map((it) => ({ name: it.name.value, quantity: it.quantity.value, uom: it.uom.value })),
      { value: recipe.preparationTime.value },
      recipe.season.value,
      recipe.costs.value,
      recipe.region.value,
    );
  }
  public static of(attributes: DocumentClient.AttributeMap): RecipeEntity {
    return new RecipeEntity(
      attributes['name'] as string,
      attributes['servings'] as number,
      attributes['ingredients'] as IIngredient[],
      attributes['preparationTime'] as IPreparationTime,
      attributes['season'] as string,
      attributes['costs'] as number,
      attributes['region'] as string,
    );
  }

  public toDomain(): Recipe {
    return Recipe.of(
      this.name,
      this.servings,
      this.ingredients,
      this.preparationTime.value,
      this.season,
      this.costs,
      this.region,
    );
  }
}
