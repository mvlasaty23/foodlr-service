import { AssertionError } from 'assert';
import { CostType } from './cost.model';
import { Duration, DurationType } from './duration.model';
import { MealType, mealTypes } from './mealtype.model';
import { ConsumerHabbits, MenuPlanBuilder } from './menuplan.model';
import { costs, recipe, seasons } from './mock.model';
import { IRecipe, Name, RecipeId, Servings } from './recipe.model';
import { Region } from './region.model';

describe('MenuPlanBuilder', () => {
  describe('build', () => {
    it('should build a menu plan', () => {
      // Given
      const habbits = new ConsumerHabbits(
        2,
        [MealType.of('all')],
        [DurationType.FAST, DurationType.MODERATE],
        [CostType.LOW, CostType.MODERATE],
      );
      const recipes: IRecipe[] = [recipe];
      // When
      const menuPlan = new MenuPlanBuilder('mock-user', recipes)
        .withHabbits(habbits)
        .forPeriod(new Date('2021-01-01'), new Date('2021-01-02'));
      // Then
      expect(menuPlan).toBeTruthy();
    });
    it('should validate input', () => {
      expect(() => new MenuPlanBuilder('mock-user', []).build()).toThrow(AssertionError);
      expect(() => new MenuPlanBuilder('mock-user', null).build()).toThrow(AssertionError);
      expect(() => new MenuPlanBuilder('', [recipe]).build()).toThrow(AssertionError);
      expect(() => new MenuPlanBuilder(null, [recipe]).build()).toThrow(AssertionError);
      expect(() => new MenuPlanBuilder('mock-user', [recipe]).build()).toThrow(AssertionError);
    });
    it('should consider preferred costs', () => {
      // Given
      const recipes: IRecipe[] = [
        {
          identity: RecipeId.of('1'),
          name: Name.of('A'),
          costs: costs.MODERATE,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('2'),
          name: Name.of('B'),
          costs: costs.LOW,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('3'),
          name: Name.of('C'),
          costs: costs.EXPENSIVE,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
      ];
      const habbits = new ConsumerHabbits(
        2,
        [MealType.of('all')],
        [DurationType.FAST, DurationType.MODERATE],
        [CostType.LOW, CostType.MODERATE],
      );
      // When
      const menuPlan = new MenuPlanBuilder('mock-user', recipes)
        .withHabbits(habbits)
        .forPeriod(new Date('2021-01-01'), new Date('2021-01-02'))
        .build();
      // Then
      expect(
        menuPlan.recipes.every(
          (recipe) =>
            recipe.costs.asCostType() === costs.LOW.asCostType() ||
            recipe.costs.asCostType() === costs.MODERATE.asCostType(),
        ),
      ).toBeTruthy();
    });
    it('should consider preferred preparation time', () => {
      // Given
      const recipes: IRecipe[] = [
        {
          identity: RecipeId.of('1'),
          name: Name.of('A'),
          costs: costs.MODERATE,
          ingredients: [],
          preparationTime: Duration.of(12),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('2'),
          name: Name.of('B'),
          costs: costs.LOW,
          ingredients: [],
          preparationTime: Duration.of(13),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('3'),
          name: Name.of('C'),
          costs: costs.EXPENSIVE,
          ingredients: [],
          preparationTime: Duration.of(120),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('4'),
          name: Name.of('D'),
          costs: costs.EXPENSIVE,
          ingredients: [],
          preparationTime: Duration.of(200),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
      ];
      const habbits = new ConsumerHabbits(
        2,
        [MealType.of('all')],
        [DurationType.FAST, DurationType.MODERATE],
        [CostType.LOW, CostType.MODERATE],
      );
      // When
      const menuPlan = new MenuPlanBuilder('mock-user', recipes)
        .withHabbits(habbits)
        .forPeriod(new Date('2021-01-01'), new Date('2021-01-02'))
        .build();
      // Then
      expect(
        menuPlan.recipes.every(
          (recipe) =>
            recipe.preparationTime.asDurationType() === Duration.of(1).asDurationType() ||
            recipe.preparationTime.asDurationType() === Duration.of(45).asDurationType(),
        ),
      ).toBeTruthy();
    });
    it('should consider preferred meal types', () => {
      // Given
      const recipes: IRecipe[] = [
        {
          identity: RecipeId.of('1'),
          name: Name.of('A'),
          costs: costs.MODERATE,
          ingredients: [],
          preparationTime: Duration.of(12),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('2'),
          name: Name.of('B'),
          costs: costs.LOW,
          ingredients: [],
          preparationTime: Duration.of(13),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('vegetarian'),
        },
        {
          identity: RecipeId.of('3'),
          name: Name.of('C'),
          costs: costs.EXPENSIVE,
          ingredients: [],
          preparationTime: Duration.of(120),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('pescetarian'),
        },
        {
          identity: RecipeId.of('4'),
          name: Name.of('D'),
          costs: costs.EXPENSIVE,
          ingredients: [],
          preparationTime: Duration.of(200),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('vegan'),
        },
      ];
      const habbits = new ConsumerHabbits(
        2,
        [MealType.of('meat'), MealType.of('pescetarian')],
        [DurationType.FAST, DurationType.MODERATE],
        [CostType.LOW, CostType.MODERATE],
      );
      // When
      const menuPlan = new MenuPlanBuilder('mock-user', recipes)
        .withHabbits(habbits)
        .forPeriod(new Date('2021-01-01'), new Date('2021-01-02'))
        .build();
      // Then
      expect(
        menuPlan.recipes.every(
          (recipe) => recipe.type.value === mealTypes.meat || recipe.type.value === mealTypes.pescetarian,
        ),
      ).toBeTruthy();
    });
    it('should randomly pick enough meals for a period of one day', () => {
      // Given
      const recipes: IRecipe[] = [
        {
          identity: RecipeId.of('1'),
          name: Name.of('A'),
          costs: costs.MODERATE,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('2'),
          name: Name.of('B'),
          costs: costs.LOW,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('3'),
          name: Name.of('C'),
          costs: costs.EXPENSIVE,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
      ];
      const mealsPerDay = 2;
      const habbits = new ConsumerHabbits(
        mealsPerDay,
        [MealType.of('all')],
        [DurationType.FAST, DurationType.MODERATE],
        [CostType.LOW, CostType.MODERATE],
      );
      // When
      const menuPlan = new MenuPlanBuilder('mock-user', recipes)
        .withHabbits(habbits)
        .forPeriod(new Date('2021-01-01'), new Date('2021-01-02'))
        .build();
      // Then
      expect(menuPlan.recipes).toHaveLength(mealsPerDay);
    });
    it('should consider season of start and end', () => {
      // Given
      const recipes: IRecipe[] = [
        {
          identity: RecipeId.of('1'),
          name: Name.of('A'),
          costs: costs.MODERATE,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.summer,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('1'),
          name: Name.of('B'),
          costs: costs.MODERATE,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.autumn,
          type: MealType.of('meat'),
        },
        {
          identity: RecipeId.of('1'),
          name: Name.of('C'),
          costs: costs.MODERATE,
          ingredients: [],
          preparationTime: Duration.of(2),
          servings: Servings.of(2),
          region: Region.of('eu-central'),
          season: seasons.winter,
          type: MealType.of('meat'),
        },
      ];
      const mealsPerDay = 2;
      const habbits = new ConsumerHabbits(mealsPerDay, [MealType.of('all')], [DurationType.FAST], [CostType.MODERATE]);
      // When
      const menuPlan = new MenuPlanBuilder('mock-user', recipes)
        .withHabbits(habbits)
        .forPeriod(new Date('2021-09-21'), new Date('2021-09-22'))
        .build();
      // Then
      expect(
        menuPlan.recipes.every(
          (recipe) => recipe.season.equals(seasons.autumn) || recipe.season.equals(seasons.summer),
        ),
      ).toBeTruthy();
    });
  });
  describe('withHabbits', () => {
    it('should validate input', () => {
      expect(() => new MenuPlanBuilder('mock-user', []).withHabbits(null)).toThrow(AssertionError);
    });
  });
  describe('forPeriod', () => {
    it('should validate input', () => {
      expect(() => new MenuPlanBuilder('mock-user', []).forPeriod(null, new Date())).toThrow(AssertionError);
      expect(() => new MenuPlanBuilder('mock-user', []).forPeriod(new Date(), null)).toThrow(AssertionError);
      expect(() => new MenuPlanBuilder('mock-user', []).forPeriod(null, null)).toThrow(AssertionError);
      expect(() =>
        new MenuPlanBuilder('mock-user', []).forPeriod(new Date('01/02/2021'), new Date('01/01/2021')),
      ).toThrow(AssertionError);
    });
  });
});
