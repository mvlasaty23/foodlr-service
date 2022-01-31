import { Cost, CostType } from './cost.model';
import { Duration } from './duration.model';
import { MealType } from './mealtype.model';
import { IRecipe, Name, Recipe, RecipeId, Servings } from './recipe.model';
import { Region } from './region.model';
import { Season, SeasonKeys } from './season.model';

export const costs: { [k in keyof typeof CostType]: Cost } = {
  LOW: Cost.of(19),
  MODERATE: Cost.of(39),
  EXPENSIVE: Cost.of(41),
} as const;

export const seasons: { [k in SeasonKeys]: Season } = {
  spring: Season.of('spring'),
  summer: Season.of('summer'),
  autumn: Season.of('autumn'),
  winter: Season.of('winter'),
  all: Season.of('all'),
} as const;

export const name = Name.of('name');

export const recipeId = RecipeId.of('id');

export const newRecipe = Recipe.of({
  // no id here
  name: 'name',
  costs: 2,
  ingredients: [{ name: 'name', uom: 'g', quantity: 2 }],
  prepTime: 2,
  servings: 2,
  region: 'eu-central',
  season: 'all',
  type: 'meat',
});
export const recipe = Recipe.of({
  identity: 'id',
  name: 'name',
  costs: 2,
  ingredients: [{ name: 'name', uom: 'g', quantity: 2 }],
  prepTime: 2,
  servings: 2,
  region: 'eu-central',
  season: 'all',
  type: 'meat',
});
export const recipes: IRecipe[] = [
  recipe,
  {
    identity: RecipeId.of('id2'),
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
    identity: RecipeId.of('id3'),
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
    identity: RecipeId.of('id4'),
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
