import { ShoppingList } from '@domain/menuplan.model';
import { ValidatedAPIGatewayProxyEventAndHeader } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import bodySchema from '../dto/shoppinglist.dto.schema';
import headerSchema from '../dto/user.header.schema';
import { getShoppinglist$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockGetShoppinglist$ = jest.fn<Promise<ShoppingList>, any>();

jest.mock('aws-sdk');
jest.mock('@functions/menuplan/control/menuplan.service', () =>
  jest.fn().mockImplementation(() => ({
    getShoppinglist$: () => mockGetShoppinglist$(),
  })),
);

describe('Shoppinglist Handler', () => {
  const handler = getShoppinglist$;
  it('should return a shoppinglist', () => {
    // Given
    mockGetShoppinglist$.mockReturnValue(Promise.resolve(new ShoppingList([])));
    const request: Partial<ValidatedAPIGatewayProxyEventAndHeader<typeof bodySchema, typeof headerSchema>> = {
      body: {
        startDay: '2022-02-23',
      },
      headers: {
        'x-user-id': 'mockuser',
      },
    };
    // When
    const response = handler(
      request as ValidatedAPIGatewayProxyEventAndHeader<typeof bodySchema, typeof headerSchema>,
      null,
      null,
    );
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockGetShoppinglist$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
});
