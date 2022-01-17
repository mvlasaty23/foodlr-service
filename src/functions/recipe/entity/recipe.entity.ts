import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Recipe } from '../domain/recipe.model';

interface IIngredient {
  name: string;
  quantity: number;
  uom: string;
}
interface IPreparationTime {
  value: number;
  uom: string;
}
export class RecipeEntity {
  public groupKey = 'recipe';

  private constructor(
    public id: string,
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
      recipe.id.value,
      recipe.name.value,
      recipe.servings.value,
      recipe.ingredients.map((it) => ({ ...it })),
      { value: recipe.preparationTime.value, uom: recipe.preparationTime.uom },
      recipe.season.value,
      recipe.costs.value,
      recipe.region.value,
    );
  }
  public static of(attributes: DocumentClient.AttributeMap): RecipeEntity {
    return new RecipeEntity(
      attributes['id'] as string,
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
      this.id,
      this.name,
      this.servings,
      this.ingredients,
      this.preparationTime.value,
      this.preparationTime.uom,
      this.season,
      this.costs,
      this.region,
    );
  }
}
