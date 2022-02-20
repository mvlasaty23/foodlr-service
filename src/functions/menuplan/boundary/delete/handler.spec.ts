import headerSchema from '@functions/menuplan/boundary/dto/user.header.schema';
import { ValidatedAPIGatewayProxyEventAndHeader } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import schema from '../dto/delete.dto.schema';
import { deleteMenuplan$ } from './handler';

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
    const request: Partial<ValidatedAPIGatewayProxyEventAndHeader<typeof schema, typeof headerSchema>> = {
      headers: {
        'x-user-id': 'mock-user',
      },
      body: {
        day: '2022-02-12',
      },
    };
    // When
    const response = handler(
      request as ValidatedAPIGatewayProxyEventAndHeader<typeof schema, typeof headerSchema>,
      null,
      null,
    );
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockDeleteMenuplan$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
    });
  });
});
