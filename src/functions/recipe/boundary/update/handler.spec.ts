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
    mockUpdate$.mockReturnValue(of(Recipe.of('id', 'name', 2)));
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
      pathParameters: {
        id: 'id',
      },
      body: {
        name: 'name',
        servings: 2,
      },
    };
    // When
    const response = handler(request as ValidatedAPIGatewayProxyEvent<typeof schema>, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockUpdate$).toHaveBeenCalledWith(Recipe.of('id', 'name', 2));
      expect(res).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
          id: 'id',
          name: 'name',
          servings: 2,
          preparationSteps: [],
        }),
      });
    });
  });
});
