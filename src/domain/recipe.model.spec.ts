import { Name, Quantity, Recipe, RecipeId, Servings } from './recipe.model';

describe('Recipe', () => {
  it('should construct from parameters', () => {
    // Given
    const id = 'id';
    const name = 'Burger';
    const servings = 2;
    const ingredients = [{ name: 'Patty', quantity: 2, uom: 'pcs' }];
    const preparation = { quantity: 30 };
    const season = 'summer';
    const costs = 3;
    const region = 'eu-central';
    const type = 'meat';
    // When
    const recipe = Recipe.of({
      identity: id,
      name,
      servings,
      ingredients,
      prepTime: preparation.quantity,
      season,
      costs,
      region,
      type,
    });
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
  { objName: 'Quantity', value: 23, factory: (value: number) => Quantity.of(value) } as TestCase<Quantity>,
  { objName: 'RecipeId', value: 'id', factory: (value: string) => RecipeId.of(value) } as TestCase<RecipeId>,
].forEach((testCase) => {
  describe(`${testCase.objName}`, () => {
    it(`should create from ${testCase.value}`, () => {
      expect({ ...testCase.factory(testCase.value) }).toStrictEqual({
        value: testCase.value,
      });
    });
  });
});
