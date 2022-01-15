import { Recipe } from '@functions/recipe/domain/recipe.model';
import { formatJSONResponse } from '@libs/apiGateway';
import { map } from 'rxjs/operators';

export const mapToRecipeDto = map((recipe: Recipe) =>
  formatJSONResponse({
    id: recipe.id.value,
    name: recipe.name.value,
    servings: recipe.servings.value,
    preparationSteps: recipe.preparations.map((prep) => prep.value),
  }),
);
