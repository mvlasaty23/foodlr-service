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
      .filter((recipe) => this.habbits.mealTypes.some((it) => recipe.type.equals(it)))
      .filter((recipe) => this.habbits.preferredCosts.includes(recipe.costs.asCostType()))
      .filter((recipe) => this.habbits.preferredPrepTime.includes(recipe.preparationTime.asDurationType()));

    const recipes: IRecipe[] = [];
    for (let i = 0; i < this.mealsInPeriod(); i++) {
      recipes.push(eligbaleRecipes[Math.floor(Math.random() * eligbaleRecipes.length)]);
    }
    return new MenuPlan(recipes, this.startDay, this.endDay);
  }

  private mealsInPeriod(): number {
    return this.periodInDays() * this.habbits.mealsPerDay;
  }
  private periodInDays(): number {
    return Math.abs((this.startDay.getTime() - this.endDay.getTime()) / (1000 * 3600 * 24));
  }
  private validate(): void {
    assertOk(!!this.recipes && this.recipes.length > 0, 'Recipes should not be null or empty');
    assertOk(!!this.habbits && !!this.startDay && !!this.endDay, 'Mandatory properties should not be null');
  }
}
