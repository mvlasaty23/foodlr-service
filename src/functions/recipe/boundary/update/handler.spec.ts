import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import { Recipe } from '@functions/recipe/domain/recipe.model';
import { ValidatedAPIGatewayProxyEvent } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { Observable, of } from 'rxjs';
import { update$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUpdate$ = jest.fn<Observable<Recipe>, any>();

jest.mock('aws-sdk');
jest.mock('@functions/recipe/entity/recipe.repository');
jest.mock('@functions/recipe/control/recipe.service', () =>
  jest.fn().mockImplementation(() => ({
    update$: (recipe: Recipe) => mockUpdate$(recipe),
  })),
);

describe('Recipe Update Handler', () => {
  const handler = update$;
  it('should create a new recipe', () => {
    // Given
    mockUpdate$.mockReturnValue(
      of(Recipe.of('id', 'name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'uom', 'season', 2, 'region')),
    );
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
      pathParameters: {
        id: 'id',
      },
      body: {
        name: 'name',
        servings: 2,
        ingredients: [
          {
            name: 'name',
            quantity: 2,
            uom: 'uom',
          },
        ],
        preparationTime: { quantity: 2, uom: 'uom' },
        season: 'season',
        costs: 2,
        region: 'region',
      },
    };
    // When
    const response = handler(request as ValidatedAPIGatewayProxyEvent<typeof schema>, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockUpdate$).toHaveBeenCalledWith(
        Recipe.of('id', 'name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'uom', 'season', 2, 'region'),
      );
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
