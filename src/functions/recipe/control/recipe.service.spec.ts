import { firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe, RecipeId } from '../domain/recipe.model';
import { RecipeRespository } from '../entity/recipe.repository';
import RecipeService from './recipe.service';

describe('RecipeService', () => {
  const mockRepository: Partial<RecipeRespository> = {
    find$: jest.fn(),
    create$: jest.fn(),
    save$: jest.fn(),
    delete$: jest.fn(),
  };
  const service = new RecipeService(mockRepository as RecipeRespository);

  describe('create$', () => {
    it('should create a recipe', () => {
      // Given
      const recipe = Recipe.of('id', 'name', 2);
      (mockRepository.create$ as jest.Mock).mockReturnValue(of(recipe.id));
      // When
      return firstValueFrom(
        service.create$(recipe).pipe(
          map((recipeId) => {
            expect(recipeId).toStrictEqual(recipe.id);
            expect(mockRepository.create$).toHaveBeenCalled();
          }),
        ),
      );
    });
  });
  describe('update$', () => {
    it('should update a recipe', () => {
      // Given
      const recipe = Recipe.of('id', 'name', 2);
      (mockRepository.save$ as jest.Mock).mockReturnValue(of(recipe));
      // When
      return firstValueFrom(
        service.update$(recipe).pipe(
          map((recipe) => {
            expect(recipe).toStrictEqual(recipe);
            expect(mockRepository.save$).toHaveBeenCalled();
          }),
        ),
      );
    });
  });
  describe('find$', () => {
    it('should find a recipe', () => {
      // Given
      const recipe = Recipe.of('id', 'name', 2);
      (mockRepository.find$ as jest.Mock).mockReturnValue(of(recipe));
      // When
      return firstValueFrom(
        service.find$(recipe.id).pipe(
          map((recipe) => {
            expect(recipe).toStrictEqual(recipe);
            expect(mockRepository.find$).toHaveBeenCalled();
          }),
        ),
      );
    });
  });
  describe('delete$', () => {
    it('should delete a recipe', () => {
      // Given
      (mockRepository.delete$ as jest.Mock).mockReturnValue(of(true));
      // When
      return firstValueFrom(
        service.delete$(RecipeId.of('id')).pipe(
          map(() => {
            expect(mockRepository.delete$).toHaveBeenCalled();
          }),
        ),
      );
    });
  });
});
