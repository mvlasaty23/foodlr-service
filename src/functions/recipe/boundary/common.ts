import { Recipe } from '@functions/recipe/domain/recipe.model';
import { formatJSONResponse } from '@libs/apiGateway';
import { map } from 'rxjs/operators';

export const mapToRecipeDto = map((recipe: Recipe) =>
  formatJSONResponse({
    name: recipe.name.value,
    servings: recipe.servings.value,
    ingredients: recipe.ingredients.map((it) => ({ name: it.name, quantity: it.quantity, uom: it.uom })),
    preparationTime: recipe.preparationTime.value,
    preparationUom: recipe.preparationTime.uom,
    season: recipe.season.value,
    costs: recipe.costs.value,
    region: recipe.region.value,
  }),
);
