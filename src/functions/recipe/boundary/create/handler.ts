import { Recipe } from '@domain/recipe.model';
import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import RecipeService from '@functions/recipe/control/recipe.service';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import 'source-map-support/register';
import { mapToRecipeDto } from '../common';

// AWS.config.update({ region: process.env.REGION });
const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

export const create$: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  const { name, servings, ingredients, preparationTime, season, costs, region } = event.body;
  return firstValueFrom(
    recipeService
      .create$(Recipe.of(name, servings, ingredients, preparationTime.quantity, season, costs, region))
      .pipe(mapToRecipeDto),
  );
};

export const main = middyfy(create$);
