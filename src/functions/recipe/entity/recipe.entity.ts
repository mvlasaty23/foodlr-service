import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Recipe } from '../domain/recipe.model';

export class RecipeEntity {
  public groupKey = 'recipe';

  private constructor(public id: string, public name: string, public servings: number) {}

  public toDomain(): Recipe {
    return Recipe.of(this.id, this.name, this.servings);
  }
  public static from(recipe: Recipe): RecipeEntity {
    return new RecipeEntity(recipe.id.value, recipe.name.value, recipe.servings.value);
  }
  public static of(attributes: DocumentClient.AttributeMap): RecipeEntity {
    return new RecipeEntity(attributes['id'] as string, attributes['name'] as string, attributes['servings'] as number);
  }
}
