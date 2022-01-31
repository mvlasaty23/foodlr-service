import { recipe as MockRecipe } from '@domain/mock.model';
import { firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapToRecipeDto } from './common';

describe('Common boundary', () => {
  describe('mapToRecipeDto', () => {
    it('should map a recipe to dto', () => {
      // Given
      const recipe = MockRecipe;
      return firstValueFrom(
        of(recipe).pipe(
          // When
          mapToRecipeDto,
          map((dto) =>
            // Then
            expect(dto).toStrictEqual({
              body: JSON.stringify({
                identity: 'id',
                name: 'name',
                servings: 2,
                ingredients: [{ name: 'name', quantity: 2, uom: 'g' }],
                preparationTime: 2,
                season: 'all',
                costs: 2,
                region: 'eu-central',
                type: 'meat',
              }),
              statusCode: 200,
            }),
          ),
        ),
      );
    });
  });
});
