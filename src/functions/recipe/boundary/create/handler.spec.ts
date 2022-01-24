import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import { Recipe } from '@functions/recipe/domain/recipe.model';
import { ValidatedAPIGatewayProxyEvent } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { Observable, of } from 'rxjs';
import { create$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockCreate$ = jest.fn<Observable<Recipe>, any>();

jest.mock('aws-sdk');
jest.mock('@functions/recipe/entity/recipe.repository');
jest.mock('@functions/recipe/control/recipe.service', () =>
  jest.fn().mockImplementation(() => ({
    create$: () => mockCreate$(),
  })),
);

describe('Recipe Create Handler', () => {
  const handler = create$;
  it('should create a new recipe', () => {
    // Given
    mockCreate$.mockReturnValue(
      of(Recipe.of('name', 2, [{ name: 'name', quantity: 2, uom: 'uom' }], 2, 'season', 2, 'region')),
    );
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
      body: {
        name: 'Burger',
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
      expect(mockCreate$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
});