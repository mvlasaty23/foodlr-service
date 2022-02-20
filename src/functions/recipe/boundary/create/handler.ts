import { MealTypes } from '@domain/mealtype.model';
import { IIngredient, Recipe } from '@domain/recipe.model';
import { RegionKeys } from '@domain/region.model';
import { SeasonKeys } from '@domain/season.model';
import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import RecipeService from '@functions/recipe/control/recipe.service';
import { APIGatewayProxyBodyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import 'source-map-support/register';
import { mapToRecipeDto, table } from '../common';

// AWS.config.update({ region: process.env.REGION });
const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = RecipeService.of(dbClient, table);

export const create$: APIGatewayProxyBodyHandler<typeof schema> = async (event) => {
  const { name, servings, ingredients, preparationTime, season, costs, region, type } = event.body;
  return firstValueFrom(
    recipeService
      .create$(
        Recipe.of({
          identity: null,
          name,
          servings,
          ingredients: ingredients as IIngredient[],
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

export const main = middyfy(create$);
