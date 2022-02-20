/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { newRecipe as NewMockRecipe, recipe as MockRecipe } from '@domain/mock.model';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { RecipeEntity } from './recipe.entity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockV4 = jest.fn<string, any>();
jest.mock('uuid', () => ({ v4: jest.fn().mockImplementation(() => mockV4()) }));

describe('RecipeEntity', () => {
  const recipe = MockRecipe;

  it('should construct from domain object recipe', () => {
    // When
    const entity = RecipeEntity.from(recipe);
    // Then
    expect({ ...entity }).toStrictEqual({
      identity: recipe.identity.value,
      name: recipe.name.value,
      servings: recipe.servings.value,
      ingredients: recipe.ingredients.map((it) => ({
        name: it.name.value,
        uom: it.amount.uom,
        quantity: it.amount.value,
      })),
      preparationTime: { ...recipe.preparationTime },
      season: recipe.season.value,
      costs: recipe.costs.value,
      region: recipe.region.value,
      type: recipe.type.value,
    });
  });
  it('should create id from domain object recipe', () => {
    // Given
    mockV4.mockReturnValue('id');
    // When
    const entity = RecipeEntity.from(NewMockRecipe);
    // Then
    expect({ ...entity }).toStrictEqual({
      identity: recipe.identity.value,
      name: recipe.name.value,
      servings: recipe.servings.value,
      ingredients: recipe.ingredients.map((it) => ({
        name: it.name.value,
        uom: it.amount.uom,
        quantity: it.amount.value,
      })),
      preparationTime: { ...recipe.preparationTime },
      season: recipe.season.value,
      costs: recipe.costs.value,
      region: recipe.region.value,
      type: recipe.type.value,
    });
  });
  it('should construct from DocumentClient.AttributeMap', () => {
    // Given
    const attrMap: DocumentClient.AttributeMap = {
      identity: 'id',
      name: 'name',
      servings: 2,
      ingredients: [{ name: 'name', quantity: 2, uom: 'uom' }],
      preparationTime: { value: 2 },
      season: 'season',
      costs: 2,
      region: 'region',
      type: 'meat',
    };
    // When
    const entity = RecipeEntity.of(attrMap);
    // Then
    expect({ ...entity }).toStrictEqual({
      identity: attrMap.identity,
      name: attrMap.name,
      servings: attrMap.servings,
      ingredients: attrMap.ingredients,
      preparationTime: { ...attrMap.preparationTime },
      season: attrMap.season,
      costs: attrMap.costs,
      region: attrMap.region,
      type: attrMap.type,
    });
  });
  it('should transform to a domain object recipe', () => {
    // Given
    const entity = RecipeEntity.from(recipe);
    // When
    const recipe2 = entity.toDomain();
    // Then
    expect(recipe2).toStrictEqual(recipe);
  });
});
