import { Ingredient } from './ingredient';

describe('Ingredient', () => {
  it('should add an igredient', () => {
    // Given
    const ingredient = Ingredient.of('name', 2, 'g');
    // When
    const actual = ingredient.add(Ingredient.of('name', 2, 'g'));
    // Then
    expect(actual).toStrictEqual(Ingredient.of('name', 4, 'g'));
  });
});
