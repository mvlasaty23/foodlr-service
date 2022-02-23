import { Day, MenuPlan } from '@domain/menuplan.model';
import { Identifieable } from './menuplan.entity';
import { MenuplanRepository } from './menuplan.repository';

describe('MenuplanRepository', () => {
  const mockDb: Partial<AWS.DynamoDB.DocumentClient> = {
    query: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  const mockTable = 'MockTable';
  const repository = new MenuplanRepository(mockDb as AWS.DynamoDB.DocumentClient, mockTable);
  it('should construct', () => {
    expect(repository).toBeTruthy();
  });
  describe('findByUser$', () => {
    it('should return all menuplans by user', () => {
      // Given
      const user = 'mockuser';
      (mockDb.query as jest.Mock).mockReturnValue({
        promise: () =>
          Promise.resolve({
            Items: [
              {
                user,
                startDay: '2022-02-12',
                endDay: '2022-02-14',
                recipes: [],
              },
            ],
          }),
      });
      // When
      return repository.findByUser$({ user }).then((menuplans) => {
        // Then
        expect(menuplans).toBeTruthy();
        expect(mockDb.query).toHaveBeenCalledWith({
          TableName: mockTable,
          KeyConditionExpression: '#u = :val',
          ExpressionAttributeNames: {
            '#u': 'user',
          },
          ExpressionAttributeValues: {
            ':val': user,
          },
        });
      });
    });
  });
  describe('findByPeriod$', () => {
    it('should find a menuplan', () => {
      // Given
      const user = 'mockuser';
      const startDay = '2021-01-01';
      (mockDb.query as jest.Mock).mockReturnValue({
        promise: () =>
          Promise.resolve({
            Items: [
              {
                user,
                startDay: '2022-02-12',
                endDay: '2022-02-14',
                recipes: [],
              },
            ],
          }),
      });
      // When
      const menuplan = repository.findByPeriod$({ user, startDay });
      // Then
      return menuplan.then((result) => {
        expect(mockDb.query).toHaveBeenCalled();
        expect(result).toBeTruthy();
      });
    });
  });
  describe('save$', () => {
    it('should save a menuplan', () => {
      // Given
      const menuplan = new MenuPlan('mockuser', [], Day.of(new Date()), Day.of(new Date()));
      (mockDb.put as jest.Mock).mockReturnValue({
        promise: () => Promise.resolve({}),
      });
      // When
      return repository.save$(menuplan).then((result) => {
        expect(result).toBeTruthy();
        expect(mockDb.put).toHaveBeenCalled();
      });
    });
  });
  describe('delete$', () => {
    it('should delete a menuplan by GPI', () => {
      // Given
      const identity: Identifieable = { user: 'mockuser', startDay: new Date().toISOString() };
      (mockDb.delete as jest.Mock).mockReturnValue({
        promise: () => Promise.resolve({}),
      });
      // When
      return repository.delete$(identity).then((result) => {
        expect(result).toBeTruthy();
        expect(mockDb.delete).toHaveBeenCalled();
      });
    });
  });
});
