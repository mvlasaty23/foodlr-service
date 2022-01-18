import { Recipe } from '@functions/recipe/domain/recipe.model';
import { firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapToRecipeDto } from './common';

describe('Common boundary', () => {
  describe('mapToRecipeDto', () => {
    it('should map a recipe to dto', () => {
      // Given
      const recipe = Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'uom', 'season', 2, 'region');
      return firstValueFrom(
        of(recipe).pipe(
          // When
          mapToRecipeDto,
          map((dto) =>
            // Then
            expect(dto).toStrictEqual({
              body: JSON.stringify({
                name: 'name',
                servings: 2,
                ingredients: [{ name: 'name', quantity: 2, uom: 'uom' }],
                preparationTime: 2,
                preparationUom: 'uom',
                season: 'season',
                costs: 2,
                region: 'region',
              }),
              statusCode: 200,
            }),
          ),
        ),
      );
    });
  });
});
