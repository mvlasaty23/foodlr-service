import { MenuPlan } from '@domain/menuplan.model';
import { menuplan } from '@domain/mock.model';
import { ValidatedAPIGatewayProxyEvent } from '@libs/apiGateway';
import { updateMenuplan$ } from './handler';
import schema from '../dto/update.dto.schema';
import { APIGatewayProxyResult } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUpdateMenuplan$ = jest.fn<Promise<MenuPlan>, any>();
jest.mock('aws-sdk');
jest.mock('@functions/menuplan/control/menuplan.service', () =>
  jest.fn().mockImplementation(() => ({
    updateMenuplan$: () => mockUpdateMenuplan$(),
  })),
);

describe('Update Menuplan Handler', () => {
  const handler = updateMenuplan$;
  it('should update a menuplan', () => {
    // Given
    mockUpdateMenuplan$.mockReturnValue(Promise.resolve(menuplan));
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
      headers: {
        'x-user-id': 'mv',
      },
      body: {
        startDay: '2022-01-01',
        endDay: '2022-01-02',
        recipes: [],
      },
    };
    // When
    const response = handler(request as ValidatedAPIGatewayProxyEvent<typeof schema>, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockUpdateMenuplan$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
});
