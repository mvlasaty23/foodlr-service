import { deleteMenuplan$ } from './handler';
import schema from '../dto/delete.dto.schema';
import { ValidatedAPIGatewayProxyEvent } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockDeleteMenuplan$ = jest.fn<Promise<boolean>, any>();
jest.mock('aws-sdk');
jest.mock('@functions/menuplan/control/menuplan.service', () =>
  jest.fn().mockImplementation(() => ({
    deleteMenuplan$: () => mockDeleteMenuplan$(),
  })),
);

describe('Delete Menuplan Handler', () => {
  const handler = deleteMenuplan$;
  it('should delete a menuplan', () => {
    // Given
    mockDeleteMenuplan$.mockReturnValue(Promise.resolve(true));
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
      headers: {
        'x-user-id': 'mock-user',
      },
      body: {
        day: '2022-02-12',
      },
    };
    // When
    const response = handler(request as ValidatedAPIGatewayProxyEvent<typeof schema>, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockDeleteMenuplan$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
    });
  });
});
