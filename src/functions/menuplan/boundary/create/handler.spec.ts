import { MenuPlan } from '@domain/menuplan.model';
import schema from '@functions/menuplan/boundary/dto/create.dto.schema';
import { ValidatedAPIGatewayProxyEvent } from '@libs/apiGateway';
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
      Promise.resolve(new MenuPlan([], new Date('2021-01-01'), new Date('2021-01-06'))),
    );
    const request: Partial<ValidatedAPIGatewayProxyEvent<typeof schema>> = {
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
    };
    // When
    const response = handler(request as ValidatedAPIGatewayProxyEvent<typeof schema>, null, null);
    // Then
    return (response as Promise<APIGatewayProxyResult>).then((res) => {
      expect(mockGenerateMenuPlan$).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
});
