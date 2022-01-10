/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Recipe } from '../domain/recipe.model';
import { RecipeEntity } from './recipe.entity';

describe('RecipeEntity', () => {
  it('should construct from domain object recipe', () => {
    // Given
    const recipe = Recipe.of('id', 'name', 2);
    // When
    const entity = RecipeEntity.from(recipe);
    // Then
    expect({ ...entity }).toStrictEqual({
      id: recipe.id.value,
      groupKey: 'recipe',
      name: recipe.name.value,
      servings: recipe.servings.value,
    });
  });
  it('should construct from DocumentClient.AttributeMap', () => {
    // Given
    const recipe: DocumentClient.AttributeMap = {
      id: 'id',
      groupKey: 'recipe',
      name: 'name',
      servings: 2,
    };
    // When
    const entity = RecipeEntity.of(recipe);
    // Then
    expect({ ...entity }).toStrictEqual({
      id: recipe.id,
      groupKey: 'recipe',
      name: recipe.name,
      servings: recipe.servings,
    });
  });
  it('should transform to a domain object recipe', () => {
    // Given
    const recipe = Recipe.of('id', 'name', 2);
    const entity = RecipeEntity.from(recipe);
    // When
    const recipe2 = entity.toDomain();
    // Then
    expect(recipe2).toStrictEqual(recipe);
  });
});
