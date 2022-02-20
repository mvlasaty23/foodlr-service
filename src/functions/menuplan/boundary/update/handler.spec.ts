import { MenuPlan } from '@domain/menuplan.model';
import { menuplan } from '@domain/mock.model';
import headerSchema from '@functions/menuplan/boundary/dto/user.header.schema';
import { ValidatedAPIGatewayProxyEventAndHeader } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import schema from '../dto/update.dto.schema';
import { updateMenuplan$ } from './handler';

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
    const request: Partial<ValidatedAPIGatewayProxyEventAndHeader<typeof schema, typeof headerSchema>> = {
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
    const response = handler(
      request as ValidatedAPIGatewayProxyEventAndHeader<typeof schema, typeof headerSchema>,
      null,
      null,
    );
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockUpdateMenuplan$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
});
