import { RecipeIdentity } from '@functions/recipe/control/recipe.service';
import { Name } from '@functions/recipe/domain/recipe.model';
import { Region } from '@functions/recipe/domain/region.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Observable, of } from 'rxjs';
import { delete$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockDelete$ = jest.fn<Observable<boolean>, any>();

jest.mock('aws-sdk');
jest.mock('@functions/recipe/entity/recipe.repository');
jest.mock('@functions/recipe/control/recipe.service', () =>
  jest.fn().mockImplementation(() => ({
    delete$: (deleteAction: RecipeIdentity) => mockDelete$(deleteAction),
  })),
);

describe('Recipe Delete Handler', () => {
  const handler = delete$;
  it('should delete a recipe', () => {
    // Given
    mockDelete$.mockReturnValue(of(true));
    const request: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        region: 'region',
        name: 'name',
      },
    };
    // When
    const response = handler(request as APIGatewayProxyEvent, null, null);
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockDelete$).toHaveBeenCalledWith({ region: Region.of('region'), name: Name.of('name') });
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeFalsy();
    });
  });
});
