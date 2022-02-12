import { MealTypes } from '@domain/mealtype.model';
import { MenuPlan } from '@domain/menuplan.model';
import { Recipe } from '@domain/recipe.model';
import { RegionKeys } from '@domain/region.model';
import { SeasonKeys } from '@domain/season.model';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface IRecipe {
  identity: string;
  name: string;
  servings: number;
  ingredients: { name: string; quantity: number; uom: string }[];
  preparationTime: { value: number };
  costs: number;
  type: string;
  season: string;
  region: string;
}

/**
 * GPI ByUser
 */
interface Identifieable {
  user: string;
  startDay: string;
}

export class MenuPlanEntity implements Identifieable {
  private constructor(public user: string, public startDay: string, public endDay: string, public recipes: IRecipe[]) {}
  public static from(menuplan: MenuPlan): MenuPlanEntity {
    return new MenuPlanEntity(
      menuplan.user,
      menuplan.startDay.toISOString(),
      menuplan.endDay.toISOString(),
      menuplan.recipes.map((recipe) => ({
        identity: recipe.identity.value,
        name: recipe.name.value,
        servings: recipe.servings.value,
        ingredients: recipe.ingredients.map((i) => ({
          name: i.name.value,
          quantity: i.quantity.value,
          uom: i.uom.value,
        })),
        preparationTime: { value: recipe.preparationTime.value },
        costs: recipe.costs.value,
        type: recipe.type.value,
        season: recipe.season.value,
        region: recipe.region.value,
      })),
    );
  }
  public static of(attributes: DocumentClient.AttributeMap): MenuPlanEntity {
    return new MenuPlanEntity(
      attributes['user'] as string,
      attributes['startDay'] as string,
      attributes['endDay'] as string,
      attributes['recipes'] as IRecipe[],
    );
  }

  public toDomain(): MenuPlan {
    return new MenuPlan(
      this.user,
      this.recipes.map((recipe) =>
        Recipe.of({
          identity: recipe.identity,
          name: recipe.name,
          servings: recipe.servings,
          ingredients: recipe.ingredients,
          prepTime: recipe.preparationTime.value,
          season: recipe.season as SeasonKeys,
          costs: recipe.costs,
          region: recipe.region as RegionKeys,
          type: recipe.type as MealTypes,
        }),
      ),
      new Date(this.startDay),
      new Date(this.endDay),
    );
  }
}