import { Day, MenuPlan } from '@domain/menuplan.model';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IRecipe, MenuPlanEntity } from './menuplan.entity';

describe('MenuplanEntity', () => {
  it('should construct from menuplan', () => {
    // Given
    const menuplan = new MenuPlan('mock-user', [], Day.of(new Date()), Day.of(new Date()));
    // When
    const entity = MenuPlanEntity.from(menuplan);
    // Then
    expect({ ...entity }).toStrictEqual({
      user: menuplan.user,
      startDay: menuplan.start.value.toISOString(),
      endDay: menuplan.end.value.toISOString(),
      recipes: menuplan.recipes,
    });
  });
  it('should construct from documentclient attributes', () => {
    // Given
    const attr: DocumentClient.AttributeMap = {
      user: 'mock-user',
      startDay: new Date().toISOString(),
      endDay: new Date().toISOString(),
      recipes: [],
    };
    // When
    const entity = MenuPlanEntity.of(attr);
    // Then
    expect({ ...entity }).toStrictEqual({
      user: attr['user'] as string,
      startDay: attr['startDay'] as string,
      endDay: attr['endDay'] as string,
      recipes: attr['recipes'] as IRecipe,
    });
  });
  it('should transform to menuplan', () => {
    // Given
    const menuplan = new MenuPlan('mock-user', [], Day.of(new Date()), Day.of(new Date()));
    const entity = MenuPlanEntity.from(menuplan);
    // When
    const menuplan2 = entity.toDomain();
    // Then
    expect(menuplan2).toStrictEqual(menuplan);
  });
});
