import { Day, MenuPlan } from '@domain/menuplan.model';
import schema from '@functions/menuplan/boundary/dto/create.dto.schema';
import headerSchema from '@functions/menuplan/boundary/dto/user.header.schema';
import { ValidatedAPIGatewayProxyEventAndHeader } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { createMenuPlan$ } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockGenerateMenuPlan$ = jest.fn<Promise<MenuPlan>, any>();

jest.mock('aws-sdk');
jest.mock('@functions/menuplan/control/menuplan.service', () =>
  jest.fn().mockImplementation(() => ({
    generateMenuPlan$: () => mockGenerateMenuPlan$(),
  })),
);

describe('Create Menuplan Handler', () => {
  const handler = createMenuPlan$;
  it('should create a new menuplan', () => {
    // Given
    mockGenerateMenuPlan$.mockReturnValue(
      Promise.resolve(new MenuPlan('mock-user', [], Day.of(new Date('2021-01-01')), Day.of(new Date('2021-01-06')))),
    );
    const request: Partial<ValidatedAPIGatewayProxyEventAndHeader<typeof schema, typeof headerSchema>> = {
      body: {
        period: {
          start: '2021-01-01',
          end: '2021-01-07',
        },
        habbits: {
          mealsPerDay: 2,
          costs: ['MODERATE'],
          prepTimes: ['FAST'],
          types: ['all'],
        },
      },
      headers: { 'x-user-id': 'mock-user' },
    };
    // When
    const response = handler(
      request as ValidatedAPIGatewayProxyEventAndHeader<typeof schema, typeof headerSchema>,
      null,
      null,
    );
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockGenerateMenuPlan$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
});
