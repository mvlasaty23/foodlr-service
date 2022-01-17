import { Recipe, RecipeId } from '@functions/recipe/domain/recipe.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Observable, of } from 'rxjs';
import { findOne$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFind$ = jest.fn<Observable<Recipe>, any>();

jest.mock('aws-sdk');
jest.mock('@functions/recipe/entity/recipe.repository');
jest.mock('@functions/recipe/control/recipe.service', () =>
  jest.fn().mockImplementation(() => ({
    find$: (id: RecipeId) => mockFind$(id),
  })),
);

describe('Recipe Find One Handler', () => {
  const handler = findOne$;
  it('should find a recipe by id', () => {
    // Given
    mockFind$.mockReturnValue(
      of(Recipe.of('id', 'name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'uom', 'season', 2, 'region')),
    );
    const request: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: 'id',
      },
    };
    // When
    const response = handler(request as APIGatewayProxyEvent, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockFind$).toHaveBeenCalledWith(RecipeId.of('id'));
      expect(res).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
          id: 'id',
          name: 'name',
          servings: 2,
          ingredients: [
            {
              name: 'name',
              quantity: 2,
              uom: 'uom',
            },
          ],
          preparationTime: 2,
          preparationUom: 'uom',
          season: 'season',
          costs: 2,
          region: 'region',
        }),
      });
    });
  });
});
