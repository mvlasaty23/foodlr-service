import { Recipe } from '@domain/recipe.model';
import { Region } from '@domain/region.model';
import { firstValueFrom, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import RecipeService from '../control/recipe.service';
import { RecipeFacade } from './recipe.facade';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFindByRegion$ = jest.fn<Observable<Recipe[]>, any>();
jest.mock('@functions/recipe/entity/recipe.repository');
jest.mock('@functions/recipe/control/recipe.service');
RecipeService.of = jest.fn().mockReturnValue({
  findByRegion$: (region: Region) => mockFindByRegion$(region),
});

describe('Recipe Facade', () => {
  const facade = new RecipeFacade({} as AWS.DynamoDB.DocumentClient, 'mockTable');

  describe('findByRegion$', () => {
    it('should call recipeService.findByRegion$', () => {
      // Given
      (mockFindByRegion$ as jest.Mock).mockReturnValue(of([]));
      // When
      return firstValueFrom(
        facade.findByRegion$(Region.EU_CENTRAL).pipe(
          map((recipes) => {
            expect(recipes).toBeTruthy();
            expect(mockFindByRegion$).toHaveBeenCalled();
          }),
        ),
      );
    });
  });
});
