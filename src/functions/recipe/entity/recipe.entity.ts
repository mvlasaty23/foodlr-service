import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class RecipeEntity {
  private constructor(public id: string, public name: string, public servings: number) {}

  public static of(attributes: DocumentClient.AttributeMap): RecipeEntity {
    return new RecipeEntity(attributes['id'] as string, attributes['name'] as string, attributes['servings'] as number);
  }
}
