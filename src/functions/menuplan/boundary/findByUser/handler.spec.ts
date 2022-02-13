import { MenuPlan } from '@domain/menuplan.model';
import { menuplans, user as mockUser } from '@domain/mock.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { findMenuplans$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFindMenuplan$ = jest.fn<Promise<MenuPlan[]>, any>();
jest.mock('aws-sdk');
jest.mock('@functions/menuplan/control/menuplan.service', () =>
  jest.fn().mockImplementation(() => ({
    findMenuplans$: () => mockFindMenuplan$(),
  })),
);

describe('Find Menuplans Handler', () => {
  const handler = findMenuplans$;
  it('should find menuplans for user', () => {
    // Given
    mockFindMenuplan$.mockReturnValue(Promise.resolve(menuplans));
    const user = mockUser;
    const request: Partial<APIGatewayProxyEvent> = {
      headers: {
        'x-user-id': user,
      },
    };
    // When
    const response = handler(request as APIGatewayProxyEvent, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockFindMenuplan$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
});
