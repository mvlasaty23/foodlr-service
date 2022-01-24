import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { firstValueFrom, map } from 'rxjs';
import { Name, Recipe } from '../domain/recipe.model';
import { Region } from '../domain/region.model';
import { RecipeRespository } from './recipe.repository';

describe('RecipeRepository', () => {
  const mockTable = 'MOCK-TABLE';

  const mockClient: Partial<DocumentClient> = {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  const service = new RecipeRespository(mockClient as DocumentClient, mockTable);

  describe('find$', () => {
    it('should find a recipe by id', () => {
      // Given
      (mockClient.get as jest.Mock).mockReturnValue({
        promise: () =>
          Promise.resolve({
            Item: {
              Key: 'recipe',
              name: 'Burger',
              servings: 2,
              ingredients: [{ name: 'name', quantity: 2, uom: 'uom' }],
              preparationTime: { value: 2 },
              season: 'season',
              costs: 2,
              region: 'region',
            },
          }),
      });
      // When
      return firstValueFrom(
        service.find$({ region: Region.of('region'), name: Name.of('name') }).pipe(
          map((recipe) => {
            // Then
            expect(recipe).toBeTruthy();
            expect(mockClient.get).toHaveBeenCalledWith({
              TableName: mockTable,
              Key: { region: 'region', name: 'name' },
            });
          }),
        ),
      );
    });
  });

  describe('save$', () => {
    it('should update a recipe', () => {
      // Given
      const recipe = Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'season', 2, 'region');
      (mockClient.put as jest.Mock).mockReturnValue({
        promise: () =>
          Promise.resolve({
            Attributes: {
              name: 'Burger',
              servings: 2,
            },
          }),
      });
      // When
      return firstValueFrom(
        service.save$(recipe).pipe(
          map((savedRecipe) => {
            // Then
            expect(savedRecipe).toBeTruthy();
            expect(mockClient.put).toHaveBeenCalledWith({
              TableName: mockTable,
              Item: {
                name: recipe.name.value,
                servings: recipe.servings.value,
                ingredients: recipe.ingredients.map((it) => ({
                  name: it.name.value,
                  uom: it.uom.value,
                  quantity: it.quantity.value,
                })),
                preparationTime: { ...recipe.preparationTime },
                season: recipe.season.value,
                costs: recipe.costs.value,
                region: recipe.region.value,
              },
            });
          }),
        ),
      );
    });
  });
  describe('delete$', () => {
    it('should delete a recipe', () => {
      // Given
      (mockClient.delete as jest.Mock).mockReturnValue({
        promise: () =>
          Promise.resolve({
            Attributes: {
              name: 'Burger',
              servings: 2,
            },
          }),
      });
      // When
      return firstValueFrom(
        service.delete$({ region: Region.of('region'), name: Name.of('name') }).pipe(
          map((recipe) => {
            // Then
            expect(recipe).toBeTruthy();
            expect(mockClient.delete).toHaveBeenCalledWith({
              TableName: mockTable,
              Key: { region: 'region', name: 'name' },
            });
          }),
        ),
      );
    });
  });
});
