import { Recipe } from '@domain/recipe.model';
import { formatJSONResponse } from '@libs/apiGateway';
import { map } from 'rxjs/operators';

export const table = process.env.RECIPE_TABLE;

export const mapToRecipeDto = map((recipe: Recipe) =>
  formatJSONResponse({
    identity: recipe.identity.value,
    name: recipe.name.value,
    servings: recipe.servings.value,
    ingredients: recipe.ingredients.map((it) => ({
      name: it.name.value,
      quantity: it.amount.value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      uom: it.amount.uom,
    })),
    preparationTime: recipe.preparationTime.value,
    season: recipe.season.value,
    costs: recipe.costs.value,
    region: recipe.region.value,
    type: recipe.type.value,
  }),
);
