import { IngredientId, Name, PreparationMethod, Quantity, Recipe, Servings, Uom } from './recipe.model';

describe('Recipe', () => {
  it('should construct from parameters', () => {
    // Given
    const name = 'Burger';
    const servings = 2;
    const ingredients = [{ name: 'Patty', quantity: 2, uom: 'pcs' }];
    const preparation = { quantity: 30, uom: 'minutes' };
    const season = 'summer';
    const costs = 3;
    const region = 'ce';
    // When
    const recipe = Recipe.of(name, servings, ingredients, preparation.quantity, preparation.uom, season, costs, region);
    // Then
    expect(recipe).toHaveProperty('name.value', name);
    expect(recipe).toHaveProperty('servings.value', servings);
  });
});

type DomainFactory<TR> = (value: string | number) => TR;
interface TestCase<T> {
  objName: string;
  value: string | number;
  factory: DomainFactory<T>;
}
[
  { objName: 'Name', value: 'string', factory: (value: string) => Name.of(value) } as TestCase<Name>,
  { objName: 'Servings', value: 23, factory: (value: number) => Servings.of(value) } as TestCase<Servings>,
  {
    objName: 'PreparationMethod',
    value: 'string',
    factory: (value: string) => PreparationMethod.of(value),
  } as TestCase<PreparationMethod>,
  { objName: 'UomId', value: 'string', factory: (value: string) => Uom.of(value) } as TestCase<Uom>,
  { objName: 'Quantity', value: 23, factory: (value: number) => Quantity.of(value) } as TestCase<Quantity>,
  {
    objName: 'IngredientId',
    value: 'string',
    factory: (value: string) => IngredientId.of(value),
  } as TestCase<IngredientId>,
].forEach((testCase) => {
  describe(`${testCase.objName}`, () => {
    it(`should create from ${testCase.value}`, () => {
      expect({ ...testCase.factory(testCase.value) }).toStrictEqual({
        value: testCase.value,
      });
    });
  });
});
