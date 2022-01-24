import { firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Name, Recipe } from '../domain/recipe.model';
import { Region } from '../domain/region.model';
import { RecipeRespository } from '../entity/recipe.repository';
import RecipeService from './recipe.service';

describe('RecipeService', () => {
  const mockRepository: Partial<RecipeRespository> = {
    find$: jest.fn(),
    save$: jest.fn(),
    delete$: jest.fn(),
  };
  const service = new RecipeService(mockRepository as RecipeRespository);

  describe('create$', () => {
    it('should create a recipe', () => {
      // Given
      const recipe = Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'season', 2, 'region');
      (mockRepository.save$ as jest.Mock).mockReturnValue(of(recipe));
      // When
      return firstValueFrom(
        service.create$(recipe).pipe(
          map((recipe) => {
            expect(recipe).toStrictEqual(recipe);
            expect(mockRepository.save$).toHaveBeenCalled();
          }),
        ),
      );
    });
  });
  describe('update$', () => {
    it('should update a recipe', () => {
      // Given
      const recipe = Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'season', 2, 'region');
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
      const recipe = Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'season', 2, 'region');
      (mockRepository.find$ as jest.Mock).mockReturnValue(of(recipe));
      // When
      return firstValueFrom(
        service.find$({ region: Region.of('region'), name: Name.of('name') }).pipe(
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
        service.delete$({ region: Region.of('region'), name: Name.of('name') }).pipe(
          map(() => {
            expect(mockRepository.delete$).toHaveBeenCalled();
          }),
        ),
      );
    });
  });
});
