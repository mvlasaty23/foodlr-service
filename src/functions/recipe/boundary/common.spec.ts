import { Recipe } from '@functions/recipe/domain/recipe.model';
import { firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapToRecipeDto } from './common';

describe('Common boundary', () => {
  describe('mapToRecipeDto', () => {
    it('should map a recipe to dto', () => {
      // Given
      const recipe = Recipe.of('id', 'Burger', 2);
      return firstValueFrom(
        of(recipe).pipe(
          // When
          mapToRecipeDto,
          map((dto) =>
            // Then
            expect(dto).toStrictEqual({
              body: JSON.stringify({
                id: 'id',
                name: 'Burger',
                servings: 2,
                preparationSteps: [],
              }),
              statusCode: 200,
            }),
          ),
        ),
      );
    });
  });
});
