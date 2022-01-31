import { recipe as MockRecipe } from '@domain/mock.model';
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
    mockUpdate$.mockReturnValue(of(MockRecipe));
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
      body: {
        identity: 'id',
        name: 'name',
        servings: 2,
        ingredients: [
          {
            name: 'name',
            quantity: 2,
            uom: 'g',
          },
        ],
        preparationTime: { quantity: 2, uom: 'uom' },
        season: 'all',
        costs: 2,
        region: 'eu-central',
        type: 'meat',
      },
    };
    // When
    const response = handler(request as ValidatedAPIGatewayProxyEvent<typeof schema>, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockUpdate$).toHaveBeenCalledWith(MockRecipe);
      expect(res).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
          identity: 'id',
          name: 'name',
          servings: 2,
          ingredients: [
            {
              name: 'name',
              quantity: 2,
              uom: 'g',
            },
          ],
          preparationTime: 2,
          season: 'all',
          costs: 2,
          region: 'eu-central',
          type: 'meat',
        }),
      });
    });
  });
});
