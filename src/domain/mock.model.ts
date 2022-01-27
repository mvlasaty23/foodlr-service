import { Cost, CostType } from './cost.model';
import { Duration } from './duration.model';
import { MealType } from './mealtype.model';
import { IRecipe, Name, Servings } from './recipe.model';
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

export const recipe = {
  name: Name.of('A'),
  costs: costs.MODERATE,
  ingredients: [],
  preparationTime: Duration.of(2),
  servings: Servings.of(2),
  region: Region.of('eu-central'),
  season: seasons.all,
  type: MealType.of('meat'),
};
export const recipes: IRecipe[] = [
  recipe,
  {
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
