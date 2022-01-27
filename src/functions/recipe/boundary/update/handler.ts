import { Recipe } from '@domain/recipe.model';
import { mapToRecipeDto } from '@functions/recipe/boundary/common';
import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import RecipeService from '@functions/recipe/control/recipe.service';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';

const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

export const update$: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  const { name, servings, ingredients, preparationTime, season, costs, region } = event.body;
  return firstValueFrom(
    recipeService
      .update$(Recipe.of(name, servings, ingredients, preparationTime.quantity, season, costs, region))
      .pipe(mapToRecipeDto),
  );
};

export const main = middyfy(update$);
