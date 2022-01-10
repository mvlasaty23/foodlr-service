import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { firstValueFrom, map, of } from 'rxjs';
import { Recipe, RecipeId } from '../domain/recipe.model';
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
      const id = '029381ca-ea83-4aa8-b5c9-2163bb3ce742';
      (mockClient.get as jest.Mock).mockReturnValue({
        promise: () =>
          of({
            Item: {
              id,
              groupKey: 'recipe',
              name: 'Burger',
              servings: 2,
            },
          }),
      });
      // When
      return firstValueFrom(
        service.find$(RecipeId.of(id)).pipe(
          map((recipe) => {
            // Then
            expect(recipe).toStrictEqual(Recipe.of(id, 'Burger', 2));
            expect(mockClient.get).toHaveBeenCalledWith({ TableName: mockTable, Key: { id, groupKey: 'recipe' } });
          }),
        ),
      );
    });
  });
  describe('create$', () => {
    it('should create a recipe', () => {
      // Given
      const id = '029381ca-ea83-4aa8-b5c9-2163bb3ce743';
      const recipe = Recipe.of(id, 'Burger', 2);
      (mockClient.put as jest.Mock).mockReturnValue({
        promise: () =>
          of({
            Attributes: {
              id,
              groupKey: 'recipe',
              name: 'Burger',
              servings: 2,
            },
          }),
      });
      // When
      return firstValueFrom(
        service.create$(recipe).pipe(
          map((recipeId) => {
            // Then
            expect(recipeId).toStrictEqual(RecipeId.of(id));
            expect(mockClient.put).toHaveBeenCalledWith({
              TableName: mockTable,
              Item: { id, groupKey: 'recipe', name: recipe.name.value, servings: recipe.servings.value },
            });
          }),
        ),
      );
    });
  });
  describe('save$', () => {
    it('should update a recipe', () => {
      // Given
      const id = '029381ca-ea83-4aa8-b5c9-2163bb3ce744';
      const recipe = Recipe.of(id, 'Burger', 2);
      (mockClient.put as jest.Mock).mockReturnValue({
        promise: () =>
          of({
            Attributes: {
              id,
              groupKey: 'recipe',
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
            expect(savedRecipe).toStrictEqual(Recipe.of(id, 'Burger', 2));
            expect(mockClient.put).toHaveBeenCalledWith({
              TableName: mockTable,
              Item: { id, groupKey: 'recipe', name: recipe.name.value, servings: recipe.servings.value },
            });
          }),
        ),
      );
    });
  });
  describe('delete$', () => {
    it('should delete a recipe', () => {
      // Given
      const id = '029381ca-ea83-4aa8-b5c9-2163bb3ce745';
      (mockClient.delete as jest.Mock).mockReturnValue({
        promise: () =>
          of({
            Attributes: {
              id,
              groupKey: 'recipe',
              name: 'Burger',
              servings: 2,
            },
          }),
      });
      // When
      return firstValueFrom(
        service.delete$(RecipeId.of(id)).pipe(
          map((recipe) => {
            // Then
            expect(recipe).toBeTruthy();
            expect(mockClient.delete).toHaveBeenCalledWith({
              TableName: mockTable,
              Key: { id, groupKey: 'recipe' },
            });
          }),
        ),
      );
    });
  });
});
