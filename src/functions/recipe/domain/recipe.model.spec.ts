import {
  IngredientId,
  Name,
  PreparationMethod,
  PreparationStep,
  Quantity,
  Recipe,
  RecipeId,
  Servings,
  UomId,
} from './recipe.model';

describe('Recipe', () => {
  it('should create a new recipe', () => {
    // Given
    const name = 'Burger';
    const servings = 2;
    // When
    const recipe = Recipe.create(name, servings);
    // Then
    expect(recipe.id.value).toBeTruthy();
    expect(recipe).toHaveProperty('name.value', name);
    expect(recipe).toHaveProperty('servings.value', servings);
  });
  it('should construct from parameters', () => {
    // Given
    const id = 'id';
    const name = 'Burger';
    const servings = 2;
    // When
    const recipe = Recipe.of(id, name, servings);
    // Then
    expect(recipe).toHaveProperty('id.value', id);
    expect(recipe).toHaveProperty('name.value', name);
    expect(recipe).toHaveProperty('servings.value', servings);
  });
});

describe('RecipeId', () => {
  it('should create', () => {
    // When
    const recipeId = RecipeId.create();
    // Then
    expect(recipeId.value).toBeTruthy();
  });
  it('should construct from string', () => {
    // Given
    const id = 'id';
    // When
    const recipeId = RecipeId.of(id);
    // Then
    expect({ ...recipeId }).toStrictEqual({
      value: id,
    });
  });
});

type DomainFactory<TR> = (value: string | number) => TR;
interface TestCase<T> {
  objName: string;
  value: string | number;
  factory: DomainFactory<T>;
}
[
  { objName: 'RecipeId', value: 'string', factory: (value: string) => RecipeId.of(value) } as TestCase<RecipeId>,
  { objName: 'Name', value: 'string', factory: (value: string) => Name.of(value) } as TestCase<Name>,
  { objName: 'Servings', value: 23, factory: (value: number) => Servings.of(value) } as TestCase<Servings>,
  {
    objName: 'PreparationMethod',
    value: 'string',
    factory: (value: string) => PreparationMethod.of(value),
  } as TestCase<PreparationMethod>,
  { objName: 'UomId', value: 'string', factory: (value: string) => UomId.of(value) } as TestCase<UomId>,
  { objName: 'Quantity', value: 23, factory: (value: number) => Quantity.of(value) } as TestCase<Quantity>,
  {
    objName: 'IngredientId',
    value: 'string',
    factory: (value: string) => IngredientId.of(value),
  } as TestCase<IngredientId>,
  {
    objName: 'PreparationStep',
    value: 'string',
    factory: (value: string) => PreparationStep.of(value),
  } as TestCase<PreparationStep>,
].forEach((testCase) => {
  describe(`${testCase.objName}`, () => {
    it(`should create from ${testCase.value}`, () => {
      expect({ ...testCase.factory(testCase.value) }).toStrictEqual({
        value: testCase.value,
      });
    });
  });
});
