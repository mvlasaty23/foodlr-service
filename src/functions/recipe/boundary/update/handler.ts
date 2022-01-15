import { mapToRecipeDto } from '@functions/recipe/boundary/common';
import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import RecipeService from '@functions/recipe/control/recipe.service';
import { Recipe } from '@functions/recipe/domain/recipe.model';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';

const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

export const update$: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return firstValueFrom(
    recipeService
      .update$(Recipe.of(event.pathParameters.id, event.body.name, event.body.servings))
      .pipe(mapToRecipeDto),
  );
};

export const main = middyfy(update$);
