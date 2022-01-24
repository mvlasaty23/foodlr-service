import { ok as assertOk } from 'assert';
import { CostType } from './cost.model';
import { DurationType } from './duration.model';
import { MealType } from './mealtype.model';
import { IRecipe } from './recipe.model';

export class ConsumerHabbits {
  constructor(
    public mealsPerDay: number,
    public mealTypes: MealType[],
    public preferredPrepTime: DurationType[],
    public preferredCosts: CostType[],
  ) {}
}

export class MenuPlan {
  constructor(public recipes: IRecipe[], public startDay: Date, public endDay: Date) {}
}

export class MenuPlanBuilder {
  private habbits: ConsumerHabbits;
  private startDay: Date;
  private endDay: Date;

  constructor(private recipes: IRecipe[]) {}

  public withHabbits(habbits: ConsumerHabbits): MenuPlanBuilder {
    assertOk(!!habbits, 'Consumer Habbits should not be null');
    this.habbits = habbits;
    return this;
  }
  public forPeriod(start: Date, end: Date): MenuPlanBuilder {
    assertOk(!!start, 'Start day should not be null');
    assertOk(!!end, 'End day should not be null');
    assertOk(start.getTime() < end.getTime(), 'Start day should not be after end day');

    this.startDay = start;
    this.endDay = end;
    return this;
  }

  public build(): MenuPlan {
    this.validate();

    const eligbaleRecipes = this.recipes
      .filter(this.byMealTypes(this.habbits.mealTypes))
      .filter(this.byPreferredCosts(this.habbits.preferredCosts))
      .filter(this.byPreferredPrepTime(this.habbits.preferredPrepTime));

    const recipes: IRecipe[] = [];
    for (let i = 0; i < this.mealsInPeriod(); i++) {
      recipes.push(this.randomFrom(eligbaleRecipes));
    }

    return new MenuPlan(recipes, this.startDay, this.endDay);
  }

  private byMealTypes(mealTypes: MealType[]) {
    return (recipe: IRecipe) => mealTypes.some((type) => recipe.type.equals(type));
  }
  private byPreferredCosts(costs: CostType[]) {
    return (recipe: IRecipe) => costs.includes(recipe.costs.asCostType());
  }
  private byPreferredPrepTime(durations: DurationType[]) {
    return (recipe: IRecipe) => durations.includes(recipe.preparationTime.asDurationType());
  }
  private mealsInPeriod(): number {
    return this.periodInDays() * this.habbits.mealsPerDay;
  }
  private periodInDays(): number {
    return Math.abs((this.startDay.getTime() - this.endDay.getTime()) / (1000 * 3600 * 24));
  }
  private randomFrom(recipes: IRecipe[]): IRecipe {
    return recipes[Math.floor(Math.random() * recipes.length)];
  }
  private validate(): void {
    assertOk(!!this.recipes && this.recipes.length > 0, 'Recipes should not be null or empty');
    assertOk(!!this.habbits && !!this.startDay && !!this.endDay, 'Mandatory properties should not be null');
  }
}
