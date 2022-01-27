import { Recipe } from '@domain/recipe.model';
import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
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
  it('should update a recipe', () => {
    // Given
    mockUpdate$.mockReturnValue(
      of(Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'season', 2, 'region')),
    );
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
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
        Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'season', 2, 'region'),
      );
      expect(res).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
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
          season: 'season',
          costs: 2,
          region: 'region',
        }),
      });
    });
  });
});
