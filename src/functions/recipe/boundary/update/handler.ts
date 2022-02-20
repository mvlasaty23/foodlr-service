import { MealTypes } from '@domain/mealtype.model';
import { Recipe } from '@domain/recipe.model';
import { RegionKeys } from '@domain/region.model';
import { SeasonKeys } from '@domain/season.model';
import { mapToRecipeDto, table } from '@functions/recipe/boundary/common';
import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import RecipeService from '@functions/recipe/control/recipe.service';
import { APIGatewayProxyBodyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';

const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = RecipeService.of(dbClient, table);

export const update$: APIGatewayProxyBodyHandler<typeof schema> = async (event) => {
  const { identity, name, servings, ingredients, preparationTime, season, costs, region, type } = event.body;
  return firstValueFrom(
    recipeService
      .update$(
        Recipe.of({
          identity,
          name,
          servings,
          ingredients,
          prepTime: preparationTime.quantity,
          season: season as SeasonKeys,
          costs,
          region: region as RegionKeys,
          type: type as MealTypes,
        }),
      )
      .pipe(mapToRecipeDto),
  );
};

export const main = middyfy(update$);
