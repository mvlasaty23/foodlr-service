/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Recipe } from '../domain/recipe.model';
import { RecipeEntity } from './recipe.entity';

describe('RecipeEntity', () => {
  it('should construct from domain object recipe', () => {
    // Given
    const recipe = Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'uom', 'season', 2, 'region');
    // When
    const entity = RecipeEntity.from(recipe);
    // Then
    expect({ ...entity }).toStrictEqual({
      name: recipe.name.value,
      servings: recipe.servings.value,
      ingredients: recipe.ingredients.map((it) => ({ ...it })),
      preparationTime: { ...recipe.preparationTime },
      season: recipe.season.value,
      costs: recipe.costs.value,
      region: recipe.region.value,
    });
  });
  it('should construct from DocumentClient.AttributeMap', () => {
    // Given
    const recipe: DocumentClient.AttributeMap = {
      name: 'name',
      servings: 2,
      ingredients: [{ name: 'name', quantity: 2, uom: 'uom' }],
      preparationTime: { uom: 'uom', value: 2 },
      season: 'season',
      costs: 2,
      region: 'region',
    };
    // When
    const entity = RecipeEntity.of(recipe);
    // Then
    expect({ ...entity }).toStrictEqual({
      name: recipe.name,
      servings: recipe.servings,
      ingredients: (recipe.ingredients as { name: string }[]).map((it) => ({ ...it })),
      preparationTime: { ...recipe.preparationTime },
      season: recipe.season,
      costs: recipe.costs,
      region: recipe.region,
    });
  });
  it('should transform to a domain object recipe', () => {
    // Given
    const recipe = Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'uom', 'season', 2, 'region');
    const entity = RecipeEntity.from(recipe);
    // When
    const recipe2 = entity.toDomain();
    // Then
    expect(recipe2).toStrictEqual(recipe);
  });
});
