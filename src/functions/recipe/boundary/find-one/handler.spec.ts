import { recipe as MockRecipe, recipeId as MockRecipeId } from '@domain/mock.model';
import { Recipe } from '@domain/recipe.model';
import { IRecipeIdentity } from '@functions/recipe/control/recipe.service';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Observable, of } from 'rxjs';
import { findOne$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFind$ = jest.fn<Observable<Recipe>, any>();

jest.mock('aws-sdk');
jest.mock('@functions/recipe/entity/recipe.repository');
jest.mock('@functions/recipe/control/recipe.service', () => ({
  of: jest.fn().mockImplementation(() => ({
    find$: (id: IRecipeIdentity) => mockFind$(id),
  })),
}));

describe('Recipe Find One Handler', () => {
  const handler = findOne$;
  it('should find a recipe by id', () => {
    // Given
    mockFind$.mockReturnValue(of(MockRecipe));
    const request: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: 'id',
      },
    };
    // When
    const response = handler(request as APIGatewayProxyEvent, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockFind$).toHaveBeenCalledWith({ identity: MockRecipeId });
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
